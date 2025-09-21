import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Plus,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  location: string;
  lastMovement: Date;
  movementType: 'in' | 'out';
  status: 'normal' | 'low' | 'critical' | 'overstocked';
}

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [inventory] = useState<InventoryItem[]>([
    {
      id: 'ELEC001',
      name: 'Laptop - ThinkPad X1',
      category: 'Electronics',
      currentStock: 45,
      minThreshold: 20,
      maxThreshold: 100,
      location: 'Zone A - Electronics',
      lastMovement: new Date(Date.now() - 120000),
      movementType: 'in',
      status: 'normal'
    },
    {
      id: 'CLTH002',
      name: 'Cotton T-Shirts (Pack)',
      category: 'Clothing',
      currentStock: 8,
      minThreshold: 15,
      maxThreshold: 80,
      location: 'Zone B - Clothing',
      lastMovement: new Date(Date.now() - 300000),
      movementType: 'out',
      status: 'low'
    },
    {
      id: 'BOOK003',
      name: 'Programming Books Set',
      category: 'Books',
      currentStock: 5,
      minThreshold: 10,
      maxThreshold: 50,
      location: 'Zone C - Books',
      lastMovement: new Date(Date.now() - 600000),
      movementType: 'out',
      status: 'critical'
    },
    {
      id: 'HOME004',
      name: 'Garden Tools Kit',
      category: 'Home & Garden',
      currentStock: 95,
      minThreshold: 20,
      maxThreshold: 80,
      location: 'Zone D - Home & Garden',
      lastMovement: new Date(Date.now() - 180000),
      movementType: 'in',
      status: 'overstocked'
    },
    {
      id: 'ELEC005',
      name: 'Wireless Headphones',
      category: 'Electronics',
      currentStock: 67,
      minThreshold: 25,
      maxThreshold: 100,
      location: 'Zone A - Electronics',
      lastMovement: new Date(Date.now() - 240000),
      movementType: 'out',
      status: 'normal'
    }
  ]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(inventory.map(item => item.category))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'low': return 'secondary';
      case 'overstocked': return 'default';
      default: return 'outline';
    }
  };

  const getStatusIcon = (item: InventoryItem) => {
    if (item.status === 'critical' || item.status === 'low') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return item.movementType === 'in' ? 
      <TrendingUp className="w-4 h-4" /> : 
      <TrendingDown className="w-4 h-4" />;
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

  const summary = {
    total: inventory.length,
    normal: inventory.filter(item => item.status === 'normal').length,
    low: inventory.filter(item => item.status === 'low').length,
    critical: inventory.filter(item => item.status === 'critical').length,
    overstocked: inventory.filter(item => item.status === 'overstocked').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your warehouse inventory</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">Normal Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{summary.normal}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{summary.low}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{summary.critical}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">Overstocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{summary.overstocked}</div>
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
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="overstocked">Overstocked</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventory Items ({filteredInventory.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInventory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant={getStatusColor(item.status) as any}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>ID: {item.id}</span>
                        <span>{item.category}</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">{item.currentStock}</div>
                    <div className="text-xs text-muted-foreground">Current</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      {item.minThreshold} - {item.maxThreshold}
                    </div>
                    <div className="text-xs text-muted-foreground">Range</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                      {formatTimestamp(item.lastMovement)}
                    </div>
                    <div className="text-xs text-muted-foreground">Last Movement</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredInventory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No items found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;