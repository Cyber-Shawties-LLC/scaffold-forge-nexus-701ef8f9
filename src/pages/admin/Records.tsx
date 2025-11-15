import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Download } from "lucide-react";

const Records = () => {
  const records = [
    { id: 1, patient: "John Doe", type: "Lab Results", date: "2024-11-10", encrypted: true, size: "2.4 MB" },
    { id: 2, patient: "Jane Smith", type: "X-Ray", date: "2024-11-09", encrypted: true, size: "5.8 MB" },
    { id: 3, patient: "Mike Wilson", type: "Prescription", date: "2024-11-08", encrypted: true, size: "0.3 MB" },
    { id: 4, patient: "Sarah Lee", type: "Medical History", date: "2024-11-07", encrypted: true, size: "1.2 MB" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold">Medical Records</h2>
          <p className="text-muted-foreground">Encrypted patient records and documents</p>
        </div>
        <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
          <FileText className="w-4 h-4 mr-2" />
          Upload Record
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Shield className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">100% encrypted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">New records added</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Download className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2 GB</div>
            <p className="text-xs text-muted-foreground">of 100 GB available</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Recent Records</CardTitle>
          <CardDescription>Latest uploaded patient records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{record.patient}</p>
                    <p className="text-sm text-muted-foreground">{record.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{record.date}</p>
                    <p className="text-sm text-muted-foreground">{record.size}</p>
                  </div>
                  {record.encrypted && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Encrypted
                    </Badge>
                  )}
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Records;
