import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Agreement Submitted",
      description: "Thank you for submitting your co-publishing agreement!",
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
              <Label htmlFor="artistName">Artist/Band Name</Label>
              <Input id="artistName" placeholder="Enter artist or band name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="songTitle">Song Title</Label>
              <Input id="songTitle" placeholder="Enter song title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownership">Ownership Percentage</Label>
              <Input 
                id="ownership" 
                type="number" 
                min="0" 
                max="100" 
                placeholder="Enter ownership percentage" 
                required 
              />
            </div>
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