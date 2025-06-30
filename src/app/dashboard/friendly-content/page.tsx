"use client";

import React from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/Dashboard/ThemeContext";
import {
  ArrowRight,
  BookOpen,
  Play,
  Clock,
  Star,
  TrendingUp,
  DollarSign,
  PiggyBank,
  CreditCard,
  BarChart3,
  Lightbulb,
  Zap,
  Calendar,
  Sparkles,
  Filter,
  Search,
  Heart,
  Share2,
  Bookmark,
  Smartphone,
  TrendingDown,
  Shield,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

interface ContentItem {
  id: string;
  title: string;
  type: "article" | "video" | "interactive" | "meme";
  duration?: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  author: string;
  publishedAt: string;
  readTime?: string;
  videoLength?: string;
  featured?: boolean;
  likes: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  thumbnail?: string;
}

const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "Building Your Emergency Fund: A Complete Guide",
    type: "article",
    category: "Savings",
    difficulty: "Beginner",
    description:
      "Learn how to build a solid emergency fund that protects you from financial uncertainties. Includes practical steps and real examples.",
    author: "Sarah Chen",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    featured: true,
    likes: 234,
    icon: PiggyBank,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "2",
    title: "Credit Card Rewards: Maximize Your Benefits",
    type: "video",
    category: "Credit",
    difficulty: "Intermediate",
    description:
      "Discover advanced strategies to maximize credit card rewards and cashback without falling into debt traps.",
    author: "Mike Rodriguez",
    publishedAt: "2024-01-12",
    videoLength: "12 min",
    featured: false,
    likes: 189,
    icon: CreditCard,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "3",
    title: "Stock Market Basics: Interactive Learning",
    type: "interactive",
    category: "Investing",
    difficulty: "Beginner",
    description:
      "Interactive tutorial that teaches stock market fundamentals through simulations and real-time examples.",
    author: "Alex Kim",
    publishedAt: "2024-01-10",
    featured: true,
    likes: 312,
    icon: BarChart3,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "4",
    title: "When You Finally Understand Compound Interest",
    type: "meme",
    category: "Education",
    difficulty: "Beginner",
    description:
      "A funny take on the moment when compound interest finally clicks. Educational and entertaining!",
    author: "Finance Memes",
    publishedAt: "2024-01-08",
    featured: false,
    likes: 567,
    icon: Lightbulb,
    color: "from-orange-500 to-red-500",
  },
  {
    id: "5",
    title: "Budgeting Apps Comparison 2024",
    type: "article",
    category: "Tools",
    difficulty: "Intermediate",
    description:
      "Comprehensive review of the best budgeting apps available in 2024, with pros, cons, and recommendations.",
    author: "Tech Finance",
    publishedAt: "2024-01-05",
    readTime: "15 min read",
    featured: false,
    likes: 156,
    icon: Smartphone,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "6",
    title: "Cryptocurrency Investment Strategy",
    type: "video",
    category: "Investing",
    difficulty: "Advanced",
    description:
      "Advanced strategies for cryptocurrency investment, including risk management and portfolio diversification.",
    author: "Crypto Expert",
    publishedAt: "2024-01-03",
    videoLength: "25 min",
    featured: true,
    likes: 445,
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
  },
];

const categories = [
  "All",
  "Savings",
  "Investing",
  "Credit",
  "Education",
  "Tools",
];

const tipOfTheDay = {
  title: "Start small, think big",
  description:
    "Even saving $5 a week can grow to $260 in a year. Small habits compound into significant results over time.",
  icon: Lightbulb,
  color: "from-yellow-400 to-orange-500",
};

const TipOfTheDay: React.FC = () => {
  const Icon = tipOfTheDay.icon;

  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800/30 rounded-3xl shadow-lg mb-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0",
              `bg-gradient-to-r ${tipOfTheDay.color}`,
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                💡 Tip of the Day
              </h3>
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-xl text-xs">
                Daily Wisdom
              </Badge>
            </div>
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
              {tipOfTheDay.title}
            </h4>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
              {tipOfTheDay.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatsOverview: React.FC = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
    <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl flex items-center justify-center shadow-md mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-xs text-dashboard-text-muted mb-2">
            Articles Read
          </p>
          <p className="text-lg lg:text-2xl font-bold text-dashboard-text">
            12
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl flex items-center justify-center shadow-md mx-auto mb-3">
            <Play className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs text-dashboard-text-muted mb-2">
            Videos Watched
          </p>
          <p className="text-lg lg:text-2xl font-bold text-dashboard-text">
            8
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl flex items-center justify-center shadow-md mx-auto mb-3">
            <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-xs text-dashboard-text-muted mb-2">
            Tutorials Done
          </p>
          <p className="text-lg lg:text-2xl font-bold text-dashboard-text">
            5
          </p>
        </div>
      </CardContent>
    </Card>

    <Card className="bg-dashboard-card border-dashboard-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl flex items-center justify-center shadow-md mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-xs text-dashboard-text-muted mb-2">
            Progress
          </p>
          <p className="text-lg lg:text-2xl font-bold text-dashboard-text">
            78%
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  const Icon = item.icon;

  const typeIcons = {
    article: BookOpen,
    video: Play,
    interactive: Zap,
    meme: Star,
  };

  const TypeIcon = typeIcons[item.type];

  const difficultyColors = {
    Beginner:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    Intermediate:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  };

  return (
    <Card
      className={cn(
        "bg-dashboard-card border-dashboard-border hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer group hover:shadow-xl rounded-3xl h-full flex flex-col overflow-hidden",
        item.featured && "ring-2 ring-purple-500/20",
      )}
    >
      <CardContent className="p-4 sm:p-6 flex flex-col h-full">
        {/* Header with centered icon and title below it */}
        <div className="text-center mb-4">
          <div
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg",
              `bg-gradient-to-r ${item.color}`,
            )}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-dashboard-text group-hover:text-purple-500 transition-colors leading-tight text-base sm:text-lg mb-2">
            {item.title}
          </h3>
          {item.featured && (
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-xs mb-2 inline-flex">
              <Sparkles className="w-2.5 h-2.5 mr-1" />
              Featured
            </Badge>
          )}
          <p className="text-xs sm:text-sm text-dashboard-text-muted line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Tags/Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
          <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
            <TypeIcon className="w-2.5 h-2.5 text-dashboard-text-muted" />
            <span className="text-xs text-dashboard-text-muted capitalize">
              {item.type}
            </span>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs rounded-lg flex-shrink-0 px-1.5 py-0.5",
              difficultyColors[item.difficulty],
            )}
          >
            {item.difficulty}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs rounded-lg flex-shrink-0 px-1.5 py-0.5"
          >
            {item.category}
          </Badge>
        </div>

        {/* Footer - Responsive and centered */}
        <div className="mt-auto space-y-3">
          {/* Date and reading time - centered */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-dashboard-text-muted">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
            </div>
            {item.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>{item.readTime}</span>
              </div>
            )}
            {item.videoLength && (
              <div className="flex items-center gap-1">
                <Play className="w-3 h-3 flex-shrink-0" />
                <span>{item.videoLength}</span>
              </div>
            )}
          </div>

          {/* Likes, bookmark, share - centered and responsive */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 text-xs text-dashboard-text-muted">
              <Heart className="w-3 h-3" />
              <span>{item.likes}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bookmark className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Share2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FriendlyContent() {
  const { actualTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredContent =
    selectedCategory === "All"
      ? contentItems
      : contentItems.filter((item) => item.category === selectedCategory);

  const featuredContent = contentItems.filter((item) => item.featured);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <DashboardHeader pageName="Friendly Content" />

        {/* Page Title */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-dashboard-text mb-2">
              Finance Feed
            </h1>
            <p className="text-dashboard-text-muted">
              Learn finance through engaging content, articles, and interactive tools
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-2xl border-dashboard-border"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-dashboard-border"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Tip of the Day */}
        <TipOfTheDay />

        {/* Stats Overview */}
        <StatsOverview />

        {/* Category Filter */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "flex-shrink-0 transition-all duration-300 rounded-2xl",
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                  : "border-dashboard-border text-dashboard-text-muted hover:text-dashboard-text hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Content */}
        {selectedCategory === "All" && featuredContent.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-dashboard-text mb-6">
              🌟 Featured Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* All Content */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dashboard-text">
              {selectedCategory === "All" ? "All Content" : selectedCategory}
            </h2>
            <span className="text-sm text-dashboard-text-muted">
              {filteredContent.length} items
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center pt-8">
          <Button
            variant="outline"
            className="rounded-2xl border-dashboard-border px-8 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Load More Content
          </Button>
        </div>

        {/* Bottom padding */}
        <div className="pb-8" />
      </div>
    </DashboardLayout>
  );
}