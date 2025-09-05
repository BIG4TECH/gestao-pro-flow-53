import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className,
  variant = 'default'
}: StatCardProps) {
  const variantStyles = {
    default: 'border-border',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    destructive: 'border-destructive/30 bg-destructive/5',
  };

  const trendColor = trend && trend.value > 0 ? 'text-success' : trend && trend.value < 0 ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card className={cn(
      'shadow-soft hover:shadow-medium transition-shadow duration-200',
      variantStyles[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold text-foreground">
                {value}
              </h3>
              {trend && (
                <span className={cn('text-xs font-medium', trendColor)}>
                  {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          
          {Icon && (
            <div className="flex-shrink-0">
              <div className={cn(
                'w-12 h-12 rounded-lg flex items-center justify-center',
                variant === 'success' && 'bg-success/10 text-success',
                variant === 'warning' && 'bg-warning/10 text-warning',
                variant === 'destructive' && 'bg-destructive/10 text-destructive',
                variant === 'default' && 'bg-primary/10 text-primary'
              )}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}