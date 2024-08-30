import { Globe } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <Globe className="w-16 h-16 text-gray-600 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-gray-500 animate-spin"></div>
        <div
          className="absolute inset-0 rounded-full border-b-2 border-l-2 border-gray-700 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}
