import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function MetricCard({ title, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] hover:border-[#FFA726] p-6 transition-all hover:shadow-lg hover:shadow-[#FFA726]/5 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
          <p className="text-3xl font-bold text-white">{value}</p>

          {trend && (
            <div
              className={`flex items-center gap-1 mt-2 text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{trend.value}% vs mes anterior</span>
            </div>
          )}
        </div>

        <div className="bg-[#2A2A2A] p-3 rounded-lg">
          <Icon className="text-[#FFA726]" size={20} />
        </div>
      </div>
    </div>
  )
}
