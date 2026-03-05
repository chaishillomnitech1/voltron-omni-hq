import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Shield, Award, Users, BookOpen, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

/**
 * ScrollVerse Guardian Dashboard
 * 
 * Displays:
 * - Guardian profile and certification level
 * - Training module progress and completion
 * - Family assignments and protection status
 * - Real-time blockchain verification
 * - Guardian performance metrics
 * - Community benchmark comparisons
 * 
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 */

interface TrainingModule {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
  score?: number;
  estimatedHours: number;
  icon: string;
}

interface FamilyAssignment {
  id: string;
  familyName: string;
  primaryGuardian: boolean;
  assetsSecured: number;
  protectionStatus: 'active' | 'inactive' | 'pending';
  activationDate?: Date;
  emergencyContacts: number;
}

interface CommunityBenchmark {
  avgCertificationLevel: number;
  avgTrainingCompletion: number;
  avgAssetsSecured: number;
  avgFamiliesProtected: number;
  topGuardianScore: number;
  avgDaysActive: number;
}

interface GuardianProfile {
  id: string;
  name: string;
  email: string;
  role: 'primary' | 'secondary' | 'backup';
  certificationLevel: number;
  trainingModules: TrainingModule[];
  familyAssignments: FamilyAssignment[];
  protectionStatus: 'active' | 'inactive' | 'training';
  activationDate?: Date;
  blockchainVerified: boolean;
}

export default function ScrollVerseGuardians() {
  const { user, isAuthenticated } = useAuth();
  const [guardianProfile, setGuardianProfile] = useState<GuardianProfile | null>(null);
  const [benchmarks, setBenchmarks] = useState<CommunityBenchmark | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock guardian data for demonstration
  useEffect(() => {
    const mockGuardian: GuardianProfile = {
      id: 'guardian-001',
      name: user?.name || 'Guardian',
      email: user?.email || 'guardian@scrollverse.io',
      role: 'primary',
      certificationLevel: 75,
      protectionStatus: 'active',
      blockchainVerified: true,
      activationDate: new Date('2026-03-01'),
      trainingModules: [
        {
          id: 'module-1',
          name: 'Family Protection Fundamentals',
          description: 'Learn the core principles of family asset protection',
          completed: true,
          completedAt: new Date('2026-02-15'),
          score: 95,
          estimatedHours: 4,
          icon: '🛡️',
        },
        {
          id: 'module-2',
          name: 'Guardian Responsibilities',
          description: 'Understand your role and responsibilities as a guardian',
          completed: true,
          completedAt: new Date('2026-02-20'),
          score: 88,
          estimatedHours: 3,
          icon: '⚖️',
        },
        {
          id: 'module-3',
          name: 'Blockchain & Smart Contracts',
          description: 'Master blockchain technology and smart contract verification',
          completed: true,
          completedAt: new Date('2026-02-25'),
          score: 92,
          estimatedHours: 6,
          icon: '⛓️',
        },
        {
          id: 'module-4',
          name: 'Emergency Protocols',
          description: 'Learn emergency procedures and crisis management',
          completed: false,
          estimatedHours: 5,
          icon: '🚨',
        },
        {
          id: 'module-5',
          name: 'Advanced Guardian Techniques',
          description: 'Master advanced protection and verification techniques',
          completed: false,
          estimatedHours: 8,
          icon: '🎯',
        },
      ],
      familyAssignments: [
        {
          id: 'family-1',
          familyName: 'Hill Family',
          primaryGuardian: true,
          assetsSecured: 2300000,
          protectionStatus: 'active',
          activationDate: new Date('2026-03-01'),
          emergencyContacts: 3,
        },
        {
          id: 'family-2',
          familyName: 'Omni Legacy',
          primaryGuardian: false,
          assetsSecured: 1500000,
          protectionStatus: 'active',
          activationDate: new Date('2026-02-28'),
          emergencyContacts: 2,
        },
        {
          id: 'family-3',
          familyName: 'Sovereign Trust',
          primaryGuardian: false,
          assetsSecured: 800000,
          protectionStatus: 'pending',
          emergencyContacts: 1,
        },
      ],
    };

    setGuardianProfile(mockGuardian);
    
    // Mock community benchmarks
    const mockBenchmarks: CommunityBenchmark = {
      avgCertificationLevel: 65,
      avgTrainingCompletion: 55,
      avgAssetsSecured: 2800000,
      avgFamiliesProtected: 2.1,
      topGuardianScore: 98,
      avgDaysActive: 28,
    };
    setBenchmarks(mockBenchmarks);
    setLoading(false);
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Guardian Access Required</CardTitle>
            <CardDescription>Please log in to view your guardian dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You must be authenticated to access the guardian dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading || !guardianProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Zap className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  const completedModules = guardianProfile.trainingModules.filter((m) => m.completed).length;
  const totalModules = guardianProfile.trainingModules.length;
  const activeAssignments = guardianProfile.familyAssignments.filter(
    (f) => f.protectionStatus === 'active'
  ).length;
  const totalAssetsSecured = guardianProfile.familyAssignments.reduce(
    (sum, f) => sum + f.assetsSecured,
    0
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">🕋 Guardian Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
          </p>
        </div>

        {/* Community Benchmarks Comparison */}
        {benchmarks && (
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Your Performance vs Community Benchmarks
              </CardTitle>
              <CardDescription>See how you compare to other guardians</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Certification Level */}
                <div className="space-y-3 p-4 bg-card rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">Certification Level</h4>
                    <span className="text-xs text-muted-foreground">
                      {guardianProfile.certificationLevel}% vs {benchmarks.avgCertificationLevel}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Your Score</p>
                      <Progress value={guardianProfile.certificationLevel} className="h-2" />
                      <p className="text-sm font-bold mt-1 text-primary">{guardianProfile.certificationLevel}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Community Avg</p>
                      <Progress value={benchmarks.avgCertificationLevel} className="h-2" />
                      <p className="text-sm font-bold mt-1">{benchmarks.avgCertificationLevel}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">
                    ✅ {guardianProfile.certificationLevel - benchmarks.avgCertificationLevel}% above average
                  </p>
                </div>

                {/* Training Progress */}
                <div className="space-y-3 p-4 bg-card rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">Training Progress</h4>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((completedModules / totalModules) * 100)}% vs {benchmarks.avgTrainingCompletion}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Your Progress</p>
                      <Progress value={(completedModules / totalModules) * 100} className="h-2" />
                      <p className="text-sm font-bold mt-1 text-primary">{Math.round((completedModules / totalModules) * 100)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Community Avg</p>
                      <Progress value={benchmarks.avgTrainingCompletion} className="h-2" />
                      <p className="text-sm font-bold mt-1">{benchmarks.avgTrainingCompletion}%</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">
                    ✅ {Math.round((completedModules / totalModules) * 100) - benchmarks.avgTrainingCompletion}% above average
                  </p>
                </div>

                {/* Assets Secured */}
                <div className="space-y-3 p-4 bg-card rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">Assets Secured</h4>
                    <span className="text-xs text-muted-foreground">
                      ${(totalAssetsSecured / 1000000).toFixed(1)}M vs ${(benchmarks.avgAssetsSecured / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Your Assets</p>
                      <Progress 
                        value={Math.min((totalAssetsSecured / benchmarks.avgAssetsSecured) * 100, 100)} 
                        className="h-2" 
                      />
                      <p className="text-sm font-bold mt-1 text-primary">${(totalAssetsSecured / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Community Avg</p>
                      <Progress value={100} className="h-2" />
                      <p className="text-sm font-bold mt-1">${(benchmarks.avgAssetsSecured / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">
                    ✅ {Math.round((totalAssetsSecured / benchmarks.avgAssetsSecured) * 100)}% of community average
                  </p>
                </div>

                {/* Families Protected */}
                <div className="space-y-3 p-4 bg-card rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm">Families Protected</h4>
                    <span className="text-xs text-muted-foreground">
                      {activeAssignments} vs {benchmarks.avgFamiliesProtected.toFixed(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Your Families</p>
                      <Progress 
                        value={Math.min((activeAssignments / benchmarks.avgFamiliesProtected) * 100, 100)} 
                        className="h-2" 
                      />
                      <p className="text-sm font-bold mt-1 text-primary">{activeAssignments} families</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Community Avg</p>
                      <Progress value={100} className="h-2" />
                      <p className="text-sm font-bold mt-1">{benchmarks.avgFamiliesProtected.toFixed(1)} families</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 font-semibold">
                    ✅ {Math.round((activeAssignments / benchmarks.avgFamiliesProtected) * 100)}% of community average
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guardian Profile Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Certification Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{guardianProfile.certificationLevel}%</div>
              <Progress value={guardianProfile.certificationLevel} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {guardianProfile.role === 'primary' ? 'Primary Guardian' : 'Secondary Guardian'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Training Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {completedModules}/{totalModules}
              </div>
              <Progress value={(completedModules / totalModules) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Modules Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Families
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{activeAssignments}</div>
              <p className="text-xs text-muted-foreground mt-2">
                {guardianProfile.familyAssignments.length} Total Assignments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assets Secured
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                ${(totalAssetsSecured / 1000000).toFixed(1)}M
              </div>
              <p className="text-xs text-muted-foreground mt-2">Total Protected</p>
            </CardContent>
          </Card>
        </div>

        {/* Rest of the dashboard continues as before... */}
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="training">Training Modules</TabsTrigger>
            <TabsTrigger value="families">Family Assignments</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="training" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guardianProfile.trainingModules.map((module) => (
                <Card key={module.id} className={module.completed ? 'border-green-500/50' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          <span>{module.icon}</span>
                          {module.name}
                        </CardTitle>
                        <CardDescription className="text-xs">{module.description}</CardDescription>
                      </div>
                      {module.completed && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {module.completed ? (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Score</span>
                          <span className="font-bold text-green-600">{module.score}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Completed {module.completedAt?.toLocaleDateString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Estimated time: {module.estimatedHours} hours
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="families" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guardianProfile.familyAssignments.map((family) => (
                <Card key={family.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{family.familyName}</CardTitle>
                      <Badge 
                        variant={family.protectionStatus === 'active' ? 'default' : 'secondary'}
                      >
                        {family.protectionStatus.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Assets Secured</span>
                      <span className="font-bold">${(family.assetsSecured / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Role</span>
                      <span>{family.primaryGuardian ? 'Primary' : 'Secondary'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Emergency Contacts</span>
                      <span className="font-bold">{family.emergencyContacts}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Protection Status</CardTitle>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-green-500/20 text-green-600">
                    {guardianProfile.protectionStatus.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    Activated {guardianProfile.activationDate?.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Blockchain Status</CardTitle>
                    <Shield className="w-5 h-5 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-blue-500/20 text-blue-600">
                    {guardianProfile.blockchainVerified ? 'VERIFIED' : 'PENDING'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">On-chain verification complete</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
                    <Award className="w-5 h-5 text-amber-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-amber-500/20 text-amber-600">
                    TOP {Math.round((guardianProfile.certificationLevel / 100) * 100)}%
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">Among all guardians</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
