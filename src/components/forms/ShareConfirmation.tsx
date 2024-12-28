import { Button } from "@/components/ui/button";

interface ShareConfirmationProps {
  onConfirm: () => void;
}

const ShareConfirmation = ({ onConfirm }: ShareConfirmationProps) => {
  return (
    <div className="space-y-4 bg-muted p-4 rounded-lg">
      <p className="font-medium">Confirmation Required</p>
      <p className="text-sm">
        You have set your publisher share to 0%. This means you are assigning 100% of publishing rights to ClefRights. Please confirm this selection.
      </p>
      <Button onClick={onConfirm} className="w-full">
        Confirm Selection
      </Button>
    </div>
  );
};

export default ShareConfirmation;