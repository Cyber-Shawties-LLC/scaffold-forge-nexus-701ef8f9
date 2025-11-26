import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { pamChat } from "@/lib/pamClient";
import { streamText } from "@/utils/streamText";

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
            ? "Hi! I'm PAM, your AI assistant. How can I help you today? I can assist with wellness tips, navigating your dashboard, understanding privacy settings, and answering health questions."
            : "Hi! I'm PAM. How can I assist you with system management today? I can help with user management, security logs, compliance monitoring, and administrative tasks.",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, mode, messages.length]);

  const sendMessageToAI = async (message: string): Promise<string> => {
    try {
      const reply = await pamChat(message);
      return reply;
    } catch (error) {
      console.error('Error getting PAM response:', error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
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
    const userInput = input;
    setInput("");
    setIsLoading(true);

    // Add placeholder assistant message
    const placeholderId = (Date.now() + 1).toString();
    const placeholderMessage: Message = {
      id: placeholderId,
      role: "assistant",
      content: "...",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, placeholderMessage]);

    try {
      const aiResponse = await sendMessageToAI(userInput);
      
      // Stream the response with typing effect
      await streamText(aiResponse, (partial) => {
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === placeholderId 
              ? { ...msg, content: partial }
              : msg
          )
        );
      });
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === placeholderId 
            ? { ...msg, content: "I'm having trouble connecting right now. Please try again." }
            : msg
        )
      );
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
                  PAM Assistant
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
