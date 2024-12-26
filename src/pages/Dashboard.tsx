import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: works } = useQuery({
    queryKey: ['works'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('works')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: accountInfo } = useQuery({
    queryKey: ['pro_information'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pro_information')
        .select('*')
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const createTestAccount = useMutation({
    mutationFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("No user logged in");

      const { error } = await supabase
        .from('pro_information')
        .upsert({
          user_id: user.user.id,
          is_pro_member: true,
          pro_name: 'ASCAP',
          pro_number: 'TEST123',
          songwriter_ipi: '00000000',
          publisher_ipi: '1111111111'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Test account created",
        description: "Successfully created test PRO information"
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating test account",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleAddNewWork = () => {
    navigate('/signup', { 
      state: { 
        isNewWork: true,
        proInfo: accountInfo 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Works Dashboard</CardTitle>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => createTestAccount.mutate()}
                disabled={createTestAccount.isPending}
              >
                Create Test Account
              </Button>
              <Button onClick={handleAddNewWork}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Work
              </Button>
            </div>
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
                    <p className="text-sm font-medium text-muted-foreground">PRO Member</p>
                    <p className="text-sm">{accountInfo?.is_pro_member ? 'Yes' : 'No'}</p>
                  </div>
                  {accountInfo?.is_pro_member && (
                    <>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">PRO Name</p>
                        <p className="text-sm">{accountInfo?.pro_name || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">PRO Number</p>
                        <p className="text-sm">{accountInfo?.pro_number || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Songwriter IPI</p>
                        <p className="text-sm">{accountInfo?.songwriter_ipi || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Publisher IPI</p>
                        <p className="text-sm">{accountInfo?.publisher_ipi || 'Not specified'}</p>
                      </div>
                    </>
                  )}
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
                    {works?.map((work, index) => (
                      <TableRow key={index}>
                        <TableCell>{work.title}</TableCell>
                        <TableCell>{work.iswc}</TableCell>
                        <TableCell>{work.songwriter_percentage}%</TableCell>
                        <TableCell>{work.publisher_percentage}%</TableCell>
                        <TableCell>{work.territories}</TableCell>
                        <TableCell className="bg-muted/50">{work.recording_artist}</TableCell>
                        <TableCell className="bg-muted/50">{work.record_label}</TableCell>
                        <TableCell className="bg-muted/50">{work.isrc}</TableCell>
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