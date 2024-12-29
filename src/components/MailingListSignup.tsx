import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const MailingListSignup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('subscribe-to-mailchimp', {
        body: { name, email }
      });

      if (error) {
        throw new Error(error.message || 'Failed to subscribe');
      }

      toast({
        title: "Thanks for signing up!",
        description: "Please check your email to confirm your subscription.",
      });
      setIsVisible(false);
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 max-w-md w-full bg-[#FFFFF0] rounded-lg shadow-lg p-6 border border-gray-200">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#4B5D78]">
          Stay Updated
        </h3>
        <p className="text-[#4B5D78]/80">
          Join our mailing list to receive updates about music publishing and rights management.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#4B5D78] hover:bg-[#4B5D78]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};