import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, Shield } from "lucide-react";

const Users = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "patient", status: "active", lastLogin: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "patient", status: "active", lastLogin: "5 hours ago" },
    { id: 3, name: "Dr. Sarah Johnson", email: "sarah@example.com", role: "admin", status: "active", lastLogin: "1 hour ago" },
    { id: 4, name: "Mike Wilson", email: "mike@example.com", role: "patient", status: "inactive", lastLogin: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">All Users</CardTitle>
          <CardDescription>Total {users.length} users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="mb-1">
                      {user.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
                  </div>
                  <Badge variant={user.status === "active" ? "default" : "outline"}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
