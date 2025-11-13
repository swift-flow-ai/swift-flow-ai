import {
  CheckSquare,
  FileText,
  Bell,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  User,
  UserPlus,
  Mail,
  Settings,
} from "lucide-react";
import { InboxItemType } from "../../services/inbox.service";

export interface ItemTypeConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  label: string;
  category: "actionable" | "informational" | "system";
}

/**
 * Get type-specific configuration for inbox items
 */
export function getItemTypeConfig(type: InboxItemType): ItemTypeConfig {
  const configs: Record<InboxItemType, ItemTypeConfig> = {
    approval: {
      icon: CheckSquare,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-500/10",
      label: "Approval",
      category: "actionable",
    },
    task: {
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      label: "Task",
      category: "actionable",
    },
    notification: {
      icon: Bell,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-500/10",
      label: "Notification",
      category: "informational",
    },
    alert: {
      icon: AlertCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10",
      label: "Alert",
      category: "informational",
    },
    workflow_error: {
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10",
      label: "Workflow Error",
      category: "actionable",
    },
    workflow_success: {
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-500/10",
      label: "Workflow Success",
      category: "informational",
    },
    comment: {
      icon: MessageSquare,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      label: "Comment",
      category: "informational",
    },
    mention: {
      icon: User,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      label: "Mention",
      category: "informational",
    },
    assignment: {
      icon: UserPlus,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10",
      label: "Assignment",
      category: "actionable",
    },
    invitation: {
      icon: Mail,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-500/10",
      label: "Invitation",
      category: "actionable",
    },
    system: {
      icon: Settings,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-500/10",
      label: "System",
      category: "system",
    },
  };
  return configs[type] || configs.notification;
}

/**
 * Get priority configuration
 */
export function getPriorityConfig(
  priority: "low" | "medium" | "high" | "critical"
) {
  const configs = {
    low: {
      variant: "default" as const,
      color: "text-gray-500",
      bg: "bg-gray-500/10",
    },
    medium: {
      variant: "info" as const,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    high: {
      variant: "warning" as const,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    critical: {
      variant: "danger" as const,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  };
  return configs[priority];
}

/**
 * Check if item is urgent (due within 1 hour)
 */
export function isUrgent(dueAt?: string): boolean {
  if (!dueAt) return false;
  return new Date(dueAt).getTime() - Date.now() < 60 * 60 * 1000;
}

/**
 * Check if item is overdue
 */
export function isOverdue(dueAt?: string): boolean {
  if (!dueAt) return false;
  return new Date(dueAt).getTime() - Date.now() < 0;
}

/**
 * Check if item type is actionable
 */
export function isActionable(type: InboxItemType): boolean {
  const config = getItemTypeConfig(type);
  return config.category === "actionable";
}
