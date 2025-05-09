import { MessageSquare, Users, Clock, TrendingUp } from "lucide-react"
import MetricCard from "./MetricCard"
import LineChart from "./LineChart"
import BarChart from "./BarChart"

export default function VisionGeneral() {
  // Datos simulados para las métricas
  const metrics = [
    {
      title: "Total de Conversaciones",
      value: "1,234",
      icon: MessageSquare,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: "Usuarios Únicos",
      value: "856",
      icon: Users,
      trend: { value: 8.3, isPositive: true },
    },
    {
      title: "Tiempo Promedio de Conversación",
      value: "4.2 min",
      icon: Clock,
      trend: { value: 2.1, isPositive: false },
    },
    {
      title: "% de Intención de Compra/Venta",
      value: "68%",
      icon: TrendingUp,
      trend: { value: 5.7, isPositive: true },
    },
  ]

  // Datos simulados para el gráfico de línea
  const lineChartData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Usuarios Activos",
        data: [650, 590, 800, 810, 960, 1100, 1050],
        borderColor: "#FFA726",
        backgroundColor: "rgba(255, 167, 38, 0.1)",
      },
      {
        label: "Nuevos Registros",
        data: [320, 280, 300, 250, 400, 450, 420],
        borderColor: "#E0E0E0",
        backgroundColor: "rgba(224, 224, 224, 0.1)",
      },
    ],
  }

  // Datos simulados para el gráfico de barras
  const barChartData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Interacciones",
        data: [120, 190, 210, 180, 230, 140, 90],
        backgroundColor: "#FFA726",
      },
    ],
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Visión General</h1>
        <p className="text-gray-400">Resumen de métricas y estadísticas clave de la plataforma</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart title="Usuarios en el Tiempo" data={lineChartData} />
        <BarChart title="Interacciones por Día" data={barChartData} />
      </div>

      {/* Sección adicional */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 border-b border-[#2A2A2A] pb-4 last:border-0">
              <div className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <Users size={16} className="text-[#FFA726]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Usuario #{Math.floor(Math.random() * 1000)} completó una búsqueda de propiedad
                </p>
                <p className="text-xs text-gray-400">Hace {Math.floor(Math.random() * 60)} minutos</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
