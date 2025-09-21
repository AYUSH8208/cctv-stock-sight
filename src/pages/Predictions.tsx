import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Calendar, 
  Brain,
  Target,
  Clock,
  Package,
  BarChart3,
  Zap
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip, Legend } from 'recharts';

interface Prediction {
  id: string;
  item: string;
  category: string;
  currentStock: number;
  predictedStockOut: Date;
  daysUntilStockOut: number;
  confidence: number;
  trendDirection: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction: string;
}

const Predictions = () => {
  const [timeHorizon, setTimeHorizon] = useState("30d");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [predictions] = useState<Prediction[]>([
    {
      id: 'PRED001',
      item: 'Laptop - ThinkPad X1',
      category: 'Electronics',
      currentStock: 45,
      predictedStockOut: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      daysUntilStockOut: 12,
      confidence: 0.89,
      trendDirection: 'down',
      riskLevel: 'medium',
      recommendedAction: 'Order 30-40 units within next week'
    },
    {
      id: 'PRED002',
      item: 'Cotton T-Shirts (Pack)',
      category: 'Clothing',
      currentStock: 8,
      predictedStockOut: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      daysUntilStockOut: 3,
      confidence: 0.95,
      trendDirection: 'down',
      riskLevel: 'critical',
      recommendedAction: 'URGENT: Order immediately - high demand expected'
    },
    {
      id: 'PRED003',
      item: 'Programming Books Set',
      category: 'Books',
      currentStock: 5,
      predictedStockOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      daysUntilStockOut: 7,
      confidence: 0.78,
      trendDirection: 'down',
      riskLevel: 'high',
      recommendedAction: 'Order 25-30 units this week'
    },
    {
      id: 'PRED004',
      item: 'Wireless Headphones',
      category: 'Electronics',
      currentStock: 67,
      predictedStockOut: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      daysUntilStockOut: 45,
      confidence: 0.72,
      trendDirection: 'stable',
      riskLevel: 'low',
      recommendedAction: 'Monitor trends, order in 3-4 weeks'
    }
  ]);

  // Mock forecast data
  const forecastData = [
    { date: 'Today', actual: 847, predicted: 847, lower: 847, upper: 847 },
    { date: '+3d', actual: null, predicted: 823, lower: 815, upper: 831 },
    { date: '+7d', actual: null, predicted: 798, lower: 785, upper: 811 },
    { date: '+14d', actual: null, predicted: 756, lower: 735, upper: 777 },
    { date: '+21d', actual: null, predicted: 718, lower: 690, upper: 746 },
    { date: '+30d', actual: null, predicted: 685, lower: 650, upper: 720 },
  ];

  const demandForecast = [
    { category: 'Electronics', currentWeek: 156, nextWeek: 142, growth: -8.9 },
    { category: 'Clothing', currentWeek: 89, nextWeek: 125, growth: 40.4 },
    { category: 'Books', currentWeek: 67, nextWeek: 71, growth: 6.0 },
    { category: 'Home & Garden', currentWeek: 45, nextWeek: 52, growth: 15.6 },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'default';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <TrendingDown className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <TrendingUp className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredPredictions = predictions.filter(pred => 
    categoryFilter === 'all' || pred.category === categoryFilter
  );

  const categories = [...new Set(predictions.map(p => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Predictive Analytics</h1>
          <p className="text-muted-foreground">AI-powered inventory forecasting and demand prediction</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeHorizon} onValueChange={setTimeHorizon}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Retrain Model
          </Button>
        </div>
      </div>

      {/* AI Model Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">AI Prediction Model</h3>
                <p className="text-sm text-muted-foreground">
                  Last trained: 2 hours ago • Model accuracy: 87.3%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Critical Alerts
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {predictions.filter(p => p.riskLevel === 'critical').length}
            </div>
            <p className="text-xs text-muted-foreground">Items need immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Model Accuracy
            </CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +3.2% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Stockout Warning
            </CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.8</div>
            <p className="text-xs text-muted-foreground">days in advance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Predictions Generated
            </CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Inventory Level Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Actual Stock"
                connectNulls={false}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted Stock"
              />
              <Line 
                type="monotone" 
                dataKey="upper" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={1}
                strokeDasharray="2 2"
                name="Upper Bound"
              />
              <Line 
                type="monotone" 
                dataKey="lower" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={1}
                strokeDasharray="2 2"
                name="Lower Bound"
              />
              <ReferenceLine y={0} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Demand Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Weekly Demand Forecast by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demandForecast.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.category}</h3>
                    <p className="text-sm text-muted-foreground">Category forecast</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-lg font-bold">{item.currentWeek}</div>
                    <div className="text-xs text-muted-foreground">This Week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{item.nextWeek}</div>
                    <div className="text-xs text-muted-foreground">Next Week</div>
                  </div>
                  <div className={`text-center ${item.growth >= 0 ? 'text-success' : 'text-destructive'}`}>
                    <div className="text-lg font-bold flex items-center gap-1">
                      {item.growth >= 0 ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                      {Math.abs(item.growth).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Change</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stock-out Predictions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Stock-out Predictions
            </CardTitle>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPredictions
              .sort((a, b) => a.daysUntilStockOut - b.daysUntilStockOut)
              .map((prediction) => (
                <div key={prediction.id} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        prediction.riskLevel === 'critical' ? 'bg-destructive text-destructive-foreground' :
                        prediction.riskLevel === 'high' ? 'bg-warning text-warning-foreground' :
                        prediction.riskLevel === 'medium' ? 'bg-primary text-primary-foreground' :
                        'bg-success text-success-foreground'
                      }`}>
                        {getRiskIcon(prediction.riskLevel)}
                      </div>
                      <div>
                        <h3 className="font-medium">{prediction.item}</h3>
                        <p className="text-sm text-muted-foreground">{prediction.category}</p>
                      </div>
                    </div>
                    <Badge variant={getRiskColor(prediction.riskLevel) as any}>
                      {prediction.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <div className="text-lg font-bold">{prediction.currentStock}</div>
                      <div className="text-xs text-muted-foreground">Current Stock</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-destructive">{prediction.daysUntilStockOut}</div>
                      <div className="text-xs text-muted-foreground">Days Until Stock-out</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{(prediction.confidence * 100).toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {prediction.predictedStockOut.toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Predicted Date</div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-1">Recommended Action:</p>
                    <p className="text-sm text-muted-foreground">{prediction.recommendedAction}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Predictions;