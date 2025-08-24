import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { PropertyFileUpload } from "./PropertyFileUpload";
import { DemoVideo } from "./DemoVideo";

export const Hero = () => {
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            AI-Powered Real Estate Intelligence
          </Badge>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            PropaLytics
            <span className="block text-4xl md:text-5xl text-primary">Forge</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The most sophisticated AI-driven real estate investment platform. 
            Automatically discover, analyze, and rank profitable deals with institutional-grade precision.
          </p>

          {/* Key Value Props */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Predictive Analytics</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-5 h-5 text-accent" />
              <span>Automated Underwriting</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Deal Scoring Engine</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => setShowFileUpload(true)}
            >
              Access Platform
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => setShowDemoVideo(true)}
            >
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.4B+</div>
              <div className="text-sm text-muted-foreground">Deals Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15.2%</div>
              <div className="text-sm text-muted-foreground">Avg. IRR Identified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PropertyFileUpload 
        isOpen={showFileUpload} 
        onClose={() => setShowFileUpload(false)} 
      />
      <DemoVideo 
        isOpen={showDemoVideo} 
        onClose={() => setShowDemoVideo(false)} 
      />
    </section>
  );
};