import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  color?: string;
  // color?: "blue" | "green" | "purple" | "orange" | "red" | "yellow";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  color = "blue",
}) => {
  const colorClasses: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    yellow: "from-yellow-500 to-yellow-600",
    olive: "from-yellow-500 to-yellow-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
    >
      {/* Top: Icon + Change */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]} text-white`}
        >
          <Icon size={24} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend === "up" ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend === "up" ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>

      {/* Bottom: Title + Value */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm">{title}</p>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </motion.div>
  );
};

export default StatsCard;
