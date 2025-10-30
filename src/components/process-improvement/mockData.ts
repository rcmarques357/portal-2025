import { Initiative } from './types';

export const mockInitiatives: Initiative[] = [
  {
    id: '1',
    processNumber: 'PI-001',
    name: 'Customer to Transformer',
    description: 'Improve the process of mapping customers to their respective transformers for better service management',
    status: 'in progress',
    completenessRate: 65,
    startDate: '2024-01-15',
    completionDate: '2024-06-30',
    tasks: [
      {
        id: 't1',
        name: 'Data Collection',
        description: 'Gather existing customer-transformer mappings',
        status: 'completed',
        deadline: '2024-02-15',
        weight: 20,
        percentCompleted: 100,
      },
      {
        id: 't2',
        name: 'System Integration',
        description: 'Integrate mapping system with GIS',
        status: 'in progress',
        deadline: '2024-04-30',
        weight: 40,
        percentCompleted: 60,
      },
      {
        id: 't3',
        name: 'Testing & Validation',
        description: 'Validate accuracy of mappings',
        status: 'not started',
        deadline: '2024-06-15',
        weight: 40,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '2',
    processNumber: 'PI-002',
    name: 'Conductor Standardization',
    description: 'Standardize conductor types and specifications across the network',
    status: 'in progress',
    completenessRate: 45,
    startDate: '2024-02-01',
    completionDate: '2024-08-31',
    tasks: [
      {
        id: 't4',
        name: 'Inventory Assessment',
        description: 'Catalog all existing conductor types',
        status: 'completed',
        deadline: '2024-03-01',
        weight: 25,
        percentCompleted: 100,
      },
      {
        id: 't5',
        name: 'Standard Development',
        description: 'Define standard conductor specifications',
        status: 'in progress',
        deadline: '2024-05-15',
        weight: 35,
        percentCompleted: 50,
      },
      {
        id: 't6',
        name: 'Implementation Plan',
        description: 'Create rollout plan for standardization',
        status: 'not started',
        deadline: '2024-07-31',
        weight: 40,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '3',
    processNumber: 'PI-003',
    name: 'Tie Points Data Collection',
    description: 'Comprehensive data collection of all network tie points',
    status: 'planned',
    completenessRate: 15,
    startDate: '2024-03-01',
    completionDate: '2024-09-30',
    tasks: [
      {
        id: 't7',
        name: 'Field Survey Planning',
        description: 'Plan field survey routes and schedule',
        status: 'in progress',
        deadline: '2024-04-01',
        weight: 30,
        percentCompleted: 50,
      },
      {
        id: 't8',
        name: 'Data Collection',
        description: 'Execute field surveys',
        status: 'not started',
        deadline: '2024-07-31',
        weight: 50,
        percentCompleted: 0,
      },
      {
        id: 't9',
        name: 'Data Entry & Validation',
        description: 'Enter and validate collected data',
        status: 'not started',
        deadline: '2024-09-15',
        weight: 20,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '4',
    processNumber: 'PI-004',
    name: 'Load Flow Interruption Devices',
    description: 'Optimize placement and operation of load flow interruption devices',
    status: 'in progress',
    completenessRate: 72,
    startDate: '2024-01-10',
    completionDate: '2024-05-31',
    tasks: [
      {
        id: 't10',
        name: 'Network Analysis',
        description: 'Analyze current device placement',
        status: 'completed',
        deadline: '2024-02-28',
        weight: 30,
        percentCompleted: 100,
      },
      {
        id: 't11',
        name: 'Optimization Model',
        description: 'Develop optimization algorithm',
        status: 'completed',
        deadline: '2024-04-15',
        weight: 40,
        percentCompleted: 100,
      },
      {
        id: 't12',
        name: 'Implementation',
        description: 'Deploy optimized configuration',
        status: 'in progress',
        deadline: '2024-05-30',
        weight: 30,
        percentCompleted: 40,
      },
    ],
  },
  {
    id: '5',
    processNumber: 'PI-005',
    name: 'Phase Designation',
    description: 'Standardize phase designation across the distribution network',
    status: 'on hold',
    completenessRate: 30,
    startDate: '2024-02-15',
    completionDate: '2024-10-31',
    tasks: [
      {
        id: 't13',
        name: 'Current State Analysis',
        description: 'Document existing phase designations',
        status: 'completed',
        deadline: '2024-03-31',
        weight: 25,
        percentCompleted: 100,
      },
      {
        id: 't14',
        name: 'Standard Definition',
        description: 'Define phase designation standards',
        status: 'in progress',
        deadline: '2024-06-30',
        weight: 35,
        percentCompleted: 20,
      },
      {
        id: 't15',
        name: 'System Updates',
        description: 'Update systems with new standards',
        status: 'not started',
        deadline: '2024-10-15',
        weight: 40,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '6',
    processNumber: 'PI-006',
    name: 'Phase Orientation',
    description: 'Ensure correct phase orientation throughout the network',
    status: 'in progress',
    completenessRate: 55,
    startDate: '2024-01-20',
    completionDate: '2024-07-31',
    tasks: [
      {
        id: 't16',
        name: 'Orientation Survey',
        description: 'Survey current phase orientations',
        status: 'completed',
        deadline: '2024-03-15',
        weight: 30,
        percentCompleted: 100,
      },
      {
        id: 't17',
        name: 'Correction Plan',
        description: 'Develop correction plan for misaligned phases',
        status: 'in progress',
        deadline: '2024-05-31',
        weight: 40,
        percentCompleted: 65,
      },
      {
        id: 't18',
        name: 'Field Corrections',
        description: 'Execute field corrections',
        status: 'not started',
        deadline: '2024-07-30',
        weight: 30,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '7',
    processNumber: 'PI-007',
    name: 'Asset Tagging System',
    description: 'Implement comprehensive asset tagging system',
    status: 'completed',
    completenessRate: 100,
    startDate: '2023-09-01',
    completionDate: '2024-02-28',
    tasks: [
      {
        id: 't19',
        name: 'Tag Design',
        description: 'Design tag format and specifications',
        status: 'completed',
        deadline: '2023-10-15',
        weight: 20,
        percentCompleted: 100,
      },
      {
        id: 't20',
        name: 'System Development',
        description: 'Develop tracking system',
        status: 'completed',
        deadline: '2023-12-31',
        weight: 40,
        percentCompleted: 100,
      },
      {
        id: 't21',
        name: 'Deployment',
        description: 'Deploy tags across network',
        status: 'completed',
        deadline: '2024-02-28',
        weight: 40,
        percentCompleted: 100,
      },
    ],
  },
  {
    id: '8',
    processNumber: 'PI-008',
    name: 'Meter Data Management',
    description: 'Improve meter data collection and management processes',
    status: 'in progress',
    completenessRate: 40,
    startDate: '2024-02-01',
    completionDate: '2024-08-31',
    tasks: [
      {
        id: 't22',
        name: 'System Requirements',
        description: 'Define MDM system requirements',
        status: 'completed',
        deadline: '2024-03-15',
        weight: 25,
        percentCompleted: 100,
      },
      {
        id: 't23',
        name: 'Vendor Selection',
        description: 'Select MDM system vendor',
        status: 'in progress',
        deadline: '2024-05-31',
        weight: 35,
        percentCompleted: 50,
      },
      {
        id: 't24',
        name: 'Implementation',
        description: 'Implement MDM system',
        status: 'not started',
        deadline: '2024-08-30',
        weight: 40,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '9',
    processNumber: 'PI-009',
    name: 'Outage Management Optimization',
    description: 'Optimize outage detection and response procedures',
    status: 'planned',
    completenessRate: 20,
    startDate: '2024-03-15',
    completionDate: '2024-10-31',
    tasks: [
      {
        id: 't25',
        name: 'Process Review',
        description: 'Review current outage management process',
        status: 'in progress',
        deadline: '2024-04-30',
        weight: 30,
        percentCompleted: 65,
      },
      {
        id: 't26',
        name: 'System Enhancement',
        description: 'Enhance outage management system',
        status: 'not started',
        deadline: '2024-08-31',
        weight: 50,
        percentCompleted: 0,
      },
      {
        id: 't27',
        name: 'Training',
        description: 'Train staff on new procedures',
        status: 'not started',
        deadline: '2024-10-15',
        weight: 20,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '10',
    processNumber: 'PI-010',
    name: 'Vegetation Management',
    description: 'Improve vegetation management along power lines',
    status: 'in progress',
    completenessRate: 58,
    startDate: '2024-01-05',
    completionDate: '2024-12-31',
    tasks: [
      {
        id: 't28',
        name: 'Risk Assessment',
        description: 'Assess vegetation risks along corridors',
        status: 'completed',
        deadline: '2024-03-01',
        weight: 25,
        percentCompleted: 100,
      },
      {
        id: 't29',
        name: 'Trimming Schedule',
        description: 'Develop optimized trimming schedule',
        status: 'in progress',
        deadline: '2024-06-30',
        weight: 35,
        percentCompleted: 70,
      },
      {
        id: 't30',
        name: 'Execution',
        description: 'Execute trimming program',
        status: 'in progress',
        deadline: '2024-12-15',
        weight: 40,
        percentCompleted: 35,
      },
    ],
  },
  {
    id: '11',
    processNumber: 'PI-011',
    name: 'Pole Inspection Program',
    description: 'Systematic pole inspection and maintenance program',
    status: 'in progress',
    completenessRate: 48,
    startDate: '2024-01-15',
    completionDate: '2024-11-30',
    tasks: [
      {
        id: 't31',
        name: 'Inspection Protocol',
        description: 'Develop inspection standards',
        status: 'completed',
        deadline: '2024-02-28',
        weight: 20,
        percentCompleted: 100,
      },
      {
        id: 't32',
        name: 'Field Inspections',
        description: 'Conduct pole inspections',
        status: 'in progress',
        deadline: '2024-09-30',
        weight: 60,
        percentCompleted: 45,
      },
      {
        id: 't33',
        name: 'Remediation',
        description: 'Address identified issues',
        status: 'not started',
        deadline: '2024-11-30',
        weight: 20,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '12',
    processNumber: 'PI-012',
    name: 'Transformer Load Balancing',
    description: 'Balance loads across transformers for optimal performance',
    status: 'planned',
    completenessRate: 10,
    startDate: '2024-04-01',
    completionDate: '2024-12-31',
    tasks: [
      {
        id: 't34',
        name: 'Load Analysis',
        description: 'Analyze current transformer loads',
        status: 'in progress',
        deadline: '2024-05-31',
        weight: 35,
        percentCompleted: 30,
      },
      {
        id: 't35',
        name: 'Balancing Strategy',
        description: 'Develop load balancing strategy',
        status: 'not started',
        deadline: '2024-09-30',
        weight: 40,
        percentCompleted: 0,
      },
      {
        id: 't36',
        name: 'Implementation',
        description: 'Implement load balancing changes',
        status: 'not started',
        deadline: '2024-12-15',
        weight: 25,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '13',
    processNumber: 'PI-013',
    name: 'Emergency Response Planning',
    description: 'Enhance emergency response capabilities',
    status: 'in progress',
    completenessRate: 75,
    startDate: '2023-11-01',
    completionDate: '2024-04-30',
    tasks: [
      {
        id: 't37',
        name: 'Risk Assessment',
        description: 'Identify emergency scenarios',
        status: 'completed',
        deadline: '2024-01-15',
        weight: 25,
        percentCompleted: 100,
      },
      {
        id: 't38',
        name: 'Response Protocols',
        description: 'Develop response protocols',
        status: 'completed',
        deadline: '2024-03-01',
        weight: 40,
        percentCompleted: 100,
      },
      {
        id: 't39',
        name: 'Training & Drills',
        description: 'Conduct staff training',
        status: 'in progress',
        deadline: '2024-04-30',
        weight: 35,
        percentCompleted: 50,
      },
    ],
  },
  {
    id: '14',
    processNumber: 'PI-014',
    name: 'Smart Grid Integration',
    description: 'Integrate smart grid technologies',
    status: 'planned',
    completenessRate: 8,
    startDate: '2024-05-01',
    completionDate: '2025-05-31',
    tasks: [
      {
        id: 't40',
        name: 'Technology Assessment',
        description: 'Evaluate smart grid technologies',
        status: 'in progress',
        deadline: '2024-07-31',
        weight: 30,
        percentCompleted: 25,
      },
      {
        id: 't41',
        name: 'Pilot Program',
        description: 'Deploy pilot smart grid system',
        status: 'not started',
        deadline: '2024-12-31',
        weight: 40,
        percentCompleted: 0,
      },
      {
        id: 't42',
        name: 'Full Deployment',
        description: 'Roll out smart grid network-wide',
        status: 'not started',
        deadline: '2025-05-31',
        weight: 30,
        percentCompleted: 0,
      },
    ],
  },
  {
    id: '15',
    processNumber: 'PI-015',
    name: 'Workforce Scheduling Optimization',
    description: 'Optimize crew scheduling and dispatching',
    status: 'in progress',
    completenessRate: 62,
    startDate: '2024-01-10',
    completionDate: '2024-06-30',
    tasks: [
      {
        id: 't43',
        name: 'Current State Analysis',
        description: 'Analyze current scheduling process',
        status: 'completed',
        deadline: '2024-02-15',
        weight: 25,
        percentCompleted: 100,
      },
      {
        id: 't44',
        name: 'Software Selection',
        description: 'Select scheduling software',
        status: 'completed',
        deadline: '2024-04-01',
        weight: 30,
        percentCompleted: 100,
      },
      {
        id: 't45',
        name: 'Implementation',
        description: 'Implement new scheduling system',
        status: 'in progress',
        deadline: '2024-06-30',
        weight: 45,
        percentCompleted: 40,
      },
    ],
  },
];

/* Django API Integration Example:
 
 * Django Models:
 * 
 * class Initiative(models.Model):
 *     STATUS_CHOICES = [
 *         ('planned', 'Planned'),
 *         ('in progress', 'In Progress'),
 *         ('completed', 'Completed'),
 *         ('on hold', 'On Hold'),
 *     ]
 *     
 *     process_number = models.CharField(max_length=20, unique=True)
 *     name = models.CharField(max_length=200)
 *     description = models.TextField()
 *     status = models.CharField(max_length=20, choices=STATUS_CHOICES)
 *     completeness_rate = models.IntegerField(default=0)
 *     start_date = models.DateField()
 *     completion_date = models.DateField()
 *     created_at = models.DateTimeField(auto_now_add=True)
 *     updated_at = models.DateTimeField(auto_now=True)
 * 
 * class Task(models.Model):
 *     STATUS_CHOICES = [
 *         ('not started', 'Not Started'),
 *         ('in progress', 'In Progress'),
 *         ('completed', 'Completed'),
 *         ('delayed', 'Delayed'),
 *     ]
 *     
 *     initiative = models.ForeignKey(Initiative, related_name='tasks', on_delete=models.CASCADE)
 *     name = models.CharField(max_length=200)
 *     description = models.TextField()
 *     status = models.CharField(max_length=20, choices=STATUS_CHOICES)
 *     deadline = models.DateField()
 *     weight = models.IntegerField()
 *     percent_completed = models.IntegerField(default=0)
 *     created_at = models.DateTimeField(auto_now_add=True)
 *     updated_at = models.DateTimeField(auto_now=True)
 * 
 * Django REST Framework Serializers:
 * 
 * class TaskSerializer(serializers.ModelSerializer):
 *     class Meta:
 *         model = Task
 *         fields = '__all__'
 * 
 * class InitiativeSerializer(serializers.ModelSerializer):
 *     tasks = TaskSerializer(many=True, read_only=True)
 *     
 *     class Meta:
 *         model = Initiative
 *         fields = '__all__'
 * 
 * Django Views/API Endpoints:
 * 
 * GET    /api/initiatives/              - List all initiatives
 * POST   /api/initiatives/              - Create new initiative
 * GET    /api/initiatives/{id}/         - Get initiative details
 * PUT    /api/initiatives/{id}/         - Update initiative
 * DELETE /api/initiatives/{id}/         - Delete initiative
 * 
 * GET    /api/initiatives/{id}/tasks/   - List tasks for initiative
 * POST   /api/initiatives/{id}/tasks/   - Create task
 * PUT    /api/tasks/{id}/               - Update task
 * DELETE /api/tasks/{id}/               - Delete task
 */
