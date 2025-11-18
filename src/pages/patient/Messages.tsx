import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Search } from "lucide-react";

const Messages = () => {
  const [selectedThread, setSelectedThread] = useState<number | null>(1);

  const threads = [
    {
      id: 1,
      subject: "Lab Results Follow-up",
      doctor: "Dr. Sarah Johnson",
      lastMessage: "Your recent lab results look great. Let me know if you have any questions.",
      date: "2 hours ago",
      unread: false,
      status: "active",
    },
    {
      id: 2,
      subject: "Prescription Refill Request",
      doctor: "Dr. Mike Brown",
      lastMessage: "I've approved your prescription refill. You can pick it up tomorrow.",
      date: "1 day ago",
      unread: true,
      status: "active",
    },
    {
      id: 3,
      subject: "Appointment Confirmation",
      doctor: "Reception Team",
      lastMessage: "Your appointment on Feb 2nd at 2:30 PM is confirmed.",
      date: "3 days ago",
      unread: false,
      status: "active",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "You",
      content: "Hello Dr. Johnson, I received a notification about my lab results. Could you please provide more details?",
      timestamp: "10:30 AM",
      isUser: true,
    },
    {
      id: 2,
      sender: "Dr. Sarah Johnson",
      content: "Hi! Your recent blood work came back and everything looks great. Your cholesterol levels have improved since your last visit, and all other markers are within normal ranges.",
      timestamp: "11:15 AM",
      isUser: false,
    },
    {
      id: 3,
      sender: "You",
      content: "That's wonderful news! Thank you for letting me know. Are there any dietary recommendations you'd suggest to maintain these levels?",
      timestamp: "11:20 AM",
      isUser: true,
    },
    {
      id: 4,
      sender: "Dr. Sarah Johnson",
      content: "Your recent lab results look great. Let me know if you have any questions.",
      timestamp: "2:45 PM",
      isUser: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold">Secure Messages</h2>
        <p className="text-muted-foreground">Communicate securely with your healthcare providers</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Thread List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="border-0 p-0 focus-visible:ring-0" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread.id)}
                  className={`p-4 cursor-pointer hover:bg-accent/5 transition-colors ${
                    selectedThread === thread.id ? "bg-accent/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm">{thread.subject}</p>
                    {thread.unread && (
                      <Badge variant="default" className="ml-2 bg-gold text-gold-foreground">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{thread.doctor}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{thread.lastMessage}</p>
                  <p className="text-xs text-muted-foreground mt-2">{thread.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif">Lab Results Follow-up</CardTitle>
            <CardDescription>Conversation with Dr. Sarah Johnson</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      message.isUser
                        ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="space-y-3">
              <Textarea
                placeholder="Type your message..."
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
