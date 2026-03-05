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

        {/* Status Indicators */}
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
                <CardTitle className="text-sm font-medium">Next Training</CardTitle>
                <BookOpen className="w-5 h-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-sm">Emergency Protocols</p>
              <p className="text-xs text-muted-foreground mt-2">5 hours estimated</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Training and Assignments */}
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="training">Training Modules</TabsTrigger>
            <TabsTrigger value="families">Family Assignments</TabsTrigger>
          </TabsList>

          {/* Training Modules Tab */}
          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guardian Training Program</CardTitle>
                <CardDescription>
                  Complete all modules to achieve maximum certification level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {guardianProfile.trainingModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="text-2xl">{module.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{module.name}</h3>
                        {module.completed ? (
                          <Badge className="bg-green-500/20 text-green-600">Completed</Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {module.estimatedHours} hours
                        </span>
                        {module.completed && module.score && (
                          <span className="text-sm font-medium text-primary">Score: {module.score}%</span>
                        )}
                      </div>
                      {module.completed && module.completedAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Completed on {module.completedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Family Assignments Tab */}
          <TabsContent value="families" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Family Assignments</CardTitle>
                <CardDescription>
                  Families you are protecting and their protection status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {guardianProfile.familyAssignments.map((family) => (
                  <div
                    key={family.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">{family.familyName}</h3>
                        <div className="flex items-center space-x-2">
                          {family.primaryGuardian && (
                            <Badge className="bg-amber-500/20 text-amber-600">Primary</Badge>
                          )}
                          <Badge
                            className={
                              family.protectionStatus === 'active'
                                ? 'bg-green-500/20 text-green-600'
                                : family.protectionStatus === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-600'
                                  : 'bg-gray-500/20 text-gray-600'
                            }
                          >
                            {family.protectionStatus.toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Assets Secured</p>
                          <p className="font-semibold text-foreground">
                            ${(family.assetsSecured / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Emergency Contacts</p>
                          <p className="font-semibold text-foreground">{family.emergencyContacts}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Activation Date</p>
                          <p className="font-semibold text-foreground">
                            {family.activationDate?.toLocaleDateString() || 'Pending'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Continue Your Guardian Journey</CardTitle>
            <CardDescription>
              Complete your training and expand your family protection network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button className="bg-primary text-primary-foreground">
                Start Next Module
              </Button>
              <Button variant="outline">
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
