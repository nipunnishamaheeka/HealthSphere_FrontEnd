import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from '../components/common/Card';
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '../components/common/Tabs';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Brain, TrendingUp, Calendar, Target } from 'lucide-react';

interface WeeklyData {
    day: string;
    steps: number;
    calories: number;
    sleep: number;
    weight: number;
}

interface AISuggestion {
    category: string;
    suggestion: string;
    impact: 'high' | 'medium' | 'positive';
}

const InsightsAnalytics: React.FC = () => {
    const weeklyData: WeeklyData[] = [
        { day: 'Mon', steps: 8000, calories: 2100, sleep: 7.5, weight: 70 },
        { day: 'Tue', steps: 10000, calories: 2300, sleep: 8, weight: 70.2 },
        { day: 'Wed', steps: 7500, calories: 2000, sleep: 6.5, weight: 70.1 },
        { day: 'Thu', steps: 9000, calories: 2200, sleep: 7, weight: 69.8 },
        { day: 'Fri', steps: 11000, calories: 2400, sleep: 8.5, weight: 69.7 },
        { day: 'Sat', steps: 6000, calories: 2600, sleep: 9, weight: 69.5 },
        { day: 'Sun', steps: 7000, calories: 2200, sleep: 8, weight: 69.6 }
    ];

    const aiSuggestions: AISuggestion[] = [
        {
            category: 'Exercise',
            suggestion: 'Your activity levels drop on weekends. Try scheduling morning walks to maintain consistency.',
            impact: 'high'
        },
        {
            category: 'Nutrition',
            suggestion: 'Your calorie intake varies significantly. Consider meal planning to stabilize daily intake.',
            impact: 'medium'
        },
        {
            category: 'Sleep',
            suggestion: 'Your sleep duration has improved. Keep maintaining the 8-hour sleep schedule.',
            impact: 'positive'
        }
    ];

    return (
        <div className="w-full space-y-6">
            <Tabs defaultValue="weekly" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="weekly">Weekly Analysis</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="weekly" className="space-y-6">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Weekly Health Metrics
                            </CardTitle>
                            <CardDescription>Your health progress over the past week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={weeklyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis yAxisId="left" />
                                        <YAxis yAxisId="right" orientation="right" />
                                        <Tooltip />
                                        <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#2563eb" name="Steps" />
                                        <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#dc2626" name="Calories" />
                                        <Line yAxisId="right" type="monotone" dataKey="sleep" stroke="#047857" name="Sleep (hrs)" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5" />
                                AI-Driven Insights
                            </CardTitle>
                            <CardDescription>Personalized suggestions based on your data</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {aiSuggestions.map((insight, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                                        <div className={`p-2 rounded-full ${
                                            insight.impact === 'high' ? 'bg-red-100' :
                                                insight.impact === 'medium' ? 'bg-yellow-100' :
                                                    'bg-green-100'
                                        }`}>
                                            <Target className={`h-5 w-5 ${
                                                insight.impact === 'high' ? 'text-red-600' :
                                                    insight.impact === 'medium' ? 'text-yellow-600' :
                                                        'text-green-600'
                                            }`} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{insight.category}</h4>
                                            <p className="text-sm text-gray-600">{insight.suggestion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Steps</span>
                                        <span className="font-medium">8,357</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Calories</span>
                                        <span className="font-medium">2,257</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Sleep</span>
                                        <span className="font-medium">7.8 hrs</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Weekly Goals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Steps Goal</span>
                                        <span className="font-medium">85%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Calories Goal</span>
                                        <span className="font-medium">92%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Sleep Goal</span>
                                        <span className="font-medium">78%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium">Improvements</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Steps</span>
                                        <span className="text-green-600">↑ 12%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Calories</span>
                                        <span className="text-red-600">↓ 5%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Sleep</span>
                                        <span className="text-green-600">↑ 8%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="monthly">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Monthly Overview
                            </CardTitle>
                            <CardDescription>Your long-term health trends</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px] flex items-center justify-center text-gray-500">
                                Monthly trend analysis would be displayed here
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default InsightsAnalytics;
