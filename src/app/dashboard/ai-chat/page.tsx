"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/Dashboard/ThemeContext";
import {
  Send,
  Plus,
  Mic,
  Sparkles,
  TrendingUp,
  CreditCard,
  User,
  Clock,
  Copy,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  DollarSign,
  PiggyBank,
  Target,
  MessageCircle,
  Lightbulb,
  Menu,
  X,
  Edit,
  Trash2,
  ArrowUp,
  ChevronRight,
  Star,
  Calendar,
  Settings,
  Home,
  BookOpen,
  Zap,
  ChevronDown,
  ArrowLeft,
  Paperclip,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "suggestion" | "goal";
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: ChatMessage[];
}

const FinnaLogo: React.FC<{
  className?: string;
  size?: "sm" | "md" | "lg";
}> = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-full p-0.5 shadow-lg",
          sizeClasses[size],
        )}
      >
        <div className="w-full h-full bg-dashboard-bg rounded-full flex items-center justify-center relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 animate-pulse" />
          <Sparkles
            className={cn(
              "text-purple-500 relative z-10",
              size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8",
            )}
          />
        </div>
      </div>
      {/* Pulse effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-20" />
    </div>
  );
};

const generatePrompts = [
  "How to save for vacation?",
  "Budget for first apartment",
  "Credit score improvement tips",
  "Emergency fund planning",
  "Investment basics for beginners",
  "Debt payoff strategies",
];

const ChatSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  currentSessionId: string;
  onSessionSelect: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
}> = ({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewChat,
  onDeleteSession,
}) => {
  const todaySessions = sessions.filter((session) => {
    const today = new Date();
    const sessionDate = new Date(session.timestamp);
    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()
    );
  });

  const yesterdaySessions = sessions.filter((session) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const sessionDate = new Date(session.timestamp);
    return (
      sessionDate.getDate() === yesterday.getDate() &&
      sessionDate.getMonth() === yesterday.getMonth() &&
      sessionDate.getFullYear() === yesterday.getFullYear()
    );
  });

  const olderSessions = sessions.filter((session) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const sessionDate = new Date(session.timestamp);
    return sessionDate < twoDaysAgo;
  });

  const SessionGroup: React.FC<{ title: string; sessions: ChatSession[] }> = ({
    title,
    sessions,
  }) => {
    if (sessions.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xs font-medium text-dashboard-text-muted uppercase tracking-wider mb-3 px-3">
          {title}
        </h3>
        <div className="space-y-1">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 mx-2",
                currentSessionId === session.id
                  ? "bg-gradient-to-r from-purple-500/15 to-blue-500/15 border border-purple-400/30"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800/50",
              )}
              onClick={() => onSessionSelect(session.id)}
            >
              <MessageCircle
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  currentSessionId === session.id
                    ? "text-purple-500"
                    : "text-dashboard-text-muted",
                )}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium truncate",
                    currentSessionId === session.id
                      ? "text-purple-500"
                      : "text-dashboard-text",
                  )}
                >
                  {session.title}
                </p>
                <p className="text-xs text-dashboard-text-muted truncate">
                  {session.lastMessage}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 w-6 h-6 p-0 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative top-0 left-0 h-full w-80 bg-dashboard-bg border-r border-dashboard-border transition-transform duration-300 ease-in-out z-50 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-dashboard-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FinnaLogo size="sm" />
              <div>
                <h2 className="font-bold text-dashboard-text">
                  Finna
                </h2>
                <p className="text-xs text-dashboard-text-muted">
                  Financial Assistant
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-8 h-8 p-0 rounded-lg"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto py-4">
          <SessionGroup title="Today" sessions={todaySessions} />
          <SessionGroup title="Yesterday" sessions={yesterdaySessions} />
          <SessionGroup title="Previous Chats" sessions={olderSessions} />

          {sessions.length === 0 && (
            <div className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-dashboard-text-muted mx-auto mb-3" />
              <p className="text-sm text-dashboard-text-muted">
                No previous chats yet
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-dashboard-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onClose();
              const event = new CustomEvent("openChatSettings");
              window.dispatchEvent(event);
            }}
            className="w-full justify-start rounded-2xl text-dashboard-text-muted hover:text-dashboard-text"
          >
            <Settings className="w-4 h-4 mr-3" />
            Chat Settings
          </Button>
        </div>
      </div>
    </>
  );
};

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={cn(
        "flex gap-4 mb-6",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isUser && <FinnaLogo size="sm" className="flex-shrink-0 mt-1" />}

      {isUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white">
            <User className="w-4 h-4" />
          </div>
        </div>
      )}

      <div
        className={cn(
          "max-w-[85%] rounded-3xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            : "bg-dashboard-card border border-dashboard-border",
        )}
      >
        {message.type === "goal" && !isUser && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Vacation Goal
              </span>
              <span className="text-xs text-dashboard-text-muted">
                Target: $12,000
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-dashboard-text">
                $7,323
              </span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "68%" }}
                />
              </div>
              <span className="text-sm font-medium text-dashboard-text">
                68%
              </span>
            </div>
          </div>
        )}

        <p
          className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            isUser ? "text-white" : "text-dashboard-text",
          )}
        >
          {message.content}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <span
            className={cn(
              "text-xs",
              isUser ? "text-white/70" : "text-dashboard-text-muted",
            )}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {!isUser && (
            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Copy className="w-3 h-3 text-dashboard-text-muted" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <ThumbsUp className="w-3 h-3 text-dashboard-text-muted hover:text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <ThumbsDown className="w-3 h-3 text-dashboard-text-muted hover:text-red-600" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WelcomeScreen: React.FC<{
  onSuggestionClick: (text: string) => void;
}> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="mb-8">
        <FinnaLogo size="lg" className="mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-dashboard-text mb-2">
          Hey! I'm Finna
        </h1>
        <p className="text-lg text-dashboard-text-muted mb-2">
          Your AI financial assistant
        </p>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl px-4 py-1">
          Finna help you save, slay, and stack 💰
        </Badge>
      </div>

      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold text-dashboard-text mb-4">
          What can I help you with today?
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              icon: PiggyBank,
              text: "How to save for vacation?",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: Target,
              text: "Budget for first apartment",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: CreditCard,
              text: "Credit score improvement tips",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: TrendingUp,
              text: "Investment basics for beginners",
              color: "from-orange-500 to-red-500",
            },
          ].map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion.text)}
                className="flex items-center gap-3 p-4 text-left rounded-2xl border border-dashboard-border hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 group"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform",
                    `bg-gradient-to-r ${suggestion.color}`,
                  )}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-dashboard-text group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {suggestion.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ChatSettingsDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    autoSave: true,
    soundEnabled: false,
    typingIndicator: true,
    darkMode: true,
    compactView: false,
    showTimestamps: true,
    autoScroll: true,
    smartSuggestions: true,
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    localStorage.setItem(
      "finna-chat-settings",
      JSON.stringify({ ...settings, [key]: value }),
    );
  };

  const clearAllChats = () => {
    if (
      confirm(
        "Are you sure you want to clear all chat history? This action cannot be undone.",
      )
    ) {
      localStorage.removeItem("vibewealth-chat-sessions");
      window.location.reload();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl max-h-[80vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-dashboard-text flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-500" />
            Chat Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Chat Behavior */}
          <div>
            <h3 className="font-semibold text-dashboard-text mb-4">
              Chat Behavior
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div>
                  <Label className="text-sm font-medium text-dashboard-text">
                    Auto-save conversations
                  </Label>
                  <p className="text-xs text-dashboard-text-muted">
                    Automatically save your chat history
                  </p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) =>
                    handleSettingChange("autoSave", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div>
                  <Label className="text-sm font-medium text-dashboard-text">
                    Typing indicator
                  </Label>
                  <p className="text-xs text-dashboard-text-muted">
                    Show when Finna is typing
                  </p>
                </div>
                <Switch
                  checked={settings.typingIndicator}
                  onCheckedChange={(checked) =>
                    handleSettingChange("typingIndicator", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div>
                  <Label className="text-sm font-medium text-dashboard-text">
                    Auto-scroll
                  </Label>
                  <p className="text-xs text-dashboard-text-muted">
                    Automatically scroll to new messages
                  </p>
                </div>
                <Switch
                  checked={settings.autoScroll}
                  onCheckedChange={(checked) =>
                    handleSettingChange("autoScroll", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div>
                  <Label className="text-sm font-medium text-dashboard-text">
                    Smart suggestions
                  </Label>
                  <p className="text-xs text-dashboard-text-muted">
                    Show AI-powered quick prompts
                  </p>
                </div>
                <Switch
                  checked={settings.smartSuggestions}
                  onCheckedChange={(checked) =>
                    handleSettingChange("smartSuggestions", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <h3 className="font-semibold text-dashboard-text mb-4">
              Appearance
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div>
                  <Label className="text-sm font-medium text-dashboard-text">
                    Show timestamps
                  </Label>
                  <p className="text-xs text-dashboard-text-muted">
                    Display message timestamps
                  </p>
                </div>
                <Switch
                  checked={settings.showTimestamps}
                  onCheckedChange={(checked) =>
                    handleSettingChange("showTimestamps", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div>
                  <Label className="text-sm font-medium text-dashboard-text">
                    Compact view
                  </Label>
                  <p className="text-xs text-dashboard-text-muted">
                    Reduce spacing between messages
                  </p>
                </div>
                <Switch
                  checked={settings.compactView}
                  onCheckedChange={(checked) =>
                    handleSettingChange("compactView", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div>
                  <Label className="text-sm font-medium text-dashboard-text">
                    Sound notifications
                  </Label>
                  <p className="text-xs text-dashboard-text-muted">
                    Play sound for new messages
                  </p>
                </div>
                <Switch
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) =>
                    handleSettingChange("soundEnabled", checked)
                  }
                />
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div>
            <h3 className="font-semibold text-dashboard-text mb-4">
              Data Management
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={clearAllChats}
                className="w-full justify-start rounded-2xl border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4 mr-3" />
                Clear All Chat History
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-dashboard-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl"
            >
              Close
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const NavigationMenu: React.FC = () => {
  const router = useRouter();

  const navigationItems = [
    {
      href: "/dashboard",
      icon: BarChart3,
      label: "Dashboard",
      description: "Overview & Analytics",
    },
    {
      href: "/dashboard/dream-budget",
      icon: Target,
      label: "Dream Budget",
      description: "Financial Goals",
    },
    {
      href: "/dashboard/friendly-content",
      icon: BookOpen,
      label: "Finance Feed",
      description: "Learn & Explore",
    },
    {
      href: "/dashboard/smart-nudges",
      icon: Zap,
      label: "Smart Nudges",
      description: "AI Insights",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: "Settings",
      description: "Account & Preferences",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-2xl border-dashboard-border text-dashboard-text-muted hover:text-dashboard-text"
        >
          <Home className="w-4 h-4 mr-2" />
          Navigate
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl border-dashboard-border bg-dashboard-card"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={item.href}
              onClick={() => router.push(item.href)}
              className="rounded-xl cursor-pointer p-3 focus:bg-gray-100 dark:focus:bg-gray-800"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-dashboard-text">
                    {item.label}
                  </p>
                  <p className="text-xs text-dashboard-text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator className="bg-dashboard-border" />
        <DropdownMenuItem
          onClick={() => router.push("/dashboard")}
          className="rounded-xl cursor-pointer p-3 focus:bg-gray-100 dark:focus:bg-gray-800"
        >
          <div className="flex items-center gap-3 w-full">
            <ArrowLeft className="w-4 h-4 text-dashboard-text-muted" />
            <span className="text-sm font-medium text-dashboard-text">
              Back to Dashboard
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function AIChat() {
  const { actualTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibewealth-chat-sessions");
      if (saved) {
        try {
          const parsedSessions = JSON.parse(saved);
          return parsedSessions.map((session: any) => ({
            ...session,
            timestamp: new Date(session.timestamp),
            messages: session.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          }));
        } catch (error) {
          console.error("Error parsing chat sessions from localStorage:", error);
          return [];
        }
      }
    }
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const currentSession = sessions.find((s) => s.id === currentSessionId);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vibewealth-chat-sessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages, isTyping]);

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsSettingsOpen(true);
    };

    window.addEventListener("openChatSettings", handleOpenSettings);

    return () => {
      window.removeEventListener("openChatSettings", handleOpenSettings);
    };
  }, []);

  // Handle initial prompt from Smart Nudges navigation
  useEffect(() => {
    const initialPrompt = searchParams.get("initialPrompt");
    if (initialPrompt) {
      setMessage(initialPrompt);
      // Remove the param from the URL (optional)
      const url = new URL(window.location.href);
      url.searchParams.delete("initialPrompt");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [searchParams]);

  const createNewSession = (initialMessage?: string) => {
    const newSessionId = Date.now().toString();
    const newSession: ChatSession = {
      id: newSessionId,
      title: initialMessage ? initialMessage.slice(0, 30) + "..." : "New Chat",
      lastMessage: initialMessage || "",
      timestamp: new Date(),
      messages: [],
    };

    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    return newSessionId;
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message.trim();
    if (!textToSend) return;

    let sessionId = currentSessionId;
    if (!sessionId) {
      sessionId = createNewSession(textToSend);
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              messages: [...session.messages, userMessage],
              lastMessage: textToSend,
              timestamp: new Date(),
            }
          : session,
      ),
    );

    setMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(textToSend),
        sender: "ai",
        timestamp: new Date(),
        type: textToSend.toLowerCase().includes("vacation") ? "goal" : "text",
      };

      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                messages: [...session.messages, aiResponse],
                lastMessage: aiResponse.content.slice(0, 50) + "...",
              }
            : session,
        ),
      );
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    if (userMessage.toLowerCase().includes("vacation")) {
      return "You've saved $7,323. To reach your $12,000 goal, you need $4,677 more. Saving $635 monthly, especially on food and shopping, can help.";
    }
    if (userMessage.toLowerCase().includes("apartment")) {
      return "For a first apartment, budget 30% of income for rent. Include security deposit, utilities, furniture, and moving costs. Start saving 6 months ahead!";
    }
    if (userMessage.toLowerCase().includes("credit")) {
      return "To improve your credit score: pay bills on time, keep credit utilization below 30%, don't close old cards, and check your report regularly.";
    }
    if (userMessage.toLowerCase().includes("investment")) {
      return "Start with index funds for diversification, contribute to employer 401k match, consider robo-advisors, and invest consistently regardless of market timing.";
    }
    return `Great question! Based on your financial profile, here's my personalized advice for "${userMessage}". I can provide more specific guidance if you share more details about your situation.`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId("");
    setMessage("");
    setIsSidebarOpen(false);
  };

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setIsSidebarOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    if (sessionId === currentSessionId) {
      setCurrentSessionId("");
    }
  };

  const showWelcome = !currentSession || currentSession.messages.length === 0;

  return (
    <div className="h-screen flex bg-dashboard-bg">
      {/* Chat Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-dashboard-border bg-dashboard-bg">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-10 h-10 p-0 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 p-0 rounded-lg text-dashboard-text-muted hover:text-dashboard-text hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.push("/dashboard");
                }
              }}
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <FinnaLogo size="sm" />
            <div>
              <h1 className="font-bold text-dashboard-text">Finna</h1>
              <p className="text-xs text-dashboard-text-muted">
                {isTyping ? "Typing..." : "Online"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NavigationMenu />
            {!showWelcome && (
              <Button
                onClick={handleNewChat}
                variant="outline"
                size="sm"
                className="rounded-2xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            )}
          </div>
        </div>

        {/* Chat Messages or Welcome */}
        <div className="flex-1 overflow-y-auto">
          {showWelcome ? (
            <WelcomeScreen onSuggestionClick={handleSendMessage} />
          ) : (
            <div className="p-4 max-w-4xl mx-auto">
              {currentSession?.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {isTyping && (
                <div className="flex gap-4 mb-6">
                  <FinnaLogo size="sm" className="flex-shrink-0 mt-1" />
                  <div className="bg-dashboard-card border border-dashboard-border rounded-3xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-dashboard-border bg-dashboard-bg">
          <div className="max-w-4xl mx-auto">
            {/* Generate Prompts */}
            {showWelcome && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                <span className="text-sm text-dashboard-text-muted whitespace-nowrap flex items-center mr-2">
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Quick prompts:
                </span>
                {generatePrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSendMessage(prompt)}
                    className="rounded-2xl whitespace-nowrap text-xs"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="bg-dashboard-card border border-dashboard-border rounded-3xl p-4 shadow-lg">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Finna anything about your finances..."
                    className="border-none bg-transparent text-dashboard-text placeholder:text-dashboard-text-muted focus:outline-none focus:ring-0 p-0 text-base"
                    disabled={isTyping}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 rounded-2xl text-dashboard-text-muted hover:text-dashboard-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    disabled
                    title="Attach files (coming soon)"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 rounded-2xl text-dashboard-text-muted hover:text-dashboard-text hover:bg-gray-100 dark:hover:bg-gray-800"
                    disabled
                    title="Voice input (coming soon)"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => handleSendMessage()}
                    size="sm"
                    className={cn(
                      "w-10 h-10 p-0 rounded-2xl transition-all duration-200",
                      message.trim() && !isTyping
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed",
                    )}
                    disabled={!message.trim() || isTyping}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-dashboard-text-muted mt-3 text-center">
              Finna provides AI-generated financial guidance for educational
              purposes. Always consult with qualified professionals for
              important financial decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Settings Dialog */}
      <ChatSettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};