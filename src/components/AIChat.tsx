import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Send, Bot, User, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChat = ({ isOpen, onClose }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI Real Estate Assistant. I can help you with property inquiries, market analysis, investment advice, and more. What would you like to know?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    // Property search queries
    if (lowercaseMessage.includes('property') || lowercaseMessage.includes('house') || lowercaseMessage.includes('apartment')) {
      return "I'd be happy to help you find properties! Based on current market data, here are some recommendations:\n\n📍 **Prime Locations Available:**\n• Downtown area: $450,000 - $750,000\n• Suburban neighborhoods: $320,000 - $520,000\n• Waterfront properties: $680,000 - $1.2M\n\nWhat's your preferred location, budget range, and property type?";
    }

    // Investment queries
    if (lowercaseMessage.includes('invest') || lowercaseMessage.includes('roi') || lowercaseMessage.includes('return')) {
      return "Great question about investment opportunities! 📈\n\n**Current Market Trends:**\n• Average ROI: 12-15% annually\n• Best performing areas: Tech corridors, university districts\n• Rental yield: 8-12% in prime locations\n\n**Investment Tips:**\n• Focus on growing neighborhoods\n• Consider properties near transportation hubs\n• Factor in renovation costs\n\nWould you like a detailed analysis of any specific area?";
    }

    // Market analysis
    if (lowercaseMessage.includes('market') || lowercaseMessage.includes('price') || lowercaseMessage.includes('trend')) {
      return "Here's the latest market analysis: 📊\n\n**Current Market Status:**\n• Property values increased 8.5% this year\n• Average days on market: 23 days\n• Inventory levels: Moderate (3.2 months supply)\n\n**Price Trends:**\n• Single family homes: +7.2%\n• Condos: +9.1%\n• Luxury properties: +5.8%\n\n**Forecast:** Continued steady growth expected through Q4. Best time to buy or sell?";
    }

    // Location-based queries
    if (lowercaseMessage.includes('location') || lowercaseMessage.includes('area') || lowercaseMessage.includes('neighborhood')) {
      return "I can help you explore different areas! 🏘️\n\n**Popular Neighborhoods:**\n• **Downtown Core:** Urban lifestyle, high appreciation\n• **Green Valley:** Family-friendly, excellent schools\n• **Riverside District:** Luxury homes, scenic views\n• **Tech Hub:** New developments, young professionals\n\n**Factors to Consider:**\n• Commute times\n• School ratings\n• Amenities nearby\n• Future development plans\n\nWhich area interests you most?";
    }

    // Financing queries
    if (lowercaseMessage.includes('loan') || lowercaseMessage.includes('mortgage') || lowercaseMessage.includes('finance')) {
      return "Let me help you understand financing options: 💰\n\n**Current Rates (as of today):**\n• 30-year fixed: 7.2% - 7.8%\n• 15-year fixed: 6.8% - 7.4%\n• FHA loans: 6.9% - 7.5%\n• VA loans: 6.8% - 7.3%\n\n**Pre-qualification Tips:**\n• Credit score 740+ for best rates\n• Debt-to-income ratio under 43%\n• Down payment: 10-20% conventional\n\nWould you like me to connect you with our mortgage specialist?";
    }

    // Default responses for general queries
    const responses = [
      "I understand you're interested in real estate. I can assist with property searches, market analysis, investment advice, financing options, and neighborhood information. What specific area would you like to explore?",
      "That's an interesting question! As your real estate AI assistant, I have access to current market data, property listings, and investment insights. Could you provide more details about what you're looking for?",
      "I'm here to help with all your real estate needs! Whether you're buying, selling, investing, or just researching, I can provide personalized recommendations. What's your main goal right now?",
      "Great question! I specialize in real estate market analysis, property valuations, investment opportunities, and area insights. Let me know what specific information would be most valuable to you.",
      "I can help you navigate the real estate market effectively. From property searches to market trends and investment strategies - what aspect interests you most?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Real Estate Assistant</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </Badge>
                <span className="text-xs text-muted-foreground">Powered by AI</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div className={`max-w-[80%] ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`rounded-lg p-3 text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      {formatMessage(message.text)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          <div className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about properties, market trends, investments..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputText.trim() || isLoading}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              This AI assistant provides real-time market data and personalized recommendations
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};