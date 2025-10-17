import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, Shield, GitBranch } from 'lucide-react';

export default function Documentation() {
  const sections = [
    {
      title: 'Business Process Manuals (BPMs)',
      description: 'Comprehensive guides for business processes and workflows',
      icon: FileText,
      items: [
        'Asset Management Process',
        'Data Integration Procedures',
        'Maintenance Workflow Guide',
        'Quality Control Standards'
      ]
    },
    {
      title: 'Governance and Standards',
      description: 'Corporate policies, compliance requirements, and industry standards',
      icon: Shield,
      items: [
        'Data Governance Policy',
        'Security Standards',
        'Regulatory Compliance',
        'Industry Best Practices'
      ]
    },
    {
      title: 'Processes and Procedures',
      description: 'Step-by-step operational procedures and guidelines',
      icon: GitBranch,
      items: [
        'Equipment Inspection Protocol',
        'SAP Integration Process',
        'GIS Data Synchronization',
        'Incident Response Procedure'
      ]
    }
  ];

  return (
    <PageLayout title="Documentation">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Documentation Center
            </CardTitle>
            <CardDescription>
              Access all business process manuals, governance documents, and operational procedures
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Card key={section.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <section.icon className="h-5 w-5 text-primary" />
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
