import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/_core/hooks/useAuth';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, Award, Zap, Activity, Target } from 'lucide-react';

/**
 * ScrollVerse Analytics Dashboard
 * 
 * Real-time visualization of:
 * - Quiz completion rates by module
 * - Average scores by difficulty
 * - Guardian advancement trends
 * - Community engagement metrics
 * - Certification milestone progress
 * 
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 */

interface QuizMetrics {
  moduleId: string;
  moduleName: string;
  completionRate: number;
  averageScore: number;
  totalAttempts: number;
  passRate: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface GuardianMetrics {
  level: number;
  guardianCount: number;
  certificationRate: number;
  averageTrainingTime: number;
  advancementTrend: number;
}

interface CommunityMetrics {
  activeUsers: number;
  totalMessages: number;
  engagementScore: number;
  topChannel: string;
  growthRate: number;
}

export default function ScrollVerseAnalytics() {
  const { user, isAuthenticated } = useAuth();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  // Mock quiz metrics data
  const quizMetrics: QuizMetrics[] = [
    {
      moduleId: 'module-1',
      moduleName: 'Family Protection Fundamentals',
      completionRate: 87,
      averageScore: 82,
      totalAttempts: 156,
      passRate: 94,
      difficulty: 'beginner',
    },
    {
      moduleId: 'module-2',
      moduleName: 'Guardian Responsibilities',
      completionRate: 72,
      averageScore: 78,
      totalAttempts: 124,
      passRate: 88,
      difficulty: 'intermediate',
    },
    {
      moduleId: 'module-3',
      moduleName: 'Blockchain & Smart Contracts',
      completionRate: 65,
      averageScore: 75,
      totalAttempts: 98,
      passRate: 82,
      difficulty: 'intermediate',
    },
    {
      moduleId: 'module-4',
      moduleName: 'Emergency Protocols',
      completionRate: 58,
      averageScore: 79,
      totalAttempts: 72,
      passRate: 90,
      difficulty: 'advanced',
    },
  ];

  // Mock guardian advancement data
  const guardianAdvancement: GuardianMetrics[] = [
    {
      level: 1,
      guardianCount: 450,
      certificationRate: 94,
      averageTrainingTime: 12,
      advancementTrend: 15,
    },
    {
      level: 2,
      guardianCount: 280,
      certificationRate: 88,
      averageTrainingTime: 24,
      advancementTrend: 12,
    },
    {
      level: 3,
      guardianCount: 120,
      certificationRate: 82,
      averageTrainingTime: 36,
      advancementTrend: 8,
    },
    {
      level: 4,
      guardianCount: 45,
      certificationRate: 76,
      averageTrainingTime: 48,
      advancementTrend: 3,
    },
  ];

  // Mock community metrics
  const communityMetrics: CommunityMetrics = {
    activeUsers: 2847,
    totalMessages: 14562,
    engagementScore: 8.4,
    topChannel: 'general',
    growthRate: 23,
  };

  // Mock completion trend data
  const completionTrend = [
    { week: 'Week 1', completions: 45, certifications: 38 },
    { week: 'Week 2', completions: 62, certifications: 52 },
    { week: 'Week 3', completions: 58, certifications: 48 },
    { week: 'Week 4', completions: 78, certifications: 65 },
  ];

  // Mock engagement data
  const engagementByChannel = [
    { name: 'general', value: 3200, percentage: 22 },
    { name: 'guardians', value: 2800, percentage: 19 },
    { name: 'families', value: 2400, percentage: 17 },
    { name: 'training', value: 2100, percentage: 14 },
    { name: 'regional', value: 2000, percentage: 14 },
    { name: 'announcements', value: 2062, percentage: 14 },
  ];

  const COLORS = ['#d4af37', '#00d9ff', '#ff1493', '#00ff00', '#ff8c00', '#9370db'];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access analytics</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">📊 ScrollVerse Analytics Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Real-time metrics on quiz completion, guardian advancement, and community engagement
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
          <Button
            variant={timeRange === 'quarter' ? 'default' : 'outline'}
            onClick={() => setTimeRange('quarter')}
          >
            Quarter
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Active Guardians
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">895</div>
              <p className="text-xs text-muted-foreground mt-1">+23% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">203</div>
              <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Avg Quiz Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">79%</div>
              <p className="text-xs text-muted-foreground mt-1">+2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Community Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{communityMetrics.engagementScore}/10</div>
              <p className="text-xs text-muted-foreground mt-1">+0.6 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quiz Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Completion Trend</CardTitle>
            <CardDescription>Weekly quiz completions and certifications earned</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completions"
                  stroke="#d4af37"
                  strokeWidth={2}
                  name="Quiz Completions"
                />
                <Line
                  type="monotone"
                  dataKey="certifications"
                  stroke="#00d9ff"
                  strokeWidth={2}
                  name="Certifications"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quiz Metrics by Module */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Completion Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Module Completion Rates</CardTitle>
              <CardDescription>Percentage of users completing each module</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="moduleName" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completionRate" fill="#d4af37" name="Completion Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Average Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Average Quiz Scores</CardTitle>
              <CardDescription>Average score by module difficulty</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quizMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="moduleName" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="averageScore" fill="#00d9ff" name="Average Score %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Guardian Advancement */}
        <Card>
          <CardHeader>
            <CardTitle>Guardian Advancement Levels</CardTitle>
            <CardDescription>Distribution of guardians across certification levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {guardianAdvancement.map((level) => (
                <div key={level.level} className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Level {level.level}</h3>
                    <Badge className="bg-primary/20 text-primary">{level.certificationRate}%</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guardians:</span>
                      <span className="font-semibold text-foreground">{level.guardianCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Training:</span>
                      <span className="font-semibold text-foreground">{level.averageTrainingTime}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Advancement:</span>
                      <span className="font-semibold text-green-600">+{level.advancementTrend}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Channel Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Message Distribution by Channel</CardTitle>
              <CardDescription>Community engagement across all channels</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={engagementByChannel}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {engagementByChannel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Community Statistics</CardTitle>
              <CardDescription>Current engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold text-foreground">{communityMetrics.activeUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary/50" />
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                    <p className="text-2xl font-bold text-foreground">{communityMetrics.totalMessages}</p>
                  </div>
                  <Activity className="w-8 h-8 text-primary/50" />
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Top Channel</p>
                    <p className="text-2xl font-bold text-foreground capitalize">
                      {communityMetrics.topChannel}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-primary/50" />
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                    <p className="text-2xl font-bold text-green-600">+{communityMetrics.growthRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module Details Table */}
        <Card>
          <CardHeader>
            <CardTitle>Module Performance Details</CardTitle>
            <CardDescription>Detailed metrics for each certification module</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-semibold text-foreground">Module</th>
                    <th className="text-center py-2 px-4 font-semibold text-foreground">Difficulty</th>
                    <th className="text-center py-2 px-4 font-semibold text-foreground">Attempts</th>
                    <th className="text-center py-2 px-4 font-semibold text-foreground">Avg Score</th>
                    <th className="text-center py-2 px-4 font-semibold text-foreground">Pass Rate</th>
                    <th className="text-center py-2 px-4 font-semibold text-foreground">Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {quizMetrics.map((metric) => (
                    <tr key={metric.moduleId} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-foreground">{metric.moduleName}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge
                          className={
                            metric.difficulty === 'beginner'
                              ? 'bg-green-500/20 text-green-600'
                              : metric.difficulty === 'intermediate'
                                ? 'bg-yellow-500/20 text-yellow-600'
                                : 'bg-red-500/20 text-red-600'
                          }
                        >
                          {metric.difficulty}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center text-foreground">{metric.totalAttempts}</td>
                      <td className="py-3 px-4 text-center font-semibold text-foreground">
                        {metric.averageScore}%
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-green-600">
                        {metric.passRate}%
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-foreground">
                        {metric.completionRate}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <div className="flex gap-2 justify-end">
          <Button variant="outline">Download Report</Button>
          <Button className="bg-primary text-primary-foreground">Schedule Email Report</Button>
        </div>
      </div>
    </div>
  );
}
