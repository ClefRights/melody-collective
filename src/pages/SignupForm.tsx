import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import PRORadioGroup from "@/components/forms/PRORadioGroup";
import PRODetailsForm from "@/components/forms/PRODetailsForm";
import LoginForm from "@/components/forms/LoginForm";
import SignupDetailsForm from "@/components/forms/SignupDetailsForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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

  const subscribeToMailingList = async (email: string, name: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-to-mailchimp', {
        body: { email, name }
      });

      if (error) {
        console.error('Mailing list subscription error:', error);
      }
    } catch (error) {
      console.error('Failed to subscribe to mailing list:', error);
    }
  };

  const sendNotificationEmail = async (formData: any) => {
    try {
      const { error } = await supabase.functions.invoke('send-notification-email', {
        body: formData
      });

      if (error) {
        console.error('Failed to send notification email:', error);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Subscribe to mailing list
      await subscribeToMailingList(email, writerName);

      // Send notification email
      await sendNotificationEmail({
        email,
        songTitle,
        writerName,
        writerShare,
        userPublisherShare,
        clefRightsShare,
        proName,
        proNumber
      });

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
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your submission. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <SignupDetailsForm
                email={email}
                password={password}
                songTitle={songTitle}
                writerName={writerName}
                writerShare={writerShare}
                userPublisherShare={userPublisherShare}
                clefRightsShare={clefRightsShare}
                setEmail={setEmail}
                setPassword={setPassword}
                setSongTitle={setSongTitle}
                setWriterName={setWriterName}
                setUserPublisherShare={setUserPublisherShare}
                handleShareChange={handleShareChange}
              />
              <div className="space-y-6">
                <PRORadioGroup isPROmember={isPROmember} setIsPROmember={setIsPROmember} />
                {isPROmember === "yes" && (
                  <PRODetailsForm
                    proName={proName}
                    proNumber={proNumber}
                    setProName={setProName}
                    setProNumber={setProNumber}
                  />
                )}
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Processing..." : "Submit Agreement"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;