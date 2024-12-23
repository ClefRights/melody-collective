import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#4B5D78] p-4">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to your ClefRights dashboard. This is a placeholder for your account management interface.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;