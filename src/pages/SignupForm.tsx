import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PRORadioGroup from "@/components/forms/PRORadioGroup";
import PRODetailsForm from "@/components/forms/PRODetailsForm";
import LoginForm from "@/components/forms/LoginForm";
import SignupDetailsForm from "@/components/forms/SignupDetailsForm";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPROmember, setIsPROmember] = useState<string>("no");
  const [writerShare, setWriterShare] = useState<string>("100");
  const [userPublisherShare, setUserPublisherShare] = useState<string>("45");
  const [clefRightsShare, setClefRightsShare] = useState<string>("55");
  const [proName, setProName] = useState("");
  const [proNumber, setProNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [writerName, setWriterName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = location.state?.isLogin;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isPROmember === "yes") {
      navigate("/publishing-company", {
        state: {
          proName,
          email,
          publisherShare: userPublisherShare
        }
      });
    } else {
      navigate("/pro-selection", {
        state: {
          email,
          publisherShare: userPublisherShare
        }
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78] p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Co-Publishing Agreement"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Enter your details to sign up for co-publishing"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <LoginForm />
          ) : (
            <>
              <SignupDetailsForm
                email={email}
                password={password}
                songTitle={songTitle}
                writerName={writerName}
                writerShare={writerShare}
                userPublisherShare={userPublisherShare}
                clefRightsShare={clefRightsShare}
                isSubmitting={isSubmitting}
                setEmail={setEmail}
                setPassword={setPassword}
                setSongTitle={setSongTitle}
                setWriterName={setWriterName}
                setUserPublisherShare={setUserPublisherShare}
                handleShareChange={handleShareChange}
                handleSubmit={handleSubmit}
              />
              <div className="mt-6">
                <PRORadioGroup isPROmember={isPROmember} setIsPROmember={setIsPROmember} />
              </div>
              {isPROmember === "yes" && (
                <div className="mt-6">
                  <PRODetailsForm
                    proName={proName}
                    proNumber={proNumber}
                    setProName={setProName}
                    setProNumber={setProNumber}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;