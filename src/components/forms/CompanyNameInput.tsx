import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CompanyNameInputProps {
  value: string;
  onChange: (value: string) => void;
  description?: string;
  label?: string;
}

const CompanyNameInput = ({ 
  value, 
  onChange, 
  description,
  label = "Publishing Company Name"
}: CompanyNameInputProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="company-name">{label}</Label>
      <Input
        id="company-name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your publishing company name"
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default CompanyNameInput;