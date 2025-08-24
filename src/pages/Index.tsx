import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { PropertyDashboard } from "@/components/PropertyDashboard";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";
import { Header } from "@/components/Header";
import { AIChat } from "@/components/AIChat";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, userProfile, loading } = useAuth();
  const [showChatbot, setShowChatbot] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Redirect to auth if not logged in (with delay to avoid flashing)
  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => {
        setShouldRedirect(true);
        window.location.href = '/auth';
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth redirect message
  if (!user || shouldRedirect) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        userProfile={userProfile} 
        onShowChatbot={() => setShowChatbot(true)} 
      />
      <Hero />
      <PropertyDashboard />
      <AnalyticsPanel />
      
      <AIChat 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)} 
      />
    </div>
  );
};

export default Index;
