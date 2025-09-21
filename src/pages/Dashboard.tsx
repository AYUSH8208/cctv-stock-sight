import { useState, useEffect } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Camera, 
  Activity,
  BarChart3,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock WebSocket hook for real-time data
const useWebSocket = (url: string) => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate WebSocket connection
    setIsConnected(true);
    
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setData({
        totalItems: Math.floor(Math.random() * 1000) + 500,
        itemsIn: Math.floor(Math.random() * 50) + 10,
        itemsOut: Math.floor(Math.random() * 30) + 5,
        alerts: Math.floor(Math.random() * 5),
        lastUpdate: new Date().toISOString()
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [url]);

  return { data, isConnected };
};

// Mock data for charts
const movementData = [
  { time: '00:00', in: 12, out: 8 },
  { time: '04:00', in: 8, out: 5 },
  { time: '08:00', in: 35, out: 12 },
  { time: '12:00', in: 28, out: 22 },
  { time: '16:00', in: 42, out: 38 },
  { time: '20:00', in: 15, out: 25 },
];

const categoryData = [
  { name: 'Electronics', count: 150 },
  { name: 'Clothing', count: 230 },
  { name: 'Books', count: 180 },
  { name: 'Home & Garden', count: 120 },
];

const Dashboard = () => {
  const { data: realTimeData, isConnected } = useWebSocket('ws://localhost:8000/ws');
  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Low stock alert: Electronics section', time: '5 min ago' },
    { id: 2, type: 'error', message: 'Camera feed disconnected: Camera 3', time: '12 min ago' },
    { id: 3, type: 'info', message: 'Daily report generated successfully', time: '1 hour ago' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Real-time inventory monitoring and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'}`}></div>
          <span className="text-sm text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Items"
          value={realTimeData?.totalItems || 847}
          change="+2.5% from yesterday"
          changeType="positive"
          icon={<Package className="w-4 h-4" />}
          subtitle="Currently in warehouse"
        />
        <DashboardCard
          title="Items In Today"
          value={realTimeData?.itemsIn || 156}
          change="+12% from yesterday"
          changeType="positive"
          icon={<TrendingUp className="w-4 h-4" />}
          subtitle="Incoming inventory"
        />
        <DashboardCard
          title="Items Out Today"
          value={realTimeData?.itemsOut || 89}
          change="-5% from yesterday"
          changeType="negative"
          icon={<TrendingDown className="w-4 h-4" />}
          subtitle="Outgoing inventory"
        />
        <DashboardCard
          title="Active Alerts"
          value={realTimeData?.alerts || 3}
          change="2 new alerts"
          changeType="neutral"
          icon={<AlertTriangle className="w-4 h-4" />}
          subtitle="Requires attention"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Movement Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Today's Movement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={movementData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="in" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Items In"
                />
                <Line 
                  type="monotone" 
                  dataKey="out" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Items Out"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Inventory by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'error' ? 'bg-destructive' :
                    alert.type === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </p>
                  </div>
                  <Badge variant={
                    alert.type === 'error' ? 'destructive' :
                    alert.type === 'warning' ? 'secondary' : 'default'
                  }>
                    {alert.type}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Camera Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Camera Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((camera) => (
                <div key={camera} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <div>
                      <p className="text-sm font-medium">Camera {camera}</p>
                      <p className="text-xs text-muted-foreground">Zone {camera} - Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-success" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Cameras
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;