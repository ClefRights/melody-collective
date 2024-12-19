import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isPROmember, setIsPROmember] = useState<string>("no");
  const [writerShare, setWriterShare] = useState<string>("100");
  const [userPublisherShare, setUserPublisherShare] = useState<string>("45");
  const [clefRightsShare, setClefRightsShare] = useState<string>("55");

  const handleShareChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue > 45) {
      toast({
        title: "Invalid Share Percentage",
        description: "Your publisher share cannot exceed 45% as ClefRights maintains 55% of publishing rights.",
        variant: "destructive"
      });
      setUserPublisherShare("45");
    } else {
      setUserPublisherShare(value);
      setWriterShare((45 - numValue).toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const needsPROFee = formData.get("proMembership") === "no";
    const finalPublisherShare = userPublisherShare === "0" ? "100" : clefRightsShare;
    
    if (userPublisherShare === "0") {
      toast({
        title: "Publishing Rights Assignment",
        description: "You have assigned 100% of publishing rights to ClefRights. No publisher registration fees will be charged.",
      });
    }
    
    // Navigate based on PRO membership status
    if (isPROmember === "yes") {
      navigate("/publishing-company", { 
        state: { 
          proName: (e.target as HTMLFormElement).proName.value 
        } 
      });
    } else {
      navigate("/pro-selection");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Co-Publishing Agreement</CardTitle>
          <CardDescription>Enter your details to sign up for co-publishing</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="songTitle">Song Title</Label>
              <Input id="songTitle" name="songTitle" placeholder="Enter song title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="writerName">Writer's Name</Label>
              <Input id="writerName" name="writerName" placeholder="Enter writer's name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="writerShare">Writer's Share (%)</Label>
              <Input 
                id="writerShare" 
                name="writerShare"
                type="number" 
                min="0" 
                max="100" 
                value={writerShare}
                readOnly
                className="bg-gray-100"
                placeholder="Writer's share percentage" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clefRightsShare">ClefRights Publisher Share (%)</Label>
              <Input 
                id="clefRightsShare" 
                name="clefRightsShare"
                type="number" 
                value={clefRightsShare}
                readOnly
                className="bg-gray-100"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPublisherShare">Your Publisher Share (%)</Label>
              <Input 
                id="userPublisherShare" 
                name="userPublisherShare"
                type="number" 
                min="0" 
                max="45" 
                value={userPublisherShare}
                onChange={(e) => handleShareChange(e.target.value)}
                placeholder="Enter your publisher share percentage" 
                required 
              />
              <p className="text-sm text-muted-foreground mt-2">
                If you wish to not have any role in administering your song, you may leave this as 0% and assign full publishing rights to ClefRights. 
                If you do this, you will not have to pay publisher registration or filing fees.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Are you a member of a PRO?</Label>
              <RadioGroup
                name="proMembership"
                value={isPROmember}
                onValueChange={setIsPROmember}
                className="flex flex-col space-y-1 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pro-yes" />
                  <Label htmlFor="pro-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pro-no" />
                  <Label htmlFor="pro-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {isPROmember === "yes" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="proName">PRO Name</Label>
                  <Input 
                    id="proName" 
                    name="proName"
                    placeholder="Enter your PRO name" 
                    required={isPROmember === "yes"}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proNumber">PRO Number</Label>
                  <Input 
                    id="proNumber" 
                    name="proNumber"
                    placeholder="Enter your PRO number" 
                    required={isPROmember === "yes"}
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Submit Agreement</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
