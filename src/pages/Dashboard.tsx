import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for demonstration - in a real app this would come from your database
const mockData = {
  accountHolder: {
    name: "John Doe",
    songwriterIPI: "123456789",
    publisherIPI: "N/A", // This would be conditional based on publishing rights
  },
  works: [
    {
      title: "Sample Song 1",
      iswc: "T-123.456.789-0",
      songwriterPercentage: "50%",
      publisherPercentage: "25%",
      territories: "Worldwide",
      recording: {
        artist: "Artist Name",
        label: "Record Label Co.",
        isrc: "USRC17607839",
      },
    },
    // Add more mock entries as needed
  ],
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Works Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[250px_1fr] gap-6">
              {/* Account Information Sidebar */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Account Holder</p>
                    <p className="text-sm">{mockData.accountHolder.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Songwriter IPI #</p>
                    <p className="text-sm">{mockData.accountHolder.songwriterIPI}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Publisher IPI #</p>
                    <p className="text-sm">{mockData.accountHolder.publisherIPI}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Works Table */}
              <ScrollArea className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Work Title</TableHead>
                      <TableHead>ISWC</TableHead>
                      <TableHead>Songwriter %</TableHead>
                      <TableHead>Publisher %</TableHead>
                      <TableHead>Territories</TableHead>
                      <TableHead className="bg-muted/50" colSpan={3}>
                        Master Recording
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead className="w-[200px]"></TableHead>
                      <TableHead className="w-[150px]"></TableHead>
                      <TableHead className="w-[120px]"></TableHead>
                      <TableHead className="w-[120px]"></TableHead>
                      <TableHead className="w-[120px]"></TableHead>
                      <TableHead className="bg-muted/50 w-[200px]">Recording Artist</TableHead>
                      <TableHead className="bg-muted/50 w-[200px]">Record Label</TableHead>
                      <TableHead className="bg-muted/50 w-[150px]">ISRC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.works.map((work, index) => (
                      <TableRow key={index}>
                        <TableCell>{work.title}</TableCell>
                        <TableCell>{work.iswc}</TableCell>
                        <TableCell>{work.songwriterPercentage}</TableCell>
                        <TableCell>{work.publisherPercentage}</TableCell>
                        <TableCell>{work.territories}</TableCell>
                        <TableCell className="bg-muted/50">{work.recording.artist}</TableCell>
                        <TableCell className="bg-muted/50">{work.recording.label}</TableCell>
                        <TableCell className="bg-muted/50">{work.recording.isrc}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;