import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  ArrowUp, 
  ArrowDown, 
  Package, 
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  Play,
  Pause
} from "lucide-react";

interface TrackingEvent {
  id: string;
  type: 'entry' | 'exit';
  item: string;
  camera: string;
  zone: string;
  timestamp: Date;
  confidence: number;
}

const LiveTracking = () => {
  const [isTracking, setIsTracking] = useState(true);
  const [events, setEvents] = useState<TrackingEvent[]>([
    {
      id: '1',
      type: 'entry',
      item: 'Electronics Box #A001',
      camera: 'Camera 1',
      zone: 'Zone A - Electronics',
      timestamp: new Date(Date.now() - 30000),
      confidence: 0.95
    },
    {
      id: '2',
      type: 'exit',
      item: 'Clothing Package #B023',
      camera: 'Camera 2',
      zone: 'Zone B - Clothing',
      timestamp: new Date(Date.now() - 120000),
      confidence: 0.88
    },
    {
      id: '3',
      type: 'entry',
      item: 'Books Shipment #C015',
      camera: 'Camera 3',
      zone: 'Zone C - Books',
      timestamp: new Date(Date.now() - 180000),
      confidence: 0.92
    }
  ]);

  const [stats, setStats] = useState({
    totalToday: 234,
    entriesCount: 156,
    exitsCount: 78,
    netChange: 78
  });

  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      // Simulate new tracking events
      if (Math.random() > 0.7) {
        const newEvent: TrackingEvent = {
          id: Date.now().toString(),
          type: Math.random() > 0.6 ? 'entry' : 'exit',
          item: `Item #${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          camera: `Camera ${Math.floor(Math.random() * 4) + 1}`,
          zone: `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
          timestamp: new Date(),
          confidence: 0.8 + Math.random() * 0.2
        };

        setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
        
        setStats(prev => ({
          ...prev,
          totalToday: prev.totalToday + 1,
          entriesCount: newEvent.type === 'entry' ? prev.entriesCount + 1 : prev.entriesCount,
          exitsCount: newEvent.type === 'exit' ? prev.exitsCount + 1 : prev.exitsCount,
          netChange: newEvent.type === 'entry' ? prev.netChange + 1 : prev.netChange - 1
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return timestamp.toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Tracking</h1>
          <p className="text-muted-foreground">Real-time inventory movement monitoring</p>
        </div>
        <Button
          onClick={() => setIsTracking(!isTracking)}
          variant={isTracking ? "destructive" : "default"}
          className="flex items-center gap-2"
        >
          {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </Button>
      </div>

      {/* Status Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
              <span className="font-medium">
                {isTracking ? 'Live Tracking Active' : 'Tracking Paused'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Last update: {formatTimestamp(events[0]?.timestamp || new Date())}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Events Today
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Items Entered
            </CardTitle>
            <ArrowUp className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.entriesCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Items Exited
            </CardTitle>
            <ArrowDown className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.exitsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Change
            </CardTitle>
            {stats.netChange >= 0 ? 
              <TrendingUp className="w-4 h-4 text-success" /> : 
              <TrendingDown className="w-4 h-4 text-destructive" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.netChange >= 0 ? 'text-success' : 'text-destructive'}`}>
              {stats.netChange >= 0 ? '+' : ''}{stats.netChange}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Events Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Events Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.type === 'entry' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
                  }`}>
                    {event.type === 'entry' ? 
                      <ArrowUp className="w-4 h-4" /> : 
                      <ArrowDown className="w-4 h-4" />
                    }
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={event.type === 'entry' ? 'default' : 'secondary'}>
                        {event.type.toUpperCase()}
                      </Badge>
                      <span className="font-medium">{event.item}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.zone}
                      </div>
                      <div>Camera: {event.camera}</div>
                      <div>Confidence: {(event.confidence * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimestamp(event.timestamp)}
                </div>
              </div>
            ))}
          </div>
          
          {events.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No recent tracking events</p>
              <p className="text-sm">Start tracking to see real-time inventory movements</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTracking;