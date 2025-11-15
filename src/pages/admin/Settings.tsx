import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Shield, Database } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold">System Settings</h2>
        <p className="text-muted-foreground">Configure system preferences and security</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              <CardTitle className="font-serif">Notifications</CardTitle>
            </div>
            <CardDescription>Manage system notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified of security events</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Updates</Label>
                <p className="text-sm text-muted-foreground">Updates and maintenance notices</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              <CardTitle className="font-serif">Security</CardTitle>
            </div>
            <CardDescription>Security and encryption settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Key Rotation</Label>
                <p className="text-sm text-muted-foreground">Automatically rotate encryption keys</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Timeout</Label>
                <p className="text-sm text-muted-foreground">Auto logout after 30 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-gold" />
              <CardTitle className="font-serif">Data Management</CardTitle>
            </div>
            <CardDescription>Backup and retention policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Backup Frequency</Label>
              <Input type="text" defaultValue="Daily at 2:00 AM" />
            </div>
            <div className="space-y-2">
              <Label>Retention Period (days)</Label>
              <Input type="number" defaultValue="365" />
            </div>
            <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
              <Database className="w-4 h-4 mr-2" />
              Backup Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-plum" />
              <CardTitle className="font-serif">System Configuration</CardTitle>
            </div>
            <CardDescription>General system settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>System Name</Label>
              <Input type="text" defaultValue="Umi Nur Healthcare Platform" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input type="email" defaultValue="support@uminur.health" />
            </div>
            <div className="space-y-2">
              <Label>Max Upload Size (MB)</Label>
              <Input type="number" defaultValue="50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
