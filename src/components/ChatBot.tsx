import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  userRole?: string;
}

export function ChatBot({ userRole = "visitor" }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm your campus AI assistant. I can help you with information about our college. How can I assist you today?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Sample responses based on common queries
    if (message.includes("department") || message.includes("course")) {
      return "Our college offers various departments including Computer Science, Engineering, Business Administration, and Liberal Arts. Each department has specialized programs and excellent faculty. Would you like more information about a specific department?";
    }
    
    if (message.includes("admission") || message.includes("apply")) {
      return "Admissions are open for the upcoming semester! You can apply online through our portal. We offer undergraduate and graduate programs. The application deadline is approaching. Would you like information about specific admission requirements?";
    }
    
    if (message.includes("fee") || message.includes("cost") || message.includes("tuition")) {
      return "Our fee structure varies by program. Undergraduate programs start from $15,000 per year, and graduate programs from $20,000 per year. We also offer scholarships and financial aid. Would you like detailed fee information?";
    }
    
    if (message.includes("library") || message.includes("book")) {
      return "Our library is open Monday-Saturday, 8 AM to 10 PM. We have over 100,000 books, digital resources, and study spaces. Students can borrow books using their student ID. Need help finding specific resources?";
    }
    
    if (message.includes("campus") || message.includes("location") || message.includes("map")) {
      return "Our campus spans 50 acres with modern facilities including lecture halls, labs, dormitories, cafeteria, sports complex, and parking. I can help you navigate to specific buildings or provide a virtual tour. Where would you like to go?";
    }
    
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Welcome to our college. I'm here to help you with any questions about our campus, programs, or services. What would you like to know?";
    }
    
    if (message.includes("contact") || message.includes("phone") || message.includes("email")) {
      return "You can reach us at: Phone: (555) 123-4567, Email: info@college.edu. Our admissions office is open Monday-Friday, 9 AM to 5 PM. The main office is located in the Administration Building, Room 101.";
    }

    // Default response
    return "I understand you're asking about that topic. While I'm still learning, I'd be happy to connect you with our staff who can provide detailed information. You can also visit our main office or check our website for more resources. Is there anything else I can help you with?";
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(userMessage.content),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow hover:shadow-glow"
        variant="hero"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-academic border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-subtle">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Campus AI Assistant
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.sender === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about the campus..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={sendMessage} size="icon" variant="default">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}