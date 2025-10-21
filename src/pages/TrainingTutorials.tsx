import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Play, Clock, Search, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  uploadDate: string;
  instructor: string;
  thumbnail?: string;
  views?: number;
}

const TrainingTutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const videos: Video[] = [
    {
      id: 'VID-001',
      title: 'Asset Data Collection Best Practices',
      description: 'Learn the standardized procedures for collecting and documenting asset data in the field.',
      category: 'Data Management',
      duration: '12:45',
      uploadDate: '2024-01-15',
      instructor: 'Sarah Johnson',
      views: 245
    },
    {
      id: 'VID-002',
      title: 'GIS Integration Overview',
      description: 'Complete walkthrough of the GIS integration process and how to sync spatial data with SAP.',
      category: 'GIS',
      duration: '18:30',
      uploadDate: '2024-01-20',
      instructor: 'Michael Chen',
      views: 189
    },
    {
      id: 'VID-003',
      title: 'Work Order Management Tutorial',
      description: 'Step-by-step guide to creating, managing, and closing work orders in the system.',
      category: 'Operations',
      duration: '15:20',
      uploadDate: '2024-01-25',
      instructor: 'Emily Rodriguez',
      views: 312
    },
    {
      id: 'VID-004',
      title: 'Transformer Maintenance Procedures',
      description: 'Essential safety protocols and maintenance steps for transformer inspections.',
      category: 'Maintenance',
      duration: '22:15',
      uploadDate: '2024-02-01',
      instructor: 'Robert Wilson',
      views: 278
    },
    {
      id: 'VID-005',
      title: 'SAP Data Quality Checks',
      description: 'How to identify and resolve data quality issues between GIS and SAP systems.',
      category: 'Data Quality',
      duration: '16:40',
      uploadDate: '2024-02-05',
      instructor: 'Lisa Anderson',
      views: 156
    },
    {
      id: 'VID-006',
      title: 'Mobile Data Collection App',
      description: 'Using the mobile application for field data collection and real-time updates.',
      category: 'Data Management',
      duration: '10:30',
      uploadDate: '2024-02-08',
      instructor: 'David Kim',
      views: 198
    },
    {
      id: 'VID-007',
      title: 'Asset Inspection Checklist',
      description: 'Complete guide to conducting thorough asset inspections using standardized checklists.',
      category: 'Operations',
      duration: '14:25',
      uploadDate: '2024-02-10',
      instructor: 'Jennifer Martinez',
      views: 223
    },
    {
      id: 'VID-008',
      title: 'Reporting and Analytics Dashboard',
      description: 'Navigate the reporting interface and create custom analytics reports.',
      category: 'Reporting',
      duration: '19:15',
      uploadDate: '2024-02-12',
      instructor: 'Thomas Brown',
      views: 167
    }
  ];

  const categories = ['All', ...Array.from(new Set(videos.map(v => v.category)))];

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout title="Training & Tutorials">
      <div className="space-y-6">
        {/* Header Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Video Library</CardTitle>
                <CardDescription>Training materials and instructional videos for all system processes</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videos.length}</div>
              <p className="text-xs text-muted-foreground">Available resources</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length - 1}</div>
              <p className="text-xs text-muted-foreground">Topic areas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 10m</div>
              <p className="text-xs text-muted-foreground">Of training content</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Recently added</p>
            </CardContent>
          </Card>
        </div>

        {/* Video Grid with Category Tabs */}
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(category === 'All' ? filteredVideos : filteredVideos.filter(v => v.category === category)).map(video => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                      <Play className="h-12 w-12 text-primary relative z-10" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                        <Badge variant="secondary">{video.category}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {video.instructor}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                          <span>{video.views} views</span>
                        </div>
                        <Button className="w-full" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default TrainingTutorials;
