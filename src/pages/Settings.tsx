import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Settings as SettingsIcon, 
  Camera, 
  Bell, 
  Brain, 
  Shield,
  Database,
  Save,
  RotateCcw
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    // Threshold Settings
    lowStockThreshold: 20,
    criticalStockThreshold: 5,
    highStockThreshold: 100,
    
    // AI Model Settings
    modelAccuracyThreshold: 0.8,
    retrainingFrequency: 'weekly',
    predictionHorizon: 30,
    
    // Alert Settings
    enableEmailAlerts: true,
    enablePushNotifications: true,
    alertFrequency: 'immediate',
    
    // Camera Settings
    recordingQuality: '1080p',
    frameRate: 30,
    retentionDays: 30,
    
    // System Settings
    backupFrequency: 'daily',
    logLevel: 'info',
    maintenanceWindow: '02:00'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure your AI inventory management system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Inventory Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Inventory Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label>Low Stock Threshold</Label>
              <div className="mt-2">
                <Slider
                  value={[settings.lowStockThreshold]}
                  onValueChange={([value]) => handleSettingChange('lowStockThreshold', value)}
                  max={50}
                  step={1}
                />
                <div className="text-sm text-muted-foreground mt-1">{settings.lowStockThreshold} units</div>
              </div>
            </div>
            <div>
              <Label>Critical Stock Threshold</Label>
              <div className="mt-2">
                <Slider
                  value={[settings.criticalStockThreshold]}
                  onValueChange={([value]) => handleSettingChange('criticalStockThreshold', value)}
                  max={20}
                  step={1}
                />
                <div className="text-sm text-muted-foreground mt-1">{settings.criticalStockThreshold} units</div>
              </div>
            </div>
            <div>
              <Label>High Stock Threshold</Label>
              <div className="mt-2">
                <Slider
                  value={[settings.highStockThreshold]}
                  onValueChange={([value]) => handleSettingChange('highStockThreshold', value)}
                  max={200}
                  step={5}
                />
                <div className="text-sm text-muted-foreground mt-1">{settings.highStockThreshold} units</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Model Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Retraining Frequency</Label>
              <Select value={settings.retrainingFrequency} onValueChange={(value) => handleSettingChange('retrainingFrequency', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Prediction Horizon (days)</Label>
              <Input 
                type="number" 
                value={settings.predictionHorizon}
                onChange={(e) => handleSettingChange('predictionHorizon', parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Alert Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive alerts via email</p>
            </div>
            <Switch 
              checked={settings.enableEmailAlerts}
              onCheckedChange={(checked) => handleSettingChange('enableEmailAlerts', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Browser push notifications</p>
            </div>
            <Switch 
              checked={settings.enablePushNotifications}
              onCheckedChange={(checked) => handleSettingChange('enablePushNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Camera Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Camera Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label>Recording Quality</Label>
              <Select value={settings.recordingQuality} onValueChange={(value) => handleSettingChange('recordingQuality', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="720p">720p HD</SelectItem>
                  <SelectItem value="1080p">1080p Full HD</SelectItem>
                  <SelectItem value="4k">4K Ultra HD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Frame Rate (FPS)</Label>
              <Input 
                type="number" 
                value={settings.frameRate}
                onChange={(e) => handleSettingChange('frameRate', parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Retention Period (days)</Label>
              <Input 
                type="number" 
                value={settings.retentionDays}
                onChange={(e) => handleSettingChange('retentionDays', parseInt(e.target.value))}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;