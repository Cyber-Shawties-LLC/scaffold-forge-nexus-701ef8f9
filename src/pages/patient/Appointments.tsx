import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";

const Appointments = () => {
  const appointments = [
    {
      id: 1,
      title: "Annual Physical",
      doctor: "Dr. Sarah Johnson",
      specialty: "Primary Care",
      date: "2025-01-25",
      time: "10:00 AM",
      location: "Main Clinic, Room 301",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Follow-up Consultation",
      doctor: "Dr. Mike Brown",
      specialty: "Cardiology",
      date: "2025-02-02",
      time: "2:30 PM",
      location: "Cardiology Center, Floor 2",
      status: "confirmed",
    },
    {
      id: 3,
      title: "Lab Results Review",
      doctor: "Dr. Emily White",
      specialty: "Internal Medicine",
      date: "2025-02-10",
      time: "11:15 AM",
      location: "Telehealth",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">My Appointments</h2>
          <p className="text-muted-foreground">Manage your upcoming healthcare visits</p>
        </div>
        <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:border-gold/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-serif">{appointment.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {appointment.doctor} • {appointment.specialty}
                  </CardDescription>
                </div>
                <Badge
                  variant={appointment.status === "confirmed" ? "default" : "secondary"}
                  className={appointment.status === "confirmed" ? "bg-green-500" : ""}
                >
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {new Date(appointment.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{appointment.location}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Cancel
                </Button>
                <Button size="sm" className="flex-1 bg-gold text-gold-foreground hover:bg-gold/90">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
