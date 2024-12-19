import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

interface LocationState {
  proName: string;
}

const PublishingCompanyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { proName } = location.state as LocationState;
  
  const [hasPublishingCompany, setHasPublishingCompany] = useState<string>("no");
  const [wantsPublishingCompany, setWantsPublishingCompany] = useState<string>("no");
  const [publishingCompanyName, setPublishingCompanyName] = useState("");
  const [publisherShare, setPublisherShare] = useState("45");
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);

  const handleSubmit = () => {
    if (hasPublishingCompany === "yes" || (hasPublishingCompany === "no" && wantsPublishingCompany === "yes")) {
      navigate("/rights-clearance");
    } else if (publisherShare === "0") {
      setShowShareConfirmation(true);
    } else {
      navigate("/rights-clearance");
    }
  };

  const handleConfirmZeroShare = () => {
    navigate("/rights-clearance");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Publishing Company Information</CardTitle>
          <CardDescription>Please provide details about your publishing company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Do you have a publishing company with {proName}?</Label>
            <RadioGroup
              value={hasPublishingCompany}
              onValueChange={setHasPublishingCompany}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="has-company-yes" />
                <Label htmlFor="has-company-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="has-company-no" />
                <Label htmlFor="has-company-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {hasPublishingCompany === "yes" && (
            <div className="space-y-4">
              <Label htmlFor="company-name">Publishing Company Name</Label>
              <Input
                id="company-name"
                value={publishingCompanyName}
                onChange={(e) => setPublishingCompanyName(e.target.value)}
                placeholder="Enter your publishing company name"
              />
              <p className="text-sm text-muted-foreground">
                Enter only the name of a publishing company that you own. If you have published with another publisher and do not own your own publishing company, go back and select "No" for your answer.
              </p>
            </div>
          )}

          {hasPublishingCompany === "no" && (
            <div className="space-y-4">
              <Label>Do you want to open your own publisher company?</Label>
              <RadioGroup
                value={wantsPublishingCompany}
                onValueChange={setWantsPublishingCompany}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="wants-company-yes" />
                  <Label htmlFor="wants-company-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="wants-company-no" />
                  <Label htmlFor="wants-company-no">No</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground">
                In order to be a co-publisher and receive your publisher share, you will need to have a publisher entity. Individuals and record labels cannot be publisher companies. Normally, the entity is named Your Name Music Publishing Company. The cost of setting up a publishing company is $50 for ASCAP or $175 for BMI, plus an additional $100 for enrollment with the HFA.
              </p>
            </div>
          )}

          {hasPublishingCompany === "no" && wantsPublishingCompany === "yes" && (
            <div className="space-y-4">
              <Label htmlFor="new-company-name">New Publishing Company Name</Label>
              <Input
                id="new-company-name"
                value={publishingCompanyName}
                onChange={(e) => setPublishingCompanyName(e.target.value)}
                placeholder="Enter your new publishing company name"
              />
            </div>
          )}

          {hasPublishingCompany === "no" && wantsPublishingCompany === "no" && (
            <div className="space-y-4">
              <Label htmlFor="publisher-share">Publisher Share (%)</Label>
              <Input
                id="publisher-share"
                type="number"
                min="0"
                max="45"
                value={publisherShare}
                onChange={(e) => setPublisherShare(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Because your work must have a publisher, you may set your share to 0% and assign all publishing rights and publishing expenses to ClefRights.
              </p>
            </div>
          )}

          {showShareConfirmation && (
            <div className="space-y-4 bg-muted p-4 rounded-lg">
              <p className="font-medium">Confirmation Required</p>
              <p className="text-sm">
                You have set your publisher share to 0%. This means you are assigning 100% of publishing rights to ClefRights. Please confirm this selection.
              </p>
              <Button onClick={handleConfirmZeroShare} className="w-full">
                Confirm Selection
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!showShareConfirmation && (
            <Button 
              onClick={handleSubmit}
              className="w-full"
              disabled={
                (hasPublishingCompany === "yes" && !publishingCompanyName) ||
                (hasPublishingCompany === "no" && wantsPublishingCompany === "yes" && !publishingCompanyName)
              }
            >
              Continue
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PublishingCompanyForm;