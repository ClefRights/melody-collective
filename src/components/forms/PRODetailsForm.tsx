import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PRODetailsFormProps {
  proName: string;
  proNumber: string;
  setProName: (value: string) => void;
  setProNumber: (value: string) => void;
}

const PRODetailsForm = ({ proName, proNumber, setProName, setProNumber }: PRODetailsFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="proName">PRO Name</Label>
        <Input 
          id="proName" 
          name="proName"
          value={proName}
          onChange={(e) => setProName(e.target.value)}
          placeholder="Enter your PRO name" 
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="proNumber">PRO Number</Label>
        <Input 
          id="proNumber" 
          name="proNumber"
          value={proNumber}
          onChange={(e) => setProNumber(e.target.value)}
          placeholder="Enter your PRO number" 
          required
        />
      </div>
    </>
  );
};

export default PRODetailsForm;