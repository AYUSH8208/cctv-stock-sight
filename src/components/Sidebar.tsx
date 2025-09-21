import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Bell, 
  TrendingUp, 
  Settings,
  Camera,
  Activity
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Live Tracking", href: "/tracking", icon: Activity },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Camera Feeds", href: "/cameras", icon: Camera },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Predictions", href: "/predictions", icon: TrendingUp },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-primary text-primary-foreground transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-primary-glow/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-accent-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-lg">SmartCount AI</h1>
              <p className="text-xs text-primary-foreground/70">Inventory System</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "hover:bg-primary-glow/20 text-primary-foreground/80 hover:text-primary-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Toggle button */}
      <div className="p-4 border-t border-primary-glow/20">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center py-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        >
          <div className={cn(
            "w-6 h-6 border-2 border-current rounded transition-transform",
            isCollapsed ? "rotate-180" : ""
          )}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};