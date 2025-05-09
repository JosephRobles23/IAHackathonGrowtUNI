import { MessageSquare, Clock, TrendingUp } from "lucide-react"
import MetricCard from "./MetricCard"
import RadarChart from "./RadarChart"
import SparklineChart from "./SparklineChart"
import StackedBarChart from "./StackedBarChart"

export default function ConversacionesInteligentes() {
  // Datos simulados para las métricas principales
  const metrics = [
    {
      title: "Total Conversaciones Analizadas",
      value: "5,842",
      icon: MessageSquare,
      trend: { value: 18.3, isPositive: true },
    },
    {
      title: "Duración Promedio",
      value: "4.8 min",
      icon: Clock,
      trend: { value: 0.5, isPositive: false },
    },
    {
      title: "Tasa de Resolución",
      value: "87%",
      icon: TrendingUp,
      trend: { value: 3.2, isPositive: true },
    },
  ]

  // Datos simulados para el gráfico de radar
  const radarData = {
    labels: [
      "Consultas de precios",
      "Consultas de ubicación",
      "Consultas de financiamiento",
      "Consultas sobre proceso legal",
      "Consultas generales",
    ],
    datasets: [
      {
        label: "Frecuencia",
        data: [85, 92, 68, 55, 78],
        backgroundColor: "rgba(255, 167, 38, 0.2)",
        borderColor: "#FFA726",
        borderWidth: 2,
        pointBackgroundColor: "#FFA726",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#FFA726",
      },
      {
        label: "Complejidad",
        data: [65, 59, 90, 81, 56],
        backgroundColor: "rgba(224, 224, 224, 0.2)",
        borderColor: "#E0E0E0",
        borderWidth: 2,
        pointBackgroundColor: "#E0E0E0",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#E0E0E0",
      },
    ],
  }

  // Datos simulados para el sparkline chart
  const sparklineData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Conversaciones",
        data: [125, 142, 165, 190, 178, 152, 148],
        borderColor: "#FFA726",
        backgroundColor: "rgba(255, 167, 38, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Datos simulados para el gráfico de barras apiladas
  const stackedBarData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Resueltas",
        data: [108, 125, 142, 165, 155, 132, 128],
        backgroundColor: "#66BB6A",
      },
      {
        label: "Derivadas",
        data: [17, 17, 23, 25, 23, 20, 20],
        backgroundColor: "#FFA726",
      },
    ],
  }

  // Datos simulados para las estadísticas de intenciones
  const intenciones = [
    { nombre: "Compra", porcentaje: 45, color: "#66BB6A" },
    { nombre: "Venta", porcentaje: 25, color: "#42A5F5" },
    { nombre: "Alquiler", porcentaje: 20, color: "#FFA726" },
    { nombre: "Información", porcentaje: 10, color: "#E0E0E0" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Conversaciones Inteligentes</h1>
        <p className="text-gray-400">Análisis de las conversaciones con el asistente virtual</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de radar */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Distribución de Consultas</h3>
          <div className="h-[350px]">
            <RadarChart data={radarData} />
          </div>
        </div>

        {/* Sparkline chart */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Tendencia de Conversaciones (Últimos 7 días)</h3>
          <div className="h-[350px]">
            <SparklineChart data={sparklineData} />
          </div>
        </div>
      </div>

      {/* Gráfico de barras apiladas */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Proporción de Conversaciones Resueltas vs Derivadas</h3>
        <div className="h-[350px]">
          <StackedBarChart data={stackedBarData} />
        </div>
      </div>

      {/* Estadísticas de intenciones */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Intenciones Detectadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {intenciones.map((intencion) => (
            <div key={intencion.nombre} className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{intencion.nombre}</span>
                <span className="text-white font-bold">{intencion.porcentaje}%</span>
              </div>
              <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${intencion.porcentaje}%`,
                    backgroundColor: intencion.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
