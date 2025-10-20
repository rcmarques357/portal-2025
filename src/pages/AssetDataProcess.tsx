import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function AssetDataProcess() {
  // Replace this URL with your actual Power BI embed URL
  const powerBIEmbedUrl = "YOUR_POWER_BI_EMBED_URL_HERE";
  
  // Set to true once you have a valid Power BI URL
  const hasValidUrl = false;

  return (
    <PageLayout title="Asset Data Process Dashboard">
      {!hasValidUrl ? (
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            To display your Power BI dashboard, replace the <code className="bg-muted px-1 py-0.5 rounded">powerBIEmbedUrl</code> variable 
            in <code className="bg-muted px-1 py-0.5 rounded">src/pages/AssetDataProcess.tsx</code> with your Power BI embed URL 
            and set <code className="bg-muted px-1 py-0.5 rounded">hasValidUrl</code> to <code className="bg-muted px-1 py-0.5 rounded">true</code>.
          </AlertDescription>
        </Alert>
      ) : null}

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Power BI Dashboard</CardTitle>
          <CardDescription>
            Real-time asset data processing metrics and insights
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {hasValidUrl ? (
            <div className="w-full h-[calc(100vh-250px)] min-h-[600px]">
              <iframe
                title="Asset Data Process Dashboard"
                width="100%"
                height="100%"
                src={powerBIEmbedUrl}
                frameBorder="0"
                allowFullScreen
                className="border-0"
              />
            </div>
          ) : (
            <div className="w-full h-[calc(100vh-250px)] min-h-[600px] flex items-center justify-center bg-muted/30">
              <div className="text-center space-y-4 p-8 max-w-2xl">
                <div className="text-6xl">📊</div>
                <h3 className="text-xl font-semibold">Power BI Dashboard Placeholder</h3>
                <p className="text-muted-foreground">
                  Your Power BI dashboard will appear here once configured.
                </p>
                <div className="bg-card border rounded-lg p-4 text-left text-sm space-y-2">
                  <p className="font-medium">To embed your Power BI dashboard:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Go to your Power BI report</li>
                    <li>Click <strong>File → Embed report → Publish to web</strong></li>
                    <li>Copy the iframe src URL</li>
                    <li>Update the <code className="bg-muted px-1 py-0.5 rounded">powerBIEmbedUrl</code> variable in the code</li>
                    <li>Set <code className="bg-muted px-1 py-0.5 rounded">hasValidUrl</code> to <code className="bg-muted px-1 py-0.5 rounded">true</code></li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
}
