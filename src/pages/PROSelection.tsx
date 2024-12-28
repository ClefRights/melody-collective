import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface LocationState {
  email?: string;
  publisherShare?: string;
}

const PROSelection = () => {
  const [selectedPRO, setSelectedPRO] = useState<"ASCAP" | "BMI" | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, publisherShare } = location.state as LocationState || {};

  const handleSubmit = () => {
    if (selectedPRO) {
      navigate("/publishing-company", {
        state: {
          proName: selectedPRO,
          email,
          publisherShare
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Select Your PRO</CardTitle>
          <CardDescription>Choose between ASCAP and BMI for your performing rights organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant={selectedPRO === "ASCAP" ? "default" : "outline"}
              className="relative h-20 w-full sm:w-40"
              onClick={() => setSelectedPRO("ASCAP")}
            >
              ASCAP
              {selectedPRO === "ASCAP" && (
                <Check className="absolute top-2 right-2 h-4 w-4 text-green-500" />
              )}
            </Button>
            <Button
              variant={selectedPRO === "BMI" ? "default" : "outline"}
              className="relative h-20 w-full sm:w-40"
              onClick={() => setSelectedPRO("BMI")}
            >
              BMI
              {selectedPRO === "BMI" && (
                <Check className="absolute top-2 right-2 h-4 w-4 text-green-500" />
              )}
            </Button>
          </div>
          
          <div className="space-y-4 text-sm">
            <p>
              ASCAP is traditionally associated with classical-style music and is for composers or songwriters 
              who write primarily for live-ensemble performance. BMI is for all other types of music, including 
              music where the anticipated format is streaming. A composer or songwriter can only belong to one 
              of the organizations. They have reciprocity, so you are protected regardless of which genre you write for.
            </p>
            <p>
              If you choose ASCAP, there will be no writer fee and the publisher fee is $50. If you choose BMI, 
              the writer fee is $75 and the publisher fee is $175. If you set your publisher share at 0% on the 
              previous step, you will not pay any publisher fees.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedPRO}
            className="w-full"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PROSelection;