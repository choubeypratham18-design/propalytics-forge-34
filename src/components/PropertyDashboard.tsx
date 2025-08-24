import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { REIAnalyst } from "./REIAnalyst";
import { FileImport } from "./FileImport";
import { 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Home,
  Calculator,
  Eye,
  Star,
  ExternalLink
} from "lucide-react";

const mockProperties = [
  {
    id: 1,
    address: "2847 Pine Ridge Avenue, Westfield, NJ 07090",
    price: 485000,
    score: 87,
    capRate: 6.2,
    irr: 14.8,
    cashOnCash: 8.4,
    noi: 30090,
    type: "Single Family",
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 2340,
    status: "Hot Deal",
    trend: "up"
  },
  {
    id: 2,
    address: "1523 Oak Valley Drive, Madison, WI 53711",
    price: 342000,
    score: 92,
    capRate: 7.8,
    irr: 16.2,
    cashOnCash: 9.1,
    noi: 26676,
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1890,
    status: "Strong Buy",
    trend: "up"
  },
  {
    id: 3,
    address: "934 Riverside Boulevard, Austin, TX 78704",
    price: 675000,
    score: 78,
    capRate: 5.4,
    irr: 12.3,
    cashOnCash: 6.8,
    noi: 36450,
    type: "Contemporary",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2890,
    status: "Consider",
    trend: "up"
  },
  {
    id: 4,
    address: "456 Harbor Point Condos, Miami, FL 33139",
    price: 825000,
    score: 95,
    capRate: 4.8,
    irr: 18.7,
    cashOnCash: 7.2,
    noi: 39600,
    type: "Luxury Condo",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1650,
    status: "Hot Deal",
    trend: "up"
  },
  {
    id: 5,
    address: "789 Mountain View Lane, Denver, CO 80202",
    price: 520000,
    score: 84,
    capRate: 6.9,
    irr: 15.1,
    cashOnCash: 8.8,
    noi: 35880,
    type: "Modern Ranch",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2150,
    status: "Strong Buy",
    trend: "up"
  },
  {
    id: 6,
    address: "1847 Tech Hub Plaza, Seattle, WA 98109",
    price: 1125000,
    score: 89,
    capRate: 4.2,
    irr: 13.9,
    cashOnCash: 5.6,
    noi: 47250,
    type: "High-Rise Condo",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2680,
    status: "Strong Buy",
    trend: "up"
  }
];

export const PropertyDashboard = () => {
  const [analysisResults, setAnalysisResults] = useState<Record<number, any>>({});
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalysisComplete = (propertyId: number, analysis: any) => {
    setAnalysisResults(prev => ({
      ...prev,
      [propertyId]: analysis
    }));
    
    toast({
      title: "Analysis Complete",
      description: `REI-Analyst recommends: ${analysis.recommendation}`,
    });
  };

  const handleViewDetails = (property: any) => {
    setSelectedProperty(property);
    toast({
      title: "Property Details",
      description: `Viewing details for ${property.address}`,
    });
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Deal Pipeline</h2>
            <p className="text-muted-foreground text-lg">
              AI-ranked investment opportunities updated in real-time
            </p>
          </div>
          <FileImport />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Deals</p>
                  <p className="text-2xl font-bold text-primary">147</p>
                </div>
                <Home className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Score</p>
                  <p className="text-2xl font-bold text-accent">87.5</p>
                </div>
                <Star className="w-8 h-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. IRR</p>
                  <p className="text-2xl font-bold text-primary">15.2%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-accent">$127M</p>
                </div>
                <DollarSign className="w-8 h-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Listings */}
        <div className="space-y-6">
          {mockProperties.map((property) => (
            <Card key={property.id} className="shadow-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                  {/* Property Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-3">
                      <Badge 
                        className={`
                          ${property.status === 'Hot Deal' ? 'bg-destructive/20 text-destructive border-destructive/30' : ''}
                          ${property.status === 'Strong Buy' ? 'bg-success/20 text-success border-success/30' : ''}
                          ${property.status === 'Consider' ? 'bg-warning/20 text-warning border-warning/30' : ''}
                        `}
                      >
                        {property.status}
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{property.score}</div>
                        <div className="text-xs text-muted-foreground">AI Score</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{property.address}</span>
                      </div>
                      <div className="text-2xl font-bold">${property.price.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        {property.bedrooms}bd • {property.bathrooms}ba • {property.sqft.toLocaleString()} sqft
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {property.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Financial Metrics */}
                  <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="text-lg font-bold text-primary">{property.capRate}%</div>
                      <div className="text-xs text-muted-foreground">Cap Rate</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="text-lg font-bold text-accent">{property.irr}%</div>
                      <div className="text-xs text-muted-foreground">IRR</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="text-lg font-bold text-primary">{property.cashOnCash}%</div>
                      <div className="text-xs text-muted-foreground">Cash on Cash</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/30">
                      <div className="text-lg font-bold">${property.noi.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Annual NOI</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 flex flex-col gap-2">
                    <REIAnalyst 
                      property={property} 
                      onAnalysisComplete={(analysis) => handleAnalysisComplete(property.id, analysis)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(property)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {analysisResults[property.id] && (
                      <Badge 
                        className={`text-xs ${
                          analysisResults[property.id].recommendation === "BUY" ? "bg-success/20 text-success border-success/30" :
                          analysisResults[property.id].recommendation === "HOLD" ? "bg-warning/20 text-warning border-warning/30" :
                          "bg-destructive/20 text-destructive border-destructive/30"
                        }`}
                      >
                        AI: {analysisResults[property.id].recommendation}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Score Progress */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Investment Score</span>
                    <span className="text-sm font-medium">{property.score}/100</span>
                  </div>
                  <Progress value={property.score} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Property Details Modal */}
        {selectedProperty && (
          <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Property Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{selectedProperty.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${selectedProperty.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Property Type</p>
                    <p className="font-medium">{selectedProperty.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Score</p>
                    <p className="font-medium">{selectedProperty.score}/100</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{selectedProperty.capRate}%</div>
                    <div className="text-xs text-muted-foreground">Cap Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-accent">{selectedProperty.irr}%</div>
                    <div className="text-xs text-muted-foreground">IRR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{selectedProperty.cashOnCash}%</div>
                    <div className="text-xs text-muted-foreground">Cash-on-Cash</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">${selectedProperty.noi.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Annual NOI</div>
                  </div>
                </div>

                {analysisResults[selectedProperty.id] && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AI Analysis Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge 
                          className={`text-lg px-4 py-2 ${
                            analysisResults[selectedProperty.id].recommendation === "BUY" ? "bg-success/20 text-success border-success/30" :
                            analysisResults[selectedProperty.id].recommendation === "HOLD" ? "bg-warning/20 text-warning border-warning/30" :
                            "bg-destructive/20 text-destructive border-destructive/30"
                          }`}
                        >
                          {analysisResults[selectedProperty.id].recommendation}
                        </Badge>
                        <div>
                          <div className="text-lg font-bold">{analysisResults[selectedProperty.id].confidence}%</div>
                          <div className="text-xs text-muted-foreground">Confidence</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{analysisResults[selectedProperty.id].reasoning}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedProperty(null)}>
                    Close
                  </Button>
                  <Button className="bg-gradient-primary" onClick={() => {
                    toast({
                      title: "Contact Sent",
                      description: "We'll connect you with the listing agent shortly",
                    });
                  }}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact Agent
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};