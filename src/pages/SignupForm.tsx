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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const needsPROFee = formData.get("proMembership") === "no";
    
    toast({
      title: "Agreement Submitted",
      description: needsPROFee 
        ? "Thank you for submitting! Note: A PRO membership fee will be added during payment."
        : "Thank you for submitting your co-publishing agreement!",
    });
    navigate("/");
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
                placeholder="Enter writer's share percentage" 
                required 
              />
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