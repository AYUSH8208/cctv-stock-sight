import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertCount, setAlertCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-card border-b border-dashboard-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search inventory, alerts, reports..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Current Time */}
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleString()}
          </div>

          {/* Alerts */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {alertCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center p-0"
              >
                {alertCount}
              </Badge>
            )}
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Admin</span>
          </Button>
        </div>
      </div>
    </header>
  );
};