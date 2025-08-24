import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Image, AlertCircle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  propertyId: string;
  address: string;
  purchasePrice: number;
  estimatedValue: number;
  monthlyRent: number;
  capRate: number;
  irr: number;
  cashOnCash: number;
  recommendation: 'BUY' | 'HOLD' | 'PASS';
  profitLoss: number;
  riskScore: number;
  marketTrend: 'UP' | 'DOWN' | 'STABLE';
  insights: string[];
}

interface PropertyFileUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyFileUpload = ({ isOpen, onClose }: PropertyFileUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload and analysis
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis: AnalysisResult = {
        propertyId: `PROP_${Date.now()}`,
        address: "123 Investment Street, Mumbai, MH",
        purchasePrice: 8500000,
        estimatedValue: 9200000,
        monthlyRent: 45000,
        capRate: 6.35,
        irr: 12.8,
        cashOnCash: 8.2,
        recommendation: 'BUY',
        profitLoss: 700000,
        riskScore: 3.2,
        marketTrend: 'UP',
        insights: [
          "Property located in high-growth area with 15% YoY appreciation",
          "Rental demand strong due to proximity to IT hub",
          "Below market price by ₹7L - excellent acquisition opportunity",
          "Low risk profile with stable cash flow potential",
          "Recommended hold period: 5-7 years for optimal returns"
        ]
      };

      setAnalysisResult(mockAnalysis);
      setIsUploading(false);
      
      toast({
        title: "Analysis Complete",
        description: `Property analysis successful. Recommendation: ${mockAnalysis.recommendation}`,
      });
    }, 2500);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setAnalysisResult(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'BUY': return 'bg-green-500';
      case 'HOLD': return 'bg-yellow-500';
      case 'PASS': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'UP': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'DOWN': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <TrendingUp className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Property File Upload & Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!analysisResult ? (
            <>
              {/* File Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Property Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-medium mb-2">
                          Select property documents to analyze
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Supported formats: PDF, Excel, CSV, Images (JPG, PNG)
                        </p>
                        <Button onClick={handleFileSelect} disabled={isUploading}>
                          {selectedFile ? selectedFile.name : 'Choose Files'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {isUploading && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Analyzing Property Data...</span>
                        <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Supported File Types */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm">PDF Reports</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Excel/CSV</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Image className="w-5 h-5 text-blue-500" />
                  <span className="text-sm">Property Images</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">Legal Docs</span>
                </div>
              </div>
            </>
          ) : (
            /* Analysis Results */
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{analysisResult.address}</h3>
                  <p className="text-muted-foreground">Property ID: {analysisResult.propertyId}</p>
                </div>
                <Badge className={`${getRecommendationColor(analysisResult.recommendation)} text-white`}>
                  {analysisResult.recommendation}
                </Badge>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Purchase Price</span>
                    </div>
                    <p className="text-2xl font-bold">₹{(analysisResult.purchasePrice / 100000).toFixed(1)}L</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Est. Value</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">₹{(analysisResult.estimatedValue / 100000).toFixed(1)}L</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Cap Rate</span>
                    </div>
                    <p className="text-2xl font-bold">{analysisResult.capRate}%</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">IRR</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{analysisResult.irr}%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Profit/Loss Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Projected Profit</p>
                      <p className="text-xl font-bold text-green-600">+₹{(analysisResult.profitLoss / 100000).toFixed(1)}L</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
                      <p className="text-xl font-bold">₹{analysisResult.monthlyRent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Market Trend</p>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(analysisResult.marketTrend)}
                        <span className="font-medium">{analysisResult.marketTrend}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4 justify-end">
                <Button variant="outline" onClick={resetUpload}>
                  Upload Another Property
                </Button>
                <Button onClick={onClose}>
                  Save Analysis
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};