import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PublishingCompanyRadioGroup from "@/components/forms/PublishingCompanyRadioGroup";
import CompanyNameInput from "@/components/forms/CompanyNameInput";
import ShareConfirmation from "@/components/forms/ShareConfirmation";
import PublisherShareInput from "@/components/forms/PublisherShareInput";

interface LocationState {
  proName: string;
  email?: string;
  publisherShare?: string;
}

const PublishingCompanyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!location.state?.proName) {
      navigate('/signup');
    }
  }, [location.state, navigate]);

  const { proName = '', email, publisherShare } = location.state as LocationState || {};
  
  const [hasPublishingCompany, setHasPublishingCompany] = useState<string>("no");
  const [wantsPublishingCompany, setWantsPublishingCompany] = useState<string>("no");
  const [publishingCompanyName, setPublishingCompanyName] = useState("");
  const [publisherShare2, setPublisherShare] = useState(publisherShare || "45");
  const [showShareConfirmation, setShowShareConfirmation] = useState(false);

  const handleSubmit = () => {
    if (hasPublishingCompany === "yes" || (hasPublishingCompany === "no" && wantsPublishingCompany === "yes")) {
      navigate("/rights-clearance", {
        state: {
          publisherShare: publisherShare2,
          email,
          publishingCompanyName
        }
      });
    } else if (publisherShare2 === "0") {
      setShowShareConfirmation(true);
    } else {
      navigate("/rights-clearance", {
        state: {
          publisherShare: publisherShare2,
          email
        }
      });
    }
  };

  const handleConfirmZeroShare = () => {
    navigate("/rights-clearance", {
      state: {
        publisherShare: "0",
        email
      }
    });
  };

  if (!location.state?.proName) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Publishing Company Information</CardTitle>
          <CardDescription>Please provide details about your publishing company</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <PublishingCompanyRadioGroup
            label={`Do you have a publishing company with ${proName}?`}
            value={hasPublishingCompany}
            onValueChange={setHasPublishingCompany}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" }
            ]}
          />

          {hasPublishingCompany === "yes" && (
            <CompanyNameInput
              value={publishingCompanyName}
              onChange={setPublishingCompanyName}
              description="Enter only the name of a publishing company that you own. If you have published with another publisher and do not own your own publishing company, go back and select 'No' for your answer."
            />
          )}

          {hasPublishingCompany === "no" && (
            <>
              <PublishingCompanyRadioGroup
                label="Do you want to open your own publisher company?"
                value={wantsPublishingCompany}
                onValueChange={setWantsPublishingCompany}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ]}
                description="In order to be a co-publisher and receive your publisher share, you will need to have a publisher entity. Individuals and record labels cannot be publisher companies. Normally, the entity is named Your Name Music Publishing Company. The cost of setting up a publishing company is $50 for ASCAP or $175 for BMI, plus an additional $100 for enrollment with the HFA."
              />

              {wantsPublishingCompany === "yes" && (
                <CompanyNameInput
                  value={publishingCompanyName}
                  onChange={setPublishingCompanyName}
                  label="New Publishing Company Name"
                />
              )}

              {wantsPublishingCompany === "no" && (
                <PublisherShareInput
                  value={publisherShare2}
                  onChange={setPublisherShare}
                />
              )}
            </>
          )}

          {showShareConfirmation && (
            <ShareConfirmation onConfirm={handleConfirmZeroShare} />
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