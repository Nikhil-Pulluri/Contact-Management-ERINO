import React from 'react'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { cn } from '../lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
  className?: string
}

export function StatsCard({ title, value, icon, description, className }: StatsCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)} variant="outlined">
      <CardHeader
        avatar={icon}
        title={
          <Typography variant="subtitle1" color="textSecondary">
            {title}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {value}
        </Typography>
        {description && (
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsCard
