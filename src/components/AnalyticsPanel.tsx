import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  MapPin,
  Target,
  Calendar,
  PieChart,
  BarChart3
} from "lucide-react";

export const AnalyticsPanel = () => {
  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Intelligence</h2>
          <p className="text-muted-foreground text-lg">
            Real-time market analysis and predictive insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Overview */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Market Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">+12.4%</div>
                  <div className="text-sm text-muted-foreground">YoY Appreciation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">4.2%</div>
                  <div className="text-sm text-muted-foreground">Avg Cap Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">$342K</div>
                  <div className="text-sm text-muted-foreground">Median Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-1">28</div>
                  <div className="text-sm text-muted-foreground">Days on Market</div>
                </div>
              </div>
              
              {/* Placeholder for chart */}
              <div className="h-48 bg-gradient-hero rounded-lg flex items-center justify-center border border-border">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Market Trend Chart</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Markets */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Hot Markets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { city: "Austin, TX", growth: 18.2, score: 94, trend: "up" },
                  { city: "Denver, CO", growth: 15.7, score: 89, trend: "up" },
                  { city: "Nashville, TN", growth: 14.1, score: 86, trend: "up" },
                  { city: "Phoenix, AZ", growth: 11.8, score: 82, trend: "down" },
                  { city: "Tampa, FL", growth: 10.9, score: 79, trend: "up" }
                ].map((market, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {market.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{market.city}</div>
                        <div className="text-sm text-muted-foreground">+{market.growth}% growth</div>
                      </div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {market.score}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Investment Opportunities */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-success" />
                Opportunity Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Distressed Properties", count: 47, percentage: 78 },
                  { type: "Pre-Foreclosure", count: 23, percentage: 45 },
                  { type: "Tax Liens", count: 31, percentage: 62 },
                  { type: "Off-Market Deals", count: 89, percentage: 89 }
                ].map((opportunity, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{opportunity.type}</span>
                      <span className="text-sm text-muted-foreground">{opportunity.count} deals</span>
                    </div>
                    <Progress value={opportunity.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Predictions */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                AI Market Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="text-2xl font-bold text-success mb-2">+8.2%</div>
                  <div className="text-sm text-muted-foreground mb-1">Predicted Growth</div>
                  <div className="text-xs text-success">Next 12 Months</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="text-2xl font-bold text-primary mb-2">$385K</div>
                  <div className="text-sm text-muted-foreground mb-1">Median Price Target</div>
                  <div className="text-xs text-primary">Q4 2024</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="text-2xl font-bold text-accent mb-2">156</div>
                  <div className="text-sm text-muted-foreground mb-1">New Opportunities</div>
                  <div className="text-xs text-accent">This Month</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-muted/20">
                <h4 className="font-semibold mb-2">Key Insights</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Migration patterns favor Sun Belt markets</li>
                  <li>• Interest rate sensitivity creates buying opportunities</li>
                  <li>• Supply constraints support price appreciation</li>
                  <li>• Institutional investor activity increasing 24%</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};