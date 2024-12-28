import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PublisherShareInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PublisherShareInput = ({ value, onChange }: PublisherShareInputProps) => {
  return (
    <div className="space-y-4">
      <Label htmlFor="publisher-share">Publisher Share (%)</Label>
      <Input
        id="publisher-share"
        type="number"
        min="0"
        max="45"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-sm text-muted-foreground">
        Because your work must have a publisher, you may set your share to 0% and assign all publishing rights and publishing expenses to ClefRights.
      </p>
    </div>
  );
};

export default PublisherShareInput;