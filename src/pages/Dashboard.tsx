import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, MapPin } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

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
      const { data: proInfo, error: proError } = await supabase
        .from('pro_information')
        .select('*')
        .maybeSingle();
      if (proError) throw proError;

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      return { ...proInfo, email: user?.email };
    },
  });

  const handleAddNewWork = () => {
    navigate('/signup', { 
      state: { 
        isNewWork: true,
        proInfo: accountInfo 
      } 
    });
  };

  const handleUpdateAddress = () => {
    // This is a placeholder for the address update functionality
    console.log("Update address clicked");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Works Dashboard</CardTitle>
            <Button onClick={handleAddNewWork}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Work
            </Button>
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
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p className="text-sm">{accountInfo?.email?.split('@')[0] || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">PRO Member</p>
                    <p className="text-sm">{accountInfo?.is_pro_member ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Songwriter IPI #</p>
                    <p className="text-sm">{accountInfo?.songwriter_ipi || '#000000000'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Publisher IPI #</p>
                    <p className="text-sm">{accountInfo?.publisher_ipi || '#000000000'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">MLC/HFA Publisher Account #</p>
                    <p className="text-sm">{accountInfo?.mlc_hfa_publisher_account || 'Not specified'}</p>
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
                    </>
                  )}
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleUpdateAddress}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Update Mailing Address
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Works Table */}
              <ScrollArea className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="bg-muted/50 font-semibold text-foreground" 
                        colSpan={6}
                      >
                        Publisher Information
                      </TableHead>
                      <TableHead className="bg-muted/50" colSpan={3}>
                        Master Recording
                      </TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead className="w-[200px]">Work Title</TableHead>
                      <TableHead className="w-[150px]">ISWC</TableHead>
                      <TableHead className="w-[120px]">Songwriter %</TableHead>
                      <TableHead className="w-[120px]">Publisher %</TableHead>
                      <TableHead className="w-[120px]">Territories</TableHead>
                      <TableHead className="w-[150px]">MLC/HFA Song Code</TableHead>
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
                        <TableCell>{work.mlc_hfa_song_code}</TableCell>
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