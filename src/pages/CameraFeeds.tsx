import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Play, 
  Pause, 
  Settings, 
  Maximize, 
  Volume2, 
  VolumeX,
  RotateCcw,
  Activity,
  AlertTriangle,
  Wifi,
  WifiOff
} from "lucide-react";

interface CameraFeed {
  id: string;
  name: string;
  zone: string;
  status: 'online' | 'offline' | 'error';
  resolution: string;
  fps: number;
  lastActivity: Date;
  detectionCount: number;
  isRecording: boolean;
  hasAudio: boolean;
}

const CameraFeeds = () => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [cameras] = useState<CameraFeed[]>([
    {
      id: 'cam-001',
      name: 'Camera 1 - Main Entrance',
      zone: 'Zone A - Electronics',
      status: 'online',
      resolution: '1920x1080',
      fps: 30,
      lastActivity: new Date(Date.now() - 30000),
      detectionCount: 156,
      isRecording: true,
      hasAudio: true
    },
    {
      id: 'cam-002',
      name: 'Camera 2 - Storage Area',
      zone: 'Zone B - Clothing',
      status: 'online',
      resolution: '1920x1080',
      fps: 25,
      lastActivity: new Date(Date.now() - 120000),
      detectionCount: 89,
      isRecording: true,
      hasAudio: false
    },
    {
      id: 'cam-003',
      name: 'Camera 3 - Loading Dock',
      zone: 'Zone C - Books',
      status: 'error',
      resolution: '1280x720',
      fps: 0,
      lastActivity: new Date(Date.now() - 600000),
      detectionCount: 23,
      isRecording: false,
      hasAudio: true
    },
    {
      id: 'cam-004',
      name: 'Camera 4 - Exit Point',
      zone: 'Zone D - Home & Garden',
      status: 'online',
      resolution: '1920x1080',
      fps: 30,
      lastActivity: new Date(Date.now() - 60000),
      detectionCount: 67,
      isRecording: true,
      hasAudio: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'offline': return 'bg-muted';
      case 'error': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="w-4 h-4" />;
      case 'offline': return <WifiOff className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <WifiOff className="w-4 h-4" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const CameraFeedDisplay = ({ camera }: { camera: CameraFeed }) => (
    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
      {camera.status === 'online' ? (
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
          <div className="text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Live Feed Simulation</p>
            <p className="text-xs text-muted-foreground mt-1">{camera.resolution} @ {camera.fps}fps</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center">
            {getStatusIcon(camera.status)}
            <p className="text-sm text-muted-foreground mt-2">
              {camera.status === 'error' ? 'Connection Error' : 'Offline'}
            </p>
          </div>
        </div>
      )}
      
      {/* Overlay Controls */}
      <div className="absolute top-2 left-2 flex items-center gap-2">
        <Badge variant={camera.status === 'online' ? 'default' : 'destructive'}>
          {camera.status.toUpperCase()}
        </Badge>
        {camera.isRecording && (
          <Badge variant="destructive">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
            REC
          </Badge>
        )}
      </div>
      
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
          {camera.hasAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </Button>
        <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
          <Maximize className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2">
        <div className="bg-black/50 rounded px-2 py-1 text-xs text-white">
          Detections: {camera.detectionCount} | Last: {formatTimestamp(camera.lastActivity)}
        </div>
      </div>
    </div>
  );

  const stats = {
    online: cameras.filter(cam => cam.status === 'online').length,
    offline: cameras.filter(cam => cam.status === 'offline').length,
    error: cameras.filter(cam => cam.status === 'error').length,
    recording: cameras.filter(cam => cam.isRecording).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Camera Feeds</h1>
          <p className="text-muted-foreground">Monitor all CCTV feeds and AI detection systems</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Refresh All
          </Button>
          <Button className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configure
          </Button>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Online Cameras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.online}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recording</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.recording}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Offline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{stats.offline}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.error}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{camera.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{camera.zone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(camera.status)}`}></div>
                  <span className="text-sm text-muted-foreground">{camera.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CameraFeedDisplay camera={camera} />
              
              {/* Camera Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={camera.status !== 'online'}
                  >
                    {camera.isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={camera.status !== 'online'}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {camera.detectionCount} detections
                  </div>
                  <div>FPS: {camera.fps}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detection Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Detection Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { camera: 'Camera 1', detection: 'Person entered zone', time: '2 min ago', confidence: 0.95 },
              { camera: 'Camera 2', detection: 'Package detected', time: '5 min ago', confidence: 0.88 },
              { camera: 'Camera 4', detection: 'Person exited zone', time: '8 min ago', confidence: 0.92 },
              { camera: 'Camera 1', detection: 'Vehicle in loading area', time: '12 min ago', confidence: 0.87 }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <span className="font-medium">{activity.detection}</span>
                    <div className="text-sm text-muted-foreground">
                      {activity.camera} • Confidence: {(activity.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraFeeds;