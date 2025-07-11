import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastNotificationProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose?: () => void;
}

export function ToastNotification({ message, type, onClose }: ToastNotificationProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      "flex items-center space-x-3 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in",
      colors[type]
    )}>
      <Icon className="h-5 w-5" />
      <span className="font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto hover:opacity-75 transition-opacity"
        >
          <XCircle className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
