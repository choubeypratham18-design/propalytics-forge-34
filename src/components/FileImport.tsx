import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react";

interface ImportedProperty {
  address: string;
  price: number;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  type: string;
  status: string;
}

export const FileImport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importedProperties, setImportedProperties] = useState<ImportedProperty[]>([]);
  const [importStatus, setImportStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setImportStatus("processing");
    
    // Simulate file processing
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Mock data parsing - in real app this would parse CSV/Excel
    const mockProperties: ImportedProperty[] = [
      {
        address: "789 Main Street, Miami, FL 33101",
        price: 450000,
        sqft: 1800,
        bedrooms: 3,
        bathrooms: 2,
        type: "Single Family",
        status: "New Import"
      },
      {
        address: "321 Beach Avenue, San Diego, CA 92101",
        price: 675000,
        sqft: 2200,
        bedrooms: 4,
        bathrooms: 3,
        type: "Single Family", 
        status: "New Import"
      },
      {
        address: "456 Park Boulevard, Seattle, WA 98101",
        price: 520000,
        sqft: 1650,
        bedrooms: 2,
        bathrooms: 2,
        type: "Condo",
        status: "New Import"
      }
    ];

    setImportedProperties(mockProperties);
    setImportStatus("success");
    setIsProcessing(false);
    
    toast({
      title: "Import Successful",
      description: `Successfully imported ${mockProperties.length} properties`,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const allowedTypes = ['.csv', '.xlsx', '.xls'];
      const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      
      if (!allowedTypes.includes(fileExtension)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV or Excel file",
          variant: "destructive",
        });
        return;
      }

      processFile(file);
    }
  };

  const downloadTemplate = () => {
    // Create a mock CSV template
    const csvContent = `Address,Price,Sqft,Bedrooms,Bathrooms,Type
"123 Main St, City, State 12345",250000,1500,3,2,"Single Family"
"456 Oak Ave, City, State 12345",300000,1800,4,2,"Multi-Family"
"789 Pine Rd, City, State 12345",180000,1200,2,1,"Condo"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'property_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "Property import template has been downloaded",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="w-4 h-4" />
          Import Properties
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Import Property Data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {importStatus === "idle" && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold mb-2">Upload Property Data</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Import properties from CSV or Excel files
                      </p>
                      <div className="space-y-2">
                        <Button onClick={handleFileSelect} className="bg-gradient-primary">
                          <Upload className="w-4 h-4 mr-2" />
                          Select File
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Supported formats: CSV, XLSX, XLS (Max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button variant="outline" onClick={downloadTemplate} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Download a sample CSV template to get started
                </p>
              </div>
            </div>
          )}

          {importStatus === "processing" && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <FileText className="w-12 h-12 mx-auto text-primary animate-pulse" />
                  <div>
                    <h3 className="font-semibold mb-2">Processing File...</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Analyzing and importing property data
                    </p>
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {uploadProgress}% complete
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {importStatus === "success" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    Import Successful
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Successfully imported {importedProperties.length} properties
                  </p>
                  
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {importedProperties.map((property, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{property.address}</p>
                          <p className="text-xs text-muted-foreground">
                            ${property.price.toLocaleString()} • {property.sqft} sqft • {property.bedrooms}bd/{property.bathrooms}ba
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                          {property.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button 
                      onClick={() => {
                        setIsOpen(false);
                        setImportStatus("idle");
                        setImportedProperties([]);
                        setUploadProgress(0);
                      }}
                      className="bg-gradient-primary"
                    >
                      Add to Pipeline
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setImportStatus("idle");
                        setImportedProperties([]);
                        setUploadProgress(0);
                      }}
                    >
                      Import More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};