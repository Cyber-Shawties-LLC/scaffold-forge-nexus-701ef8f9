import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  mode: "patient" | "admin";
}

const ChatBot = ({ mode }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          mode === "patient"
            ? "Hi! I'm Umi, your AI assistant. How can I help you today? I can assist with wellness tips, navigating your dashboard, understanding privacy settings, and answering health questions."
            : "Hello! I'm here to assist with system management. How can I help you navigate admin tools, understand logs, or manage compliance?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, mode, messages.length]);

  const sendMessageToAI = async (message: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Placeholder AI responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    if (mode === "patient") {
      if (lowerMessage.includes("wellness") || lowerMessage.includes("health")) {
        return "I recommend checking out our Wellness Resources section! We have great content on nutrition, exercise, mental health, and sleep hygiene. Would you like me to guide you there?";
      }
      if (lowerMessage.includes("privacy") || lowerMessage.includes("security")) {
        return "Your privacy is our top priority! You can view who accessed your data in the Privacy & Security tab. All your health information is encrypted with military-grade AES-256 encryption.";
      }
      if (lowerMessage.includes("appointment")) {
        return "You can view and manage your appointments in the Appointments tab. Would you like me to show you how to schedule a new appointment?";
      }
      if (lowerMessage.includes("symptom")) {
        return "I can help you understand your symptoms, but remember I'm not a replacement for professional medical advice. For urgent concerns, please contact your healthcare provider. What symptoms are you experiencing?";
      }
      return "I'm here to help! You can ask me about wellness tips, privacy settings, appointments, or navigating your dashboard. What would you like to know?";
    } else {
      if (lowerMessage.includes("log") || lowerMessage.includes("audit")) {
        return "You can access security logs in the Security Logs tab. They show all system access events, authentication attempts, and data access patterns. Would you like guidance on interpreting them?";
      }
      if (lowerMessage.includes("user") || lowerMessage.includes("patient")) {
        return "The Users tab allows you to manage all system users, view their roles, and monitor their activity. You can add new users, modify permissions, or deactivate accounts as needed.";
      }
      if (lowerMessage.includes("compliance") || lowerMessage.includes("hipaa")) {
        return "Umi Nur is designed with HIPAA compliance in mind. All data is encrypted at rest and in transit, and we maintain detailed audit logs. You can generate compliance reports in the Reports tab.";
      }
      if (lowerMessage.includes("report")) {
        return "The Reports tab provides analytics on system usage, security events, and compliance metrics. You can export reports in various formats for auditing purposes.";
      }
      return "I can assist with navigating admin tools, understanding security logs, managing users, and compliance questions. What do you need help with?";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full shadow-luxury flex items-center justify-center hover:scale-110 transition-transform z-50"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6 text-primary-foreground" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-luxury flex flex-col z-50 border border-border animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-card/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-primary-foreground">
                  {mode === "patient" ? "Umi Assistant" : "Admin Assistant"}
                </h3>
                <p className="text-xs text-primary-foreground/80">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-card/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 animate-fade-in",
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground ml-auto"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
