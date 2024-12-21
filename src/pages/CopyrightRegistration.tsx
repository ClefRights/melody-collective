import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate, useLocation } from "react-router-dom";

interface LocationState {
  publisherShare: string;
  fromPurchase?: boolean;
}

const CopyrightRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { publisherShare } = location.state as LocationState;
  
  const [willFileOwn, setWillFileOwn] = useState<string>("");
  const [wantsClefrightsFiling, setWantsClefrightsFiling] = useState<string>("");
  
  const handleContinue = () => {
    // Redirect to Stripe checkout
    navigate("/checkout");
  };

  const handleResponse = (response: string) => {
    if (response === "no") {
      setWantsClefrightsFiling("");
      // Reset the form state
      setWillFileOwn("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>U.S. Library of Congress | Copyright Office Registration</CardTitle>
          <CardDescription>Please review your copyright registration options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {publisherShare === "0" ? (
            <div className="space-y-4">
              <p className="text-sm">
                Because you have chosen to appoint ClefRights as sole publisher for this work, 
                you will not be charged for filing fees with the U.S. Library of Congress | Copyright Office.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>
                  As the composer or songwriter, registration with the U.S. Library of Congress | Copyright Office 
                  is assumed to be your responsibility. Will you want to make the filing yourself?
                </Label>
                <RadioGroup
                  value={willFileOwn}
                  onValueChange={(value) => {
                    setWillFileOwn(value);
                    setWantsClefrightsFiling("");
                  }}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="file-yes" />
                    <Label htmlFor="file-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="file-no" />
                    <Label htmlFor="file-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {willFileOwn === "no" && (
                <div className="space-y-4">
                  <Label>
                    ClefRights can make the filing and invoice you for your share. Would you like to choose this option?
                  </Label>
                  <RadioGroup
                    value={wantsClefrightsFiling}
                    onValueChange={(value) => handleResponse(value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="clef-yes" />
                      <Label htmlFor="clef-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="clef-no" />
                      <Label htmlFor="clef-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleContinue}
            className="w-full"
            disabled={
              publisherShare !== "0" && 
              (willFileOwn === "" || 
              (willFileOwn === "no" && wantsClefrightsFiling === ""))
            }
          >
            Continue to Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CopyrightRegistration;