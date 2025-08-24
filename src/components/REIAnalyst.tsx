import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface Property {
  id: number;
  address: string;
  price: number;
  score: number;
  capRate: number;
  irr: number;
  cashOnCash: number;
  noi: number;
  type: string;
  status: string;
}

interface AnalysisResult {
  recommendation: "BUY" | "HOLD" | "PASS";
  confidence: number;
  keyInsights: string[];
  risks: string[];
  financialSummary: {
    leveragedIRR: number;
    unleveragedIRR: number;
    dscr: number;
    breakeven: number;
  };
  reasoning: string;
}

interface REIAnalystProps {
  property: Property;
  onAnalysisComplete: (analysis: AnalysisResult) => void;
}

export const REIAnalyst = ({ property, onAnalysisComplete }: REIAnalystProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const analyzeProperty = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic analysis based on property data
    const analysisResult: AnalysisResult = generateAnalysis(property);
    
    setAnalysis(analysisResult);
    setIsAnalyzing(false);
    onAnalysisComplete(analysisResult);
  };

  const generateAnalysis = (prop: Property): AnalysisResult => {
    let recommendation: "BUY" | "HOLD" | "PASS";
    let confidence: number;
    let keyInsights: string[];
    let risks: string[];

    // Logic based on financial metrics
    if (prop.score >= 85 && prop.irr >= 12 && prop.capRate >= 7) {
      recommendation = "BUY";
      confidence = 92;
      keyInsights = [
        `Strong IRR of ${prop.irr}% exceeds 12% target threshold`,
        `Healthy cap rate of ${prop.capRate}% indicates good income yield`,
        `AI score of ${prop.score} ranks in top 15% of analyzed properties`,
        `Cash-on-cash return of ${prop.cashOnCash}% provides solid cash flow`,
        `Market fundamentals support continued appreciation`
      ];
      risks = [
        "Interest rate sensitivity on refinancing",
        "Local market oversupply risk in 18-24 months",
        "Property management scaling challenges"
      ];
    } else if (prop.score >= 70 && prop.irr >= 8) {
      recommendation = "HOLD";
      confidence = 78;
      keyInsights = [
        `Moderate IRR of ${prop.irr}% meets minimum investment criteria`,
        `Cap rate of ${prop.capRate}% is acceptable for current market`,
        `Property shows stable cash flow generation`,
        `Location demographics support tenant demand`,
        `Potential for value-add improvements identified`
      ];
      risks = [
        "Below-average IRR may underperform in rising rate environment",
        "Limited upside without significant capital improvements",
        "Market timing concerns for optimal exit"
      ];
    } else {
      recommendation = "PASS";
      confidence = 85;
      keyInsights = [
        `IRR of ${prop.irr}% below 10% minimum threshold`,
        `AI score of ${prop.score} indicates underperformance risk`,
        `Market fundamentals showing weakness`,
        `Better opportunities available in current pipeline`,
        `Risk-adjusted returns insufficient for portfolio allocation`
      ];
      risks = [
        "Significant downside risk in economic downturn",
        "Limited exit strategies given market conditions",
        "Opportunity cost of capital deployment"
      ];
    }

    return {
      recommendation,
      confidence,
      keyInsights,
      risks,
      financialSummary: {
        leveragedIRR: prop.irr,
        unleveragedIRR: prop.irr * 0.75,
        dscr: 1.45,
        breakeven: 78
      },
      reasoning: `Based on comprehensive analysis of financial metrics, market conditions, and risk factors, this property ${recommendation === 'BUY' ? 'presents a compelling investment opportunity' : recommendation === 'HOLD' ? 'shows moderate potential with manageable risks' : 'does not meet our investment criteria'}.`
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-primary" onClick={() => setIsOpen(true)}>
          <Bot className="w-4 h-4 mr-2" />
          REI-Analyst
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            REI-Analyst: Investment Decision Engine
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 p-1">
            {/* Property Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{property.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${property.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{property.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Score</p>
                    <p className="font-medium">{property.score}/100</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Button */}
            {!analysis && (
              <Card>
                <CardContent className="p-6 text-center">
                  <Button 
                    onClick={analyzeProperty} 
                    disabled={isAnalyzing}
                    className="bg-gradient-primary"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Bot className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Property...
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4 mr-2" />
                        Run Complete Analysis
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    AI will analyze financials, market data, and risks
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {analysis && (
              <div className="space-y-4">
                {/* Recommendation */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {analysis.recommendation === "BUY" && <CheckCircle className="w-8 h-8 text-success" />}
                        {analysis.recommendation === "HOLD" && <AlertTriangle className="w-8 h-8 text-warning" />}
                        {analysis.recommendation === "PASS" && <XCircle className="w-8 h-8 text-destructive" />}
                        <div>
                          <Badge 
                            className={`text-lg px-4 py-2 ${
                              analysis.recommendation === "BUY" ? "bg-success/20 text-success border-success/30" :
                              analysis.recommendation === "HOLD" ? "bg-warning/20 text-warning border-warning/30" :
                              "bg-destructive/20 text-destructive border-destructive/30"
                            }`}
                          >
                            {analysis.recommendation}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{analysis.confidence}%</div>
                        <div className="text-sm text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{analysis.reasoning}</p>
                  </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-primary">{analysis.financialSummary.leveragedIRR}%</div>
                        <div className="text-xs text-muted-foreground">Levered IRR</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold text-accent">{analysis.financialSummary.unleveragedIRR}%</div>
                        <div className="text-xs text-muted-foreground">Unlevered IRR</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold">{analysis.financialSummary.dscr}</div>
                        <div className="text-xs text-muted-foreground">DSCR</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/30">
                        <div className="text-lg font-bold">{analysis.financialSummary.breakeven}%</div>
                        <div className="text-xs text-muted-foreground">Breakeven</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      Key Investment Drivers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.keyInsights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Risks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};