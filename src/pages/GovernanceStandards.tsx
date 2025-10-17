import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, FileText, Calendar, Tag, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentFile {
  id: string;
  name: string;
  category: string;
  version: string;
  lastUpdated: string;
  size: string;
  description: string;
  tags: string[];
}

export default function GovernanceStandards() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents: DocumentFile[] = [
    {
      id: '1',
      name: 'Data Governance Policy',
      category: 'Policy',
      version: '3.2',
      lastUpdated: '2024-01-15',
      size: '2.4 MB',
      description: 'Comprehensive data governance framework and guidelines',
      tags: ['governance', 'data', 'compliance']
    },
    {
      id: '2',
      name: 'Security Standards Manual',
      category: 'Security',
      version: '2.1',
      lastUpdated: '2024-01-10',
      size: '1.8 MB',
      description: 'Information security standards and implementation guidelines',
      tags: ['security', 'standards', 'cybersecurity']
    },
    {
      id: '3',
      name: 'Regulatory Compliance Guide',
      category: 'Compliance',
      version: '4.0',
      lastUpdated: '2023-12-20',
      size: '3.1 MB',
      description: 'Industry regulations and compliance requirements',
      tags: ['compliance', 'regulatory', 'legal']
    },
    {
      id: '4',
      name: 'Quality Management Standards',
      category: 'Quality',
      version: '1.5',
      lastUpdated: '2023-12-15',
      size: '1.2 MB',
      description: 'Quality assurance and control standards',
      tags: ['quality', 'standards', 'QA']
    },
    {
      id: '5',
      name: 'Asset Management Governance',
      category: 'Policy',
      version: '2.3',
      lastUpdated: '2023-11-30',
      size: '2.0 MB',
      description: 'Governance framework for asset lifecycle management',
      tags: ['assets', 'governance', 'lifecycle']
    },
    {
      id: '6',
      name: 'Risk Management Framework',
      category: 'Risk',
      version: '3.0',
      lastUpdated: '2023-11-25',
      size: '2.8 MB',
      description: 'Enterprise risk identification and mitigation strategies',
      tags: ['risk', 'management', 'framework']
    }
  ];

  const categories = ['all', 'Policy', 'Security', 'Compliance', 'Quality', 'Risk'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (document: DocumentFile) => {
    toast({
      title: 'Download Started',
      description: `Downloading ${document.name}...`,
    });
  };

  return (
    <PageLayout title="Governance and Standards">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Repository</CardTitle>
            <CardDescription>
              Access governance policies, security standards, and compliance documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents, tags, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredDocuments.length} of {documents.length} documents
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{document.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {document.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{document.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Updated: {new Date(document.lastUpdated).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span>Version {document.version}</span>
                          </div>
                          <div>
                            <span>{document.size}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          {document.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDownload(document)}
                    size="sm"
                    className="shrink-0"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No documents found matching your search criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
