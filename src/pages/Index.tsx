import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleSignup = () => {
    toast({
      title: "Coming Soon",
      description: "Signup functionality will be available soon!",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4B5D78]">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold mb-4 text-[#FFFFF0] font-sans">Welcome to ClefRights</h1>
        <p className="text-xl text-[#FFFFF0]/80 font-light">Manage your music rights with confidence</p>
        <Button 
          onClick={handleSignup}
          className="bg-[#FFFFF0] text-[#4B5D78] hover:bg-[#FFFFF0]/90"
        >
          Sign Up Now
        </Button>
      </div>
    </div>
  );
};

export default Index;