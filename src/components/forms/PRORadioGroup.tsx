import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PRORadioGroupProps {
  isPROmember: string;
  setIsPROmember: (value: string) => void;
}

const PRORadioGroup = ({ isPROmember, setIsPROmember }: PRORadioGroupProps) => {
  return (
    <div className="space-y-2">
      <Label>Are you a member of a PRO?</Label>
      <RadioGroup
        name="proMembership"
        value={isPROmember}
        onValueChange={setIsPROmember}
        className="flex flex-col space-y-1 mt-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="pro-yes" />
          <Label htmlFor="pro-yes">Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="pro-no" />
          <Label htmlFor="pro-no">No</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PRORadioGroup;