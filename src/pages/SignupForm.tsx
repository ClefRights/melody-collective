import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import PRORadioGroup from "@/components/forms/PRORadioGroup";
import PRODetailsForm from "@/components/forms/PRODetailsForm";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePayment = async () => {
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { email }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Both flows should now trigger payment
    await handlePayment();
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
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required 
              />
              <p className="text-sm text-muted-foreground mt-2">
                Please enter an email that you check regularly. We will use this to communicate with you regarding your work and provide it to the performing rights organizations and the collective management organizations as part of the rights registration process.
              </p>
            </div>
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

            <PRORadioGroup isPROmember={isPROmember} setIsPROmember={setIsPROmember} />
            
            {isPROmember === "yes" && (
              <PRODetailsForm 
                proName={proName}
                proNumber={proNumber}
                setProName={setProName}
                setProNumber={setProNumber}
              />
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Processing..." : "Submit Agreement"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupForm;
