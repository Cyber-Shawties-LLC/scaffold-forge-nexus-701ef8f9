import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Lock } from "lucide-react";

const Records = () => {
  const records = [
    {
      id: 1,
      title: "Annual Physical Exam Results",
      date: "2025-01-15",
      type: "Lab Results",
      doctor: "Dr. Sarah Johnson",
      status: "complete",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Cardiology Consultation Report",
      date: "2025-01-10",
      type: "Consultation",
      doctor: "Dr. Mike Brown",
      status: "complete",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "X-Ray Images - Chest",
      date: "2024-12-20",
      type: "Imaging",
      doctor: "Dr. Emily White",
      status: "complete",
      size: "8.5 MB",
    },
    {
      id: 4,
      title: "Blood Work - Complete Panel",
      date: "2024-12-15",
      type: "Lab Results",
      doctor: "Dr. Sarah Johnson",
      status: "complete",
      size: "1.2 MB",
    },
  ];

  const recordTypes = [
    { label: "All Records", count: records.length },
    { label: "Lab Results", count: records.filter((r) => r.type === "Lab Results").length },
    { label: "Imaging", count: records.filter((r) => r.type === "Imaging").length },
    { label: "Consultations", count: records.filter((r) => r.type === "Consultation").length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">My Medical Records</h2>
          <p className="text-muted-foreground">Securely encrypted and HIPAA-compliant</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4 text-green-500" />
          <span>AES-256 Encrypted</span>
        </div>
      </div>

      {/* Record Type Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recordTypes.map((type) => (
          <Card key={type.label} className="cursor-pointer hover:border-gold/50 transition-all">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-1">{type.label}</p>
              <p className="text-2xl font-bold text-gold">{type.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.id} className="hover:border-gold/50 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">{record.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {record.doctor} • {new Date(record.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                <Badge>{record.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Size: {record.size} • Status: {record.status}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Records;
