import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Bell, 
  BellOff, 
  Search, 
  Filter, 
  Clock,
  CheckCircle,
  X,
  Camera,
  Package,
  TrendingDown,
  Wifi,
  Settings
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'system';
  title: string;
  description: string;
  source: string;
  timestamp: Date;
  isRead: boolean;
  isResolved: boolean;
  category: 'inventory' | 'system' | 'camera' | 'prediction';
  priority: 'high' | 'medium' | 'low';
  actionRequired: boolean;
}

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'ALT001',
      type: 'critical',
      title: 'Critical Stock Level - Cotton T-Shirts',
      description: 'Stock level dropped below critical threshold (5 units). Predicted stockout in 3 days.',
      source: 'AI Prediction System',
      timestamp: new Date(Date.now() - 300000),
      isRead: false,
      isResolved: false,
      category: 'prediction',
      priority: 'high',
      actionRequired: true
    },
    {
      id: 'ALT002',
      type: 'warning',
      title: 'Camera Feed Disconnected',
      description: 'Camera 3 - Loading Dock has lost connection. Last seen 10 minutes ago.',
      source: 'Camera System',
      timestamp: new Date(Date.now() - 600000),
      isRead: true,
      isResolved: false,
      category: 'camera',
      priority: 'medium',
      actionRequired: true
    },
    {
      id: 'ALT003',
      type: 'warning',
      title: 'Low Stock Alert - Programming Books',
      description: 'Stock level below minimum threshold. Current: 5 units, Minimum: 10 units.',
      source: 'Inventory Monitor',
      timestamp: new Date(Date.now() - 900000),
      isRead: true,
      isResolved: false,
      category: 'inventory',
      priority: 'medium',
      actionRequired: false
    },
    {
      id: 'ALT004',
      type: 'info',
      title: 'Daily Report Generated',
      description: 'Daily inventory movement report has been generated and is ready for review.',
      source: 'Report System',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
      isResolved: false,
      category: 'system',
      priority: 'low',
      actionRequired: false
    },
    {
      id: 'ALT005',
      type: 'system',
      title: 'AI Model Retrained',
      description: 'Prediction model has been successfully retrained with latest data. Accuracy improved to 87.3%.',
      source: 'AI System',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
      isResolved: true,
      category: 'system',
      priority: 'low',
      actionRequired: false
    },
    {
      id: 'ALT006',
      type: 'warning',
      title: 'High Movement Activity Detected',
      description: 'Unusual high movement activity detected in Zone A. 45% above normal levels.',
      source: 'Movement Monitor',
      timestamp: new Date(Date.now() - 1800000),
      isRead: false,
      isResolved: false,
      category: 'inventory',
      priority: 'medium',
      actionRequired: false
    }
  ]);

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAsResolved = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isResolved: true, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (type: string, category: string) => {
    if (category === 'camera') return <Camera className="w-4 h-4" />;
    if (category === 'inventory') return <Package className="w-4 h-4" />;
    if (category === 'prediction') return <TrendingDown className="w-4 h-4" />;
    if (category === 'system') return <Settings className="w-4 h-4" />;
    
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Bell className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'default';
      case 'system': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
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

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'unread' && !alert.isRead) ||
                         (statusFilter === 'resolved' && alert.isResolved) ||
                         (statusFilter === 'unresolved' && !alert.isResolved);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const alertCounts = {
    total: alerts.length,
    unread: alerts.filter(alert => !alert.isRead).length,
    critical: alerts.filter(alert => alert.type === 'critical' && !alert.isResolved).length,
    actionRequired: alerts.filter(alert => alert.actionRequired && !alert.isResolved).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground">Monitor system alerts and manage notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configure
          </Button>
          <Button className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Alerts
            </CardTitle>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertCounts.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread
            </CardTitle>
            <BellOff className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{alertCounts.unread}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Critical
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{alertCounts.critical}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Action Required
            </CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{alertCounts.actionRequired}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Alert Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alert History ({filteredAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts
              .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
              .map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border transition-all ${
                    !alert.isRead ? 'bg-primary/5 border-primary/20' : 'bg-card'
                  } ${alert.isResolved ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        alert.type === 'critical' ? 'bg-destructive text-destructive-foreground' :
                        alert.type === 'warning' ? 'bg-warning text-warning-foreground' :
                        alert.type === 'info' ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {getAlertIcon(alert.type, alert.category)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!alert.isRead ? 'font-semibold' : ''}`}>
                            {alert.title}
                          </h3>
                          <Badge variant={getAlertColor(alert.type) as any} className="text-xs">
                            {alert.type.toUpperCase()}
                          </Badge>
                          {alert.actionRequired && (
                            <Badge variant="outline" className="text-xs">
                              ACTION NEEDED
                            </Badge>
                          )}
                          {alert.isResolved && (
                            <Badge variant="default" className="text-xs">
                              RESOLVED
                            </Badge>
                          )}
                          {!alert.isRead && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Source: {alert.source}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimestamp(alert.timestamp)}
                          </span>
                          <span className={`capitalize ${getPriorityColor(alert.priority)}`}>
                            {alert.priority} priority
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!alert.isRead && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsRead(alert.id)}
                        >
                          Mark Read
                        </Button>
                      )}
                      {!alert.isResolved && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsResolved(alert.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No alerts found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;