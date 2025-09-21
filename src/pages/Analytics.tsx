import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  Filter,
  Clock,
  Package,
  Activity
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  Tooltip,
  Legend,
  Area,
  AreaChart
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("movements");

  // Mock data for different time ranges
  const movementData = {
    "24h": [
      { time: '00:00', in: 12, out: 8, net: 4 },
      { time: '04:00', in: 8, out: 5, net: 3 },
      { time: '08:00', in: 35, out: 12, net: 23 },
      { time: '12:00', in: 28, out: 22, net: 6 },
      { time: '16:00', in: 42, out: 38, net: 4 },
      { time: '20:00', in: 15, out: 25, net: -10 },
    ],
    "7d": [
      { time: 'Mon', in: 156, out: 89, net: 67 },
      { time: 'Tue', in: 142, out: 95, net: 47 },
      { time: 'Wed', in: 178, out: 123, net: 55 },
      { time: 'Thu', in: 165, out: 134, net: 31 },
      { time: 'Fri', in: 189, out: 156, net: 33 },
      { time: 'Sat', in: 134, out: 98, net: 36 },
      { time: 'Sun', in: 123, out: 87, net: 36 },
    ],
    "30d": [
      { time: 'Week 1', in: 1087, out: 756, net: 331 },
      { time: 'Week 2', in: 1156, out: 834, net: 322 },
      { time: 'Week 3', in: 1234, out: 923, net: 311 },
      { time: 'Week 4', in: 1098, out: 801, net: 297 },
    ]
  };

  const categoryData = [
    { name: 'Electronics', value: 35, count: 1250, color: '#8884d8' },
    { name: 'Clothing', value: 28, count: 980, color: '#82ca9d' },
    { name: 'Books', value: 20, count: 720, color: '#ffc658' },
    { name: 'Home & Garden', value: 17, count: 610, color: '#ff7c7c' },
  ];

  const busyHoursData = [
    { hour: '06:00', activity: 15 },
    { hour: '07:00', activity: 25 },
    { hour: '08:00', activity: 45 },
    { hour: '09:00', activity: 78 },
    { hour: '10:00', activity: 89 },
    { hour: '11:00', activity: 95 },
    { hour: '12:00', activity: 67 },
    { hour: '13:00', activity: 56 },
    { hour: '14:00', activity: 78 },
    { hour: '15:00', activity: 92 },
    { hour: '16:00', activity: 85 },
    { hour: '17:00', activity: 73 },
    { hour: '18:00', activity: 45 },
    { hour: '19:00', activity: 32 },
    { hour: '20:00', activity: 18 },
  ];

  const performanceData = [
    { zone: 'Zone A', accuracy: 95, detections: 1250, uptime: 99.2 },
    { zone: 'Zone B', accuracy: 88, detections: 980, uptime: 97.8 },
    { zone: 'Zone C', accuracy: 92, detections: 720, uptime: 98.5 },
    { zone: 'Zone D', accuracy: 87, detections: 610, uptime: 96.3 },
  ];

  const currentData = movementData[timeRange as keyof typeof movementData];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive inventory movement analysis and insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Movements
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Detection Accuracy
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.2%</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +2.1% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Peak Hour Activity
            </CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11:00 AM</div>
            <p className="text-xs text-muted-foreground mt-1">
              95 movements/hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Uptime
            </CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              Excellent performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Movement Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Inventory Movement Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="in" 
                  stackId="1"
                  stroke="hsl(var(--success))" 
                  fill="hsl(var(--success))"
                  fillOpacity={0.6}
                  name="Items In"
                />
                <Area 
                  type="monotone" 
                  dataKey="out" 
                  stackId="2"
                  stroke="hsl(var(--destructive))" 
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.6}
                  name="Items Out"
                />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Net Change"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Movement by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Busy Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Activity by Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={busyHoursData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="activity" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Zone Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{zone.zone}</h3>
                    <p className="text-sm text-muted-foreground">
                      {zone.detections.toLocaleString()} total detections
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-lg font-bold">{zone.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{zone.uptime}%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-success rounded-full transition-all"
                      style={{ width: `${zone.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="font-medium text-success">Positive Trend</span>
              </div>
              <p className="text-sm">
                Inventory movements increased by 12.5% this week, indicating higher warehouse activity.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-warning" />
                <span className="font-medium text-warning">Peak Hours</span>
              </div>
              <p className="text-sm">
                Highest activity occurs between 9-11 AM and 2-4 PM. Consider optimizing staffing.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="font-medium text-primary">Accuracy Improvement</span>
              </div>
              <p className="text-sm">
                AI detection accuracy improved by 2.1%, reducing false positives and manual verification needs.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-accent" />
                <span className="font-medium text-accent">Category Performance</span>
              </div>
              <p className="text-sm">
                Electronics category shows highest movement volume, representing 35% of all transactions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;