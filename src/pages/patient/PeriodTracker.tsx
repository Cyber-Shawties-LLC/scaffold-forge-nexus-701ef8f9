import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, TrendingUp, Activity, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, addDays, differenceInDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface PeriodTrackerData {
  id?: string;
  user_id: string;
  last_period: string;
  cycle_length: number;
  period_length: number;
  next_period?: string;
  fertile_window_start?: string;
  fertile_window_end?: string;
  notifications_enabled: boolean;
}

const PeriodTracker = () => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastPeriod, setLastPeriod] = useState<string>("");
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [trackerData, setTrackerData] = useState<PeriodTrackerData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Calculate predictions
  const calculatePredictions = (lastPeriodDate: Date, cycleLen: number, periodLen: number) => {
    const nextPeriodDate = addDays(lastPeriodDate, cycleLen);
    const fertileStart = addDays(lastPeriodDate, cycleLen - 14);
    const fertileEnd = addDays(fertileStart, 5);

    return {
      nextPeriod: nextPeriodDate,
      fertileWindowStart: fertileStart,
      fertileWindowEnd: fertileEnd,
    };
  };

  // Get predictions
  const predictions = lastPeriod
    ? calculatePredictions(new Date(lastPeriod), cycleLength, periodLength)
    : null;

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);

        const { data, error } = await supabase
          .from("period_tracker")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "not found" error
          console.error("Error loading period tracker data:", error);
          return;
        }

        if (data) {
          setTrackerData(data);
          setLastPeriod(data.last_period);
          setCycleLength(data.cycle_length);
          setPeriodLength(data.period_length);
          setNotificationsEnabled(data.notifications_enabled || false);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to Supabase
  const handleSave = async () => {
    if (!lastPeriod || !userId) {
      toast.error("Please enter your last period date");
      return;
    }

    setSaving(true);
    try {
      const predictions = calculatePredictions(new Date(lastPeriod), cycleLength, periodLength);

      const dataToSave = {
        user_id: userId,
        last_period: lastPeriod,
        cycle_length: cycleLength,
        period_length: periodLength,
        next_period: format(predictions.nextPeriod, "yyyy-MM-dd"),
        fertile_window_start: format(predictions.fertileWindowStart, "yyyy-MM-dd"),
        fertile_window_end: format(predictions.fertileWindowEnd, "yyyy-MM-dd"),
        notifications_enabled: notificationsEnabled,
      };

      if (trackerData?.id) {
        // Update existing record
        const { error } = await supabase
          .from("period_tracker")
          .update(dataToSave)
          .eq("id", trackerData.id);

        if (error) throw error;
        toast.success("Period tracker updated successfully");
      } else {
        // Insert new record
        const { error } = await supabase
          .from("period_tracker")
          .insert([{ ...dataToSave, user_id: userId }]);

        if (error) throw error;
        toast.success("Period tracker saved successfully");
      }

      // Reload data
      const { data } = await supabase
        .from("period_tracker")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (data) {
        setTrackerData(data);
      }
    } catch (error: any) {
      console.error("Error saving data:", error);
      toast.error(error.message || "Failed to save period tracker data");
    } finally {
      setSaving(false);
    }
  };

  // Placeholder notification functions
  const handleNotificationToggle = async (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    // Future: Integrate with SMS/email service
    if (enabled) {
      toast.info("Period reminders will be enabled once SMS/email integration is configured");
    }
  };

  // Calendar helpers
  const getCalendarDates = () => {
    if (!predictions) return { periodDates: [], fertileDates: [] };

    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const periodDates: Date[] = [];
    const fertileDates: Date[] = [];

    days.forEach((day) => {
      if (isSameDay(day, predictions.nextPeriod)) {
        periodDates.push(day);
      }
      if (
        isWithinInterval(day, {
          start: predictions.fertileWindowStart,
          end: predictions.fertileWindowEnd,
        })
      ) {
        fertileDates.push(day);
      }
    });

    return { periodDates, fertileDates };
  };

  const { periodDates, fertileDates } = getCalendarDates();

  // Analytics calculations (placeholder - would use real data)
  const averageCycleLength = cycleLength;
  const trackedPeriods = trackerData ? 1 : 0; // Placeholder

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold mb-2">Period Tracker</h2>
        <p className="text-muted-foreground">Track and predict your menstrual cycle</p>
      </div>

      {/* VERSION 1 - BASIC TRACKER */}
      <Card className="bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Activity className="w-5 h-5 text-gold" />
            Cycle Information
          </CardTitle>
          <CardDescription>Enter your cycle details to get predictions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="last-period" className="text-sm font-medium">
                Last Period Date
              </Label>
              <Input
                id="last-period"
                type="date"
                value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)}
                className="w-full h-12 text-base md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cycle-length" className="text-sm font-medium">
                Cycle Length (days)
              </Label>
              <Input
                id="cycle-length"
                type="number"
                min="21"
                max="35"
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                className="w-full h-12 text-base md:text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period-length" className="text-sm font-medium">
                Period Length (days)
              </Label>
              <Input
                id="period-length"
                type="number"
                min="3"
                max="7"
                value={periodLength}
                onChange={(e) => setPeriodLength(parseInt(e.target.value) || 5)}
                className="w-full h-12 text-base md:text-sm"
              />
            </div>
          </div>

          {predictions && (
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-plum/10 rounded-xl p-6 border border-primary/20">
              <h3 className="font-serif text-xl font-bold mb-4 text-foreground">Predictions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/50 rounded-lg p-4 border border-primary/10">
                  <p className="text-sm text-muted-foreground mb-1">Next Period</p>
                  <p className="text-lg font-semibold text-foreground">
                    {format(predictions.nextPeriod, "EEEE, MMMM d, yyyy")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    In {differenceInDays(predictions.nextPeriod, new Date())} days
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-primary/10">
                  <p className="text-sm text-muted-foreground mb-1">Fertile Window</p>
                  <p className="text-lg font-semibold text-foreground">
                    {format(predictions.fertileWindowStart, "MMM d")} - {format(predictions.fertileWindowEnd, "MMM d, yyyy")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {differenceInDays(predictions.fertileWindowEnd, predictions.fertileWindowStart) + 1} days
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={saving || !lastPeriod}
            className="w-full md:w-auto bg-gold hover:bg-gold/90 text-gold-foreground font-semibold h-12 px-8"
          >
            {saving ? "Saving..." : "Save Data"}
          </Button>
        </CardContent>
      </Card>

      {/* VERSION 2 - CALENDAR VIEW */}
      {predictions && (
        <Card className="bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gold" />
              Calendar View
            </CardTitle>
            <CardDescription>Visualize your cycle predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <Calendar
                  className="rounded-lg border border-primary/20"
                  modifiers={{
                    period: periodDates,
                    fertile: fertileDates,
                  }}
                  modifiersClassNames={{
                    period: "bg-red-500/20 text-red-700 font-semibold border border-red-500/50 rounded",
                    fertile: "bg-teal-500/20 text-teal-700 font-semibold border border-teal-500/50 rounded",
                  }}
                />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/50"></div>
                  <span className="text-sm">Predicted Period</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-teal-500/20 border border-teal-500/50"></div>
                  <span className="text-sm">Fertile Window</span>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
                  <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                  <p className="font-semibold text-foreground">
                    {differenceInDays(predictions.nextPeriod, new Date()) > 0
                      ? `${differenceInDays(predictions.nextPeriod, new Date())} days until next period`
                      : "Period may have started"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* VERSION 3 - ANALYTICS VIEW */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              Average Cycle Length
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{averageCycleLength}</div>
            <p className="text-xs text-muted-foreground mt-1">days</p>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              Tracked Periods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{trackedPeriods}</div>
            <p className="text-xs text-muted-foreground mt-1">total tracked</p>
          </CardContent>
        </Card>

        <Card className="bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gold" />
              Predictions Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 flex items-center justify-center text-muted-foreground text-sm">
              <p>Trend graph placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VERSION 7 - NOTIFICATIONS */}
      <Card className="bg-card/95 backdrop-blur-sm border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Bell className="w-5 h-5 text-gold" />
            Notifications
          </CardTitle>
          <CardDescription>Enable period reminder notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <div className="space-y-1">
              <p className="font-medium text-foreground">Period Reminders</p>
              <p className="text-sm text-muted-foreground">
                Get notified before your next period starts
              </p>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={handleNotificationToggle}
              className="data-[state=checked]:bg-gold"
            />
          </div>
          {notificationsEnabled && (
            <p className="text-xs text-muted-foreground mt-4">
              SMS and email notifications will be configured in a future update.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PeriodTracker;

