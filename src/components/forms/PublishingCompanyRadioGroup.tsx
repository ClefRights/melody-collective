import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PublishingCompanyRadioGroupProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  description?: string;
}

const PublishingCompanyRadioGroup = ({
  label,
  value,
  onValueChange,
  options,
  description,
}: PublishingCompanyRadioGroupProps) => {
  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="flex flex-col space-y-2"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${option.value}`} />
            <Label htmlFor={`${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default PublishingCompanyRadioGroup;