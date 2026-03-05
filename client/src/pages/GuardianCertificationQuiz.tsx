import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/_core/hooks/useAuth';
import { CheckCircle2, XCircle, Award, Zap, BookOpen, TrendingUp } from 'lucide-react';

/**
 * Guardian Certification Quiz System
 * 
 * Interactive quizzes for guardian training modules with:
 * - Multiple choice questions
 * - Real-time scoring
 * - Immediate feedback
 * - Certification milestone tracking
 * - Progress persistence
 * 
 * Where Love Becomes Law. Legacy Becomes Infinity. 44:Omni × ∞
 */

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  passingScore: number;
  questions: QuizQuestion[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface QuizResult {
  moduleId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  completedAt: Date;
  timeSpent: number;
}

interface CertificationMilestone {
  id: string;
  name: string;
  description: string;
  requiredModules: string[];
  completed: boolean;
  completedAt?: Date;
  reward: string;
}

export default function GuardianCertificationQuiz() {
  const { user, isAuthenticated } = useAuth();
  const [selectedModule, setSelectedModule] = useState<QuizModule | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userProgress, setUserProgress] = useState<QuizResult[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Mock quiz modules
  const quizModules: QuizModule[] = [
    {
      id: 'module-1',
      name: 'Family Protection Fundamentals',
      description: 'Learn the core principles of family asset protection and legacy planning',
      icon: '🛡️',
      passingScore: 70,
      difficulty: 'beginner',
      estimatedTime: 15,
      questions: [
        {
          id: 'q1',
          question: 'What is the primary purpose of family asset protection?',
          options: [
            'To maximize personal wealth',
            'To ensure family legacy and security across generations',
            'To avoid paying taxes',
            'To control family members',
          ],
          correctAnswer: 1,
          explanation:
            'Family asset protection ensures that your legacy and financial security are preserved for future generations.',
          difficulty: 'easy',
        },
        {
          id: 'q2',
          question: 'Which of the following is a key component of ScrollVerse protection?',
          options: [
            'Bank account monitoring',
            'Multi-signature smart contracts',
            'Social media management',
            'Stock trading',
          ],
          correctAnswer: 1,
          explanation:
            'Multi-signature smart contracts provide cryptographic security for family assets on the blockchain.',
          difficulty: 'medium',
        },
        {
          id: 'q3',
          question: 'What role do guardians play in ScrollVerse?',
          options: [
            'They manage social media accounts',
            'They oversee family protection, training, and emergency protocols',
            'They control all family finances',
            'They make all family decisions',
          ],
          correctAnswer: 1,
          explanation:
            'Guardians are trained professionals who oversee family protection mechanisms and ensure protocols are followed.',
          difficulty: 'medium',
        },
        {
          id: 'q4',
          question: 'How often should guardians review family protection status?',
          options: ['Annually', 'Monthly', 'Weekly', 'Daily'],
          correctAnswer: 1,
          explanation:
            'Regular monthly reviews ensure that protection mechanisms remain active and effective.',
          difficulty: 'easy',
        },
        {
          id: 'q5',
          question: 'What is the 44:Omni frequency in ScrollVerse?',
          options: [
            'A radio station frequency',
            'A sacred constant governing all systems and protection mechanisms',
            'A computer processing speed',
            'A cryptocurrency exchange rate',
          ],
          correctAnswer: 1,
          explanation:
            '44:Omni × ∞ represents the universal constant that aligns all ScrollVerse systems with divine purpose.',
          difficulty: 'hard',
        },
      ],
    },
    {
      id: 'module-2',
      name: 'Guardian Responsibilities',
      description: 'Understand your role and responsibilities as a guardian',
      icon: '⚖️',
      passingScore: 75,
      difficulty: 'intermediate',
      estimatedTime: 20,
      questions: [
        {
          id: 'q1',
          question: 'What is your primary responsibility as a guardian?',
          options: [
            'To earn money from the role',
            'To protect family assets and ensure protocols are followed',
            'To make all family decisions',
            'To manage social media',
          ],
          correctAnswer: 1,
          explanation:
            'Guardians are entrusted with protecting family assets and ensuring all protection protocols are properly implemented.',
          difficulty: 'easy',
        },
        {
          id: 'q2',
          question: 'How should guardians handle emergency situations?',
          options: [
            'Ignore them',
            'Follow emergency protocols and activate backup systems',
            'Make decisions without consulting others',
            'Post about them on social media',
          ],
          correctAnswer: 1,
          explanation:
            'Emergency protocols are designed to be followed precisely to ensure family safety and asset protection.',
          difficulty: 'medium',
        },
        {
          id: 'q3',
          question: 'What is the importance of multi-signature approval?',
          options: [
            'It makes transactions slower',
            'It provides additional security by requiring multiple guardians to approve critical actions',
            'It is just a formality',
            'It has no real purpose',
          ],
          correctAnswer: 1,
          explanation:
            'Multi-signature requirements ensure that no single person can compromise family assets without oversight.',
          difficulty: 'hard',
        },
      ],
    },
  ];

  // Mock certification milestones
  const milestones: CertificationMilestone[] = [
    {
      id: 'milestone-1',
      name: 'Certified Guardian - Level 1',
      description: 'Complete Family Protection Fundamentals',
      requiredModules: ['module-1'],
      completed: false,
      reward: '🏆 Level 1 Badge + Certificate',
    },
    {
      id: 'milestone-2',
      name: 'Certified Guardian - Level 2',
      description: 'Complete Guardian Responsibilities',
      requiredModules: ['module-1', 'module-2'],
      completed: false,
      reward: '🏆 Level 2 Badge + Advanced Access',
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to access certification quizzes</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleStartQuiz = (module: QuizModule) => {
    setSelectedModule(module);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setStartTime(new Date());
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedModule && currentQuestion < selectedModule.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!selectedModule || !startTime) return;

    let correctCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === selectedModule.questions[index].correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / selectedModule.questions.length) * 100);
    const timeSpent = Math.round((new Date().getTime() - startTime.getTime()) / 1000 / 60);
    const passed = score >= selectedModule.passingScore;

    const result: QuizResult = {
      moduleId: selectedModule.id,
      score,
      totalQuestions: selectedModule.questions.length,
      passed,
      completedAt: new Date(),
      timeSpent,
    };

    setQuizResult(result);
    setUserProgress([...userProgress, result]);
    setQuizCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuizResult(null);
    setSelectedModule(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  };

  // Quiz In Progress View
  if (quizStarted && !quizCompleted && selectedModule) {
    const question = selectedModule.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedModule.questions.length) * 100;

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {selectedModule.icon} {selectedModule.name}
            </h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {selectedModule.questions.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}% Complete</p>
          </div>

          {/* Question Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{question.question}</CardTitle>
                <Badge
                  className={
                    question.difficulty === 'easy'
                      ? 'bg-green-500/20 text-green-600'
                      : question.difficulty === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-600'
                        : 'bg-red-500/20 text-red-600'
                  }
                >
                  {question.difficulty.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Answer Options */}
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border'
                        }`}
                      >
                        {selectedAnswers[currentQuestion] === index && '✓'}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="flex-1"
            >
              Previous
            </Button>
            {currentQuestion === selectedModule.questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={selectedAnswers.length !== selectedModule.questions.length}
                className="flex-1 bg-primary text-primary-foreground"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} className="flex-1 bg-primary text-primary-foreground">
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Quiz Results View
  if (quizCompleted && quizResult && selectedModule) {
    const passed = quizResult.passed;

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Results Header */}
          <div className="text-center space-y-4">
            {passed ? (
              <>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h1 className="text-4xl font-bold text-green-600">Quiz Passed! 🎉</h1>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                <h1 className="text-4xl font-bold text-red-600">Quiz Not Passed</h1>
              </>
            )}
          </div>

          {/* Score Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{quizResult.score}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{quizResult.timeSpent}m</p>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {Math.round((quizResult.score / 100) * quizResult.totalQuestions)}/
                    {quizResult.totalQuestions}
                  </p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Passing Score Required</p>
                <Progress value={Math.min(quizResult.score, 100)} />
                <p className="text-xs text-muted-foreground mt-2">
                  {selectedModule.passingScore}% required to pass
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          {passed && (
            <Card className="bg-green-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-600">Certification Earned!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700">
                  Congratulations! You have successfully completed {selectedModule.name} and earned your
                  certification. Your progress has been recorded on the blockchain.
                </p>
              </CardContent>
            </Card>
          )}

          {!passed && (
            <Card className="bg-yellow-500/10 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-yellow-600">Keep Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-700">
                  You didn't quite reach the passing score this time. Review the material and try again.
                  Each attempt helps you learn more!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleRetakeQuiz} className="flex-1">
              {passed ? 'Take Another Quiz' : 'Retake Quiz'}
            </Button>
            <Button className="flex-1 bg-primary text-primary-foreground">View Certificate</Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Selection View
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">🕋 Guardian Certification Quizzes</h1>
          <p className="text-lg text-muted-foreground">
            Complete training modules and earn certifications. Track your progress toward guardian mastery.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quizzes Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{userProgress.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {userProgress.length > 0
                  ? Math.round(userProgress.reduce((sum, r) => sum + r.score, 0) / userProgress.length)
                  : 0}
                %
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Certifications Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {userProgress.filter((r) => r.passed).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certification Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Certification Milestones</CardTitle>
            <CardDescription>Complete modules to unlock certifications and advance your guardian level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`p-4 border rounded-lg ${
                  milestone.completed
                    ? 'bg-green-500/10 border-green-500/20'
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{milestone.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                  </div>
                  <Badge className={milestone.completed ? 'bg-green-500/20 text-green-600' : 'variant-outline'}>
                    {milestone.completed ? 'Unlocked' : 'Locked'}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available Quizzes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Available Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizModules.map((module) => {
              const completed = userProgress.find((r) => r.moduleId === module.id);

              return (
                <Card key={module.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{module.icon}</span>
                          <CardTitle>{module.name}</CardTitle>
                        </div>
                        <CardDescription className="mt-2">{module.description}</CardDescription>
                      </div>
                      <Badge
                        className={
                          module.difficulty === 'beginner'
                            ? 'bg-green-500/20 text-green-600'
                            : module.difficulty === 'intermediate'
                              ? 'bg-yellow-500/20 text-yellow-600'
                              : 'bg-red-500/20 text-red-600'
                        }
                      >
                        {module.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Questions</p>
                        <p className="font-semibold text-foreground">{module.questions.length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-semibold text-foreground">{module.estimatedTime} min</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Passing Score</p>
                        <p className="font-semibold text-foreground">{module.passingScore}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <p className="font-semibold text-foreground">
                          {completed ? (completed.passed ? '✅ Passed' : '❌ Failed') : 'Not Started'}
                        </p>
                      </div>
                    </div>

                    {completed && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Last Score</p>
                        <p className="text-lg font-bold text-primary">{completed.score}%</p>
                      </div>
                    )}

                    <Button
                      onClick={() => handleStartQuiz(module)}
                      className="w-full bg-primary text-primary-foreground"
                    >
                      {completed ? 'Retake Quiz' : 'Start Quiz'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
