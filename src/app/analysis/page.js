'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Loader2 } from 'lucide-react';
import { getSpendingAnalysis, getSavingsRecommendations, getCategoryInsights } from '@/lib/ai-analysis';
import { TRANSACTION_CATEGORY } from '@/lib/transaction-storage';

export default function AnalysisPage() {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [categoryInsights, setCategoryInsights] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAnalysis = async () => {
    setLoading(true);
    try {
      const result = await getSpendingAnalysis(dateRange.from, dateRange.to);
      setAnalysis(result);
    } catch (error) {
      console.error('Error getting analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendations = async () => {
    setLoading(true);
    try {
      const result = await getSavingsRecommendations();
      setRecommendations(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryInsights = async (category) => {
    setSelectedCategory(category);
    if (!categoryInsights[category]) {
      setLoading(true);
      try {
        const result = await getCategoryInsights(category);
        setCategoryInsights(prev => ({ ...prev, [category]: result }));
      } catch (error) {
        console.error('Error getting category insights:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Spending Analysis</h1>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
              <CardDescription>Analyze your spending patterns and trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Calendar
                  mode="range"
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={range => setDateRange(range || { from: null, to: null })}
                  className="rounded-md border"
                />
              </div>
              <Button onClick={handleAnalysis} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Spending
              </Button>
              {analysis && (
                <div className="mt-4 p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {analysis}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Savings Recommendations</CardTitle>
              <CardDescription>Get personalized recommendations for saving money</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleRecommendations} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Recommendations
              </Button>
              {recommendations && (
                <div className="mt-4 p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {recommendations}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Category Analysis</CardTitle>
              <CardDescription>Get insights for specific spending categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {Object.values(TRANSACTION_CATEGORY).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => handleCategoryInsights(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {loading && <Loader2 className="mx-auto h-8 w-8 animate-spin" />}
              {selectedCategory && categoryInsights[selectedCategory] && (
                <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                  {categoryInsights[selectedCategory]}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 