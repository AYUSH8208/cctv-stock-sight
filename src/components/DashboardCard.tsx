import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  subtitle?: string;
  className?: string;
}

export const DashboardCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  subtitle,
  className 
}: DashboardCardProps) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {change && (
          <p className={cn(
            "text-xs mt-1 flex items-center gap-1",
            changeType === "positive" && "text-data-positive",
            changeType === "negative" && "text-data-negative",
            changeType === "neutral" && "text-data-neutral"
          )}>
            {changeType === "positive" && "↑"}
            {changeType === "negative" && "↓"}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};