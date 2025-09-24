import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User, MapPin, Clock, Phone, BookOpen, Users } from "lucide-react";
import { CampusMap } from "./CampusMap";
import { SearchBox } from "./SearchBox";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "map" | "search" | "quick-actions" | "rich-media";
  data?: any;
}

interface ChatBotProps {
  userRole?: string;
}

export function ChatBot({ userRole = "visitor" }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm your VVITU Campus AI assistant. I can help you with directions to college, admissions, facilities, placements, and much more about VVITU. How can I assist you today?`,
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

  const getBotResponse = (userMessage: string): { content: string; type: string; data?: any } => {
    const message = userMessage.toLowerCase();
    
    // Directions to VVITU College
    if (message.includes("direction") || message.includes("how to reach") || message.includes("location") || message.includes("address")) {
      return {
        content: "Here are the directions to reach VVITU College:",
        type: "rich-media",
        data: {
          items: [
            { title: "Address", value: "VVITU Campus, Education City, Tamil Nadu", icon: "📍" },
            { title: "By Bus", value: "Take Bus Route 45A, 67B from Central Station", icon: "🚌" },
            { title: "By Train", value: "Nearest Railway Station: City Junction (5km)", icon: "🚂" },
            { title: "By Car", value: "Take NH-44, Exit at VVITU Junction", icon: "🚗" },
            { title: "Landmarks", value: "Near City Mall & Tech Park", icon: "🏢" },
            { title: "GPS Coordinates", value: "11.0168° N, 76.9558° E", icon: "🗺️" }
          ]
        }
      };
    }

    // Map/Navigation queries
    if (message.includes("map") || message.includes("navigate") || message.includes("where is") || message.includes("find building")) {
      return {
        content: "Here's our interactive VVITU campus map! You can click on any building to get more information and directions.",
        type: "map",
        data: { searchQuery: message.includes("library") ? "library" : message.includes("cafeteria") ? "cafeteria" : "" }
      };
    }

    // Search queries
    if (message.includes("search") || message.includes("find") || message.includes("look for")) {
      return {
        content: "I can help you search for departments, services, events, and facilities at VVITU. What are you looking for?",
        type: "search"
      };
    }

    // VVITU Department queries
    if (message.includes("department") || message.includes("course") || message.includes("branch")) {
      return {
        content: "VVITU offers excellent departments with state-of-the-art facilities. Here are our main departments:",
        type: "quick-actions",
        data: {
          actions: [
            { text: "Computer Science & Engineering", icon: "💻", action: "Show CSE Department" },
            { text: "Electronics & Communication", icon: "📡", action: "Show ECE Department" },
            { text: "Mechanical Engineering", icon: "⚙️", action: "Show Mechanical" },
            { text: "Civil Engineering", icon: "🏗️", action: "Show Civil" },
            { text: "Information Technology", icon: "🌐", action: "Show IT Department" },
            { text: "MBA", icon: "💼", action: "Show MBA" }
          ]
        }
      };
    }
    
    // VVITU Admission queries
    if (message.includes("admission") || message.includes("apply") || message.includes("eligibility")) {
      const isStudent = userRole === "student";
      const content = isStudent 
        ? "As a current VVITU student, here's information about course registration and academic procedures:"
        : "Welcome to VVITU Admissions! Here's everything you need to know about joining our institution:";
      
      return {
        content,
        type: "rich-media",
        data: {
          items: [
            { title: "Application Period", value: "June 1 - July 31, 2024", icon: "📅" },
            { title: "Entrance Exam", value: "TNEA / JEE Main / VVITU Entrance", icon: "📝" },
            { title: "Application Fee", value: "₹1,200 (General) / ₹600 (SC/ST)", icon: "💰" },
            { title: "Eligibility", value: "12th with 60% in PCM", icon: "🎓" },
            { title: "Seats Available", value: "1,200+ across all branches", icon: "🪑" },
            { title: "Admissions Office", value: "+91-422-2123456", icon: "📞" }
          ]
        }
      };
    }
    
    // VVITU Fee information
    if (message.includes("fee") || message.includes("cost") || message.includes("tuition") || message.includes("fees")) {
      return {
        content: "Here's VVITU's current fee structure. Scholarships and financial assistance are available:",
        type: "rich-media",
        data: {
          items: [
            { title: "B.Tech Annual Fee", value: "₹1,25,000", icon: "🎓" },
            { title: "MBA Annual Fee", value: "₹2,50,000", icon: "📚" },
            { title: "Hostel Fee", value: "₹80,000/year", icon: "🏠" },
            { title: "Mess Fee", value: "₹45,000/year", icon: "🍽️" },
            { title: "Library Fee", value: "₹5,000/year", icon: "📖" },
            { title: "Scholarships", value: "Merit & Need Based", icon: "💡" }
          ]
        }
      };
    }

    // VVITU Facilities
    if (message.includes("facilities") || message.includes("amenities") || message.includes("infrastructure")) {
      return {
        content: "VVITU provides world-class facilities for holistic development:",
        type: "rich-media",
        data: {
          items: [
            { title: "Central Library", value: "2 Lakh+ Books, Digital Resources", icon: "📚" },
            { title: "Laboratories", value: "State-of-art Research Labs", icon: "🔬" },
            { title: "Sports Complex", value: "Indoor & Outdoor Facilities", icon: "🏃" },
            { title: "Hostels", value: "Separate Boys & Girls Hostels", icon: "🏠" },
            { title: "Medical Center", value: "24/7 Healthcare Facility", icon: "🏥" },
            { title: "WiFi Campus", value: "High-Speed Internet", icon: "📶" }
          ]
        }
      };
    }

    // VVITU Placements
    if (message.includes("placement") || message.includes("job") || message.includes("career") || message.includes("companies")) {
      return {
        content: "VVITU has an excellent placement record with top companies visiting our campus:",
        type: "rich-media",
        data: {
          items: [
            { title: "Placement Rate", value: "95% (2023-24)", icon: "📈" },
            { title: "Highest Package", value: "₹45 LPA", icon: "💰" },
            { title: "Average Package", value: "₹8.5 LPA", icon: "💵" },
            { title: "Top Recruiters", value: "TCS, Infosys, Wipro, Cognizant", icon: "🏢" },
            { title: "Core Companies", value: "L&T, Ashok Leyland, TVS", icon: "⚙️" },
            { title: "Training Programs", value: "Skill Development & Aptitude", icon: "🎯" }
          ]
        }
      };
    }
    
    // VVITU Library with contextual response
    if (message.includes("library") || message.includes("book")) {
      const isStudent = userRole === "student";
      const content = isStudent
        ? "Welcome back to VVITU Central Library! Here's your library information:"
        : "VVITU Central Library offers extensive resources for research and study:";
      
      return {
        content,
        type: "rich-media",
        data: {
          items: [
            { title: "Opening Hours", value: "7 AM - 11 PM (Mon-Sat)", icon: "🕒" },
            { title: "Collection", value: "2 Lakh+ Books & Journals", icon: "📚" },
            { title: "Digital Library", value: "IEEE, ACM, Springer Access", icon: "💻" },
            { title: "Study Spaces", value: "Individual & Group Study Rooms", icon: "🪑" },
            { title: "Research Facilities", value: "PhD & M.Tech Research Support", icon: "🔬" },
            { title: "E-Resources", value: "24/7 Online Access", icon: "🌐" }
          ]
        }
      };
    }

    // VVITU About/History
    if (message.includes("about") || message.includes("history") || message.includes("vvitu") || message.includes("college info")) {
      return {
        content: "VVITU (Vellore Vishvakarma Institute of Technology University) - Excellence in Technical Education:",
        type: "rich-media",
        data: {
          items: [
            { title: "Established", value: "1984 (40 Years of Excellence)", icon: "🏛️" },
            { title: "Accreditation", value: "NAAC A++ Grade, NBA Accredited", icon: "🏆" },
            { title: "Ranking", value: "NIRF Ranked Engineering College", icon: "📊" },
            { title: "Student Strength", value: "8,000+ Students", icon: "👥" },
            { title: "Faculty", value: "500+ Qualified Faculty", icon: "👨‍🏫" },
            { title: "Vision", value: "Global Technology Leadership", icon: "🌟" }
          ]
        }
      };
    }
    
    // Greeting with role-based response
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      const roleGreeting = {
        student: "Hello! Welcome back to your student portal. I can help you with courses, grades, library access, and more.",
        visitor: "Hello! Welcome to our college. I'm here to help you explore our campus, departments, and admission information.",
        admin: "Hello! I can assist you with system management, user analytics, and content updates.",
        other: "Hello! Welcome to our college. I can provide general information about our campus and services."
      };
      
      return {
        content: roleGreeting[userRole as keyof typeof roleGreeting] || roleGreeting.other,
        type: "quick-actions",
        data: {
          actions: [
            { text: "Campus Map", icon: "🗺️", action: "show_map" },
            { text: "Search", icon: "🔍", action: "show_search" },
            { text: "Departments", icon: "🏢", action: "show_departments" },
            { text: "Contact", icon: "📞", action: "show_contact" }
          ]
        }
      };
    }
    
    // VVITU Contact information
    if (message.includes("contact") || message.includes("phone") || message.includes("email") || message.includes("helpline")) {
      return {
        content: "Here are VVITU's contact details and important numbers:",
        type: "rich-media",
        data: {
          items: [
            { title: "Main Office", value: "+91-422-2123456", icon: "📞" },
            { title: "Email", value: "info@vvitu.ac.in", icon: "📧" },
            { title: "Admissions", value: "+91-422-2123457", icon: "🎓" },
            { title: "Placement Cell", value: "+91-422-2123458", icon: "💼" },
            { title: "Student Helpline", value: "+91-422-2123459", icon: "🆘" },
            { title: "Emergency", value: "108 / Campus Security: 100", icon: "🚨" }
          ]
        }
      };
    }

    // Default response with helpful actions
    return {
      content: "I'm here to help! While I'm still learning about that topic, I can definitely assist you with campus information, directions, and services. What would you like to explore?",
      type: "quick-actions",
      data: {
        actions: [
          { text: "Show Campus Map", icon: "🗺️", action: "show_map" },
          { text: "Search Campus", icon: "🔍", action: "show_search" },
          { text: "Contact Info", icon: "📞", action: "show_contact" },
          { text: "Ask Different Question", icon: "💭", action: "continue" }
        ]
      }
    };
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
      const response = getBotResponse(userMessage.content);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "bot",
        timestamp: new Date(),
        type: response.type as any,
        data: response.data,
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

  const handleQuickAction = (action: string) => {
    let response: Message;
    
    switch (action) {
      case "show_map":
        response = {
          id: Date.now().toString(),
          content: "Here's our interactive campus map! You can click on buildings for more details.",
          sender: "bot",
          timestamp: new Date(),
          type: "map"
        };
        break;
      case "show_search":
        response = {
          id: Date.now().toString(),
          content: "Use the search below to find departments, services, events, and facilities:",
          sender: "bot",
          timestamp: new Date(),
          type: "search"
        };
        break;
      default:
        const botResponse = getBotResponse(action);
        response = {
          id: Date.now().toString(),
          content: botResponse.content,
          sender: "bot",
          timestamp: new Date(),
          type: botResponse.type as any,
          data: botResponse.data
        };
    }
    
    setMessages(prev => [...prev, response]);
  };

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case "map":
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            <div className="max-w-sm">
              <CampusMap searchQuery={message.data?.searchQuery} />
            </div>
          </div>
        );
      
      case "search":
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            <SearchBox placeholder="Search campus..." />
          </div>
        );
      
      case "quick-actions":
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            <div className="grid grid-cols-2 gap-2">
              {message.data?.actions?.map((action: any, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 text-xs"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <span className="mr-1">{action.icon}</span>
                  {action.text}
                </Button>
              ))}
            </div>
          </div>
        );
      
      case "rich-media":
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            <div className="space-y-2">
              {message.data?.items?.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <p className="text-sm">{message.content}</p>;
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
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {renderMessageContent(message)}
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