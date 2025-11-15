import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">System usage and performance metrics</p>
        </div>
        <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Records Accessed</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,249</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <BarChart3 className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,582</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-plum" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Usage Analytics</CardTitle>
          <CardDescription>Platform activity over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <BarChart3 className="w-16 h-16 mb-4" />
            <p>Chart visualization would appear here</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Top Accessed Records</CardTitle>
            <CardDescription>Most frequently accessed medical records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lab Results #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Patient ID: #{5000 + i}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{150 - i * 10} views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Peak Usage Times</CardTitle>
            <CardDescription>System activity by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "9:00 AM - 11:00 AM", usage: "High", percentage: 85 },
                { time: "11:00 AM - 1:00 PM", usage: "Medium", percentage: 60 },
                { time: "1:00 PM - 3:00 PM", usage: "High", percentage: 90 },
                { time: "3:00 PM - 5:00 PM", usage: "Medium", percentage: 55 },
                { time: "5:00 PM - 7:00 PM", usage: "Low", percentage: 30 },
              ].map((slot, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{slot.time}</p>
                    <p className="text-sm text-muted-foreground">{slot.usage}</p>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2">
                    <div 
                      className="bg-gold h-2 rounded-full transition-all"
                      style={{ width: `${slot.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
