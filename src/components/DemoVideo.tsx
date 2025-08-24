import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Volume2, Maximize, Clock, Users, TrendingUp } from 'lucide-react';

interface DemoVideoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoVideo = ({ isOpen, onClose }: DemoVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const demoVideos = [
    {
      id: 'property-analysis',
      title: 'AI Property Analysis Demo',
      duration: '4:32',
      thumbnail: '/api/placeholder/400/225',
      description: 'See how our AI analyzes property deals in real-time, providing instant ROI calculations and investment recommendations.',
      features: ['Automated Underwriting', 'Risk Assessment', 'Market Comparison']
    },
    {
      id: 'deal-scoring',
      title: 'Deal Scoring Engine',
      duration: '3:45',
      thumbnail: '/api/placeholder/400/225',
      description: 'Learn how our proprietary algorithm scores and ranks investment opportunities based on multiple criteria.',
      features: ['Multi-factor Scoring', 'Risk vs Return Analysis', 'Market Timing']
    },
    {
      id: 'portfolio-management',
      title: 'Portfolio Dashboard',
      duration: '5:18',
      thumbnail: '/api/placeholder/400/225',
      description: 'Explore comprehensive portfolio management tools with real-time analytics and performance tracking.',
      features: ['Real-time Analytics', 'Performance Tracking', 'Risk Management']
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playDemo = (demoId: string) => {
    setSelectedDemo(demoId);
    setIsPlaying(true);
  };

  const backToList = () => {
    setSelectedDemo(null);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedDemo) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 272) { // 4:32 in seconds
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, selectedDemo]);

  if (selectedDemo) {
    const demo = demoVideos.find(d => d.id === selectedDemo);
    if (!demo) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{demo.title}</span>
              <Button variant="ghost" size="sm" onClick={backToList}>
                ← Back to Demos
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              {/* Simulated Video Player */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-xl font-bold mb-2">{demo.title}</h3>
                  <p className="text-sm opacity-80 mb-4">Property Investment Analysis Demo</p>
                  
                  {/* Simulated Progress */}
                  {isPlaying && (
                    <div className="w-64 mx-auto">
                      <div className="bg-white/20 rounded-full h-1 mb-2">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-1000"
                          style={{ width: `${(currentTime / 272) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs">
                        {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {demo.duration}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <div className="flex items-center gap-4">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1 bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-primary h-1 rounded-full"
                      style={{ width: `${(currentTime / 272) * 100}%` }}
                    />
                  </div>
                  <span className="text-white text-sm">{demo.duration}</span>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Demo Info */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">What you'll learn:</h4>
                <ul className="space-y-1">
                  {demo.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Demo Selection View
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            PropaLytics Demo Videos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">13m</div>
              <div className="text-sm text-muted-foreground">Total Content</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative aspect-video bg-muted">
                  {/* Thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎬</div>
                      <div className="text-xs text-muted-foreground">{video.duration}</div>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      className="bg-primary/90 hover:bg-primary"
                      onClick={() => playDemo(video.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Demo
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{video.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {video.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center p-6 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">
              Join thousands of investors using PropaLytics to make smarter real estate decisions.
            </p>
            <Button onClick={onClose}>
              Start Free Trial
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};