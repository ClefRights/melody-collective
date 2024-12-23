import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupDetailsFormProps {
  email: string;
  password: string;
  songTitle: string;
  writerName: string;
  writerShare: string;
  userPublisherShare: string;
  clefRightsShare: string;
  isSubmitting: boolean;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setSongTitle: (value: string) => void;
  setWriterName: (value: string) => void;
  setUserPublisherShare: (value: string) => void;
  handleShareChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SignupDetailsForm = ({
  email,
  password,
  songTitle,
  writerName,
  writerShare,
  userPublisherShare,
  clefRightsShare,
  isSubmitting,
  setEmail,
  setPassword,
  setSongTitle,
  setWriterName,
  setUserPublisherShare,
  handleShareChange,
  handleSubmit,
}: SignupDetailsFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="songTitle">Song Title</Label>
        <Input
          id="songTitle"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          placeholder="Enter song title"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="writerName">Writer's Name</Label>
        <Input
          id="writerName"
          value={writerName}
          onChange={(e) => setWriterName(e.target.value)}
          placeholder="Enter writer's name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="writerShare">Writer's Share (%)</Label>
        <Input
          id="writerShare"
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
          type="number"
          min="0"
          max="45"
          value={userPublisherShare}
          onChange={(e) => handleShareChange(e.target.value)}
          placeholder="Enter your publisher share percentage"
          required
        />
        <p className="text-sm text-muted-foreground mt-2">
          If you wish to not have any role in administering your song, you may
          leave this as 0% and assign full publishing rights to ClefRights. If you
          do this, you will not have to pay publisher registration or filing fees.
        </p>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Processing..." : "Submit Agreement"}
      </Button>
    </form>
  );
};

export default SignupDetailsForm;