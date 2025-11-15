import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

const Appointments = () => {
  const appointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", date: "2024-11-15", time: "10:00 AM", status: "scheduled" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", date: "2024-11-15", time: "02:00 PM", status: "confirmed" },
    { id: 3, patient: "Mike Wilson", doctor: "Dr. Brown", date: "2024-11-16", time: "09:00 AM", status: "scheduled" },
    { id: 4, patient: "Sarah Lee", doctor: "Dr. Davis", date: "2024-11-16", time: "11:30 AM", status: "cancelled" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">Appointments</h2>
          <p className="text-muted-foreground">Manage and schedule patient appointments</p>
        </div>
        <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Calendar className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 pending confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">5 cancellations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Next Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">Available slots: 15</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Upcoming Appointments</CardTitle>
          <CardDescription>Next scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">with {appointment.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {appointment.date}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      appointment.status === "confirmed" ? "default" : 
                      appointment.status === "cancelled" ? "destructive" : 
                      "secondary"
                    }
                  >
                    {appointment.status}
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

export default Appointments;
