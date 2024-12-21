import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

interface LocationState {
  publisherShare?: string;
  fromPurchase?: boolean;
}

const RightsClearance = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { publisherShare, fromPurchase } = location.state as LocationState || {};
  
  const [hasSamples, setHasSamples] = useState<string>("no");
  const [hasMedleys, setHasMedleys] = useState<string>("no");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (hasSamples === "yes" || hasMedleys === "yes") {
      toast({
        title: "Rights Clearance Required",
        description: "Please send proof of rights clearance to publishingassistance@clefrights.com",
      });
    }
    
    navigate("/copyright-registration", { 
      state: { 
        publisherShare,
        fromPurchase 
      } 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Rights Clearances</CardTitle>
          <CardDescription>Please answer the following questions about your song</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Does your song have samples?</Label>
              <RadioGroup
                value={hasSamples}
                onValueChange={setHasSamples}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="samples-yes" />
                  <Label htmlFor="samples-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="samples-no" />
                  <Label htmlFor="samples-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Does your song have medleys?</Label>
              <RadioGroup
                value={hasMedleys}
                onValueChange={setHasMedleys}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="medleys-yes" />
                  <Label htmlFor="medleys-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medleys-no" />
                  <Label htmlFor="medleys-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {(hasSamples === "yes" || hasMedleys === "yes") && (
              <div className="space-y-2 bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium">Please send proof of rights clearance to:</p>
                <p className="text-sm text-blue-600">publishingassistance@clefrights.com</p>
                <p className="text-sm text-muted-foreground mt-2">
                  If you do not have rights clearance, email the above address. ClefRights will work with you to obtain clearance.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Continue</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RightsClearance;