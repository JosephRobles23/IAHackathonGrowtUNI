import { Users, Building, DollarSign, PercentCircle } from "lucide-react"
import HorizontalBarChart from "./HorizontalBarChart"
import TrendlineChart from "./TrendlineChart"
import PieChart from "./PieChart"

export default function EstadisticasConversion() {
  // Datos simulados para las métricas principales
  const metrics = [
    {
      title: "Total de Leads Captados",
      value: "2,845",
      icon: Users,
      trend: { value: 12.5, isPositive: true },
      color: "#FFA726",
    },
    {
      title: "Total de Propiedades Sugeridas",
      value: "8,632",
      icon: Building,
      trend: { value: 8.3, isPositive: true },
      color: "#42A5F5",
    },
    {
      title: "Total de Ventas Concretadas",
      value: "342",
      icon: DollarSign,
      trend: { value: 15.2, isPositive: true },
      color: "#66BB6A",
    },
    {
      title: "Porcentaje de Conversión",
      value: "12.02%",
      icon: PercentCircle,
      trend: { value: 2.8, isPositive: true },
      color: "#FFA726",
    },
  ]

  // Datos simulados para el gráfico de barras horizontales
  const horizontalBarData = {
    labels: ["Departamentos", "Casas", "Locales Comerciales", "Terrenos"],
    datasets: [
      {
        label: "Tasa de Conversión (%)",
        data: [14.5, 10.8, 8.2, 6.5],
        backgroundColor: "#FFA726",
      },
    ],
  }

  // Datos simulados para el line chart
  const lineChartData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7", "Semana 8"],
    datasets: [
      {
        label: "Tasa de Conversión (%)",
        data: [9.8, 10.2, 10.5, 11.3, 11.8, 11.5, 12.0, 12.2],
        borderColor: "#FFA726",
        backgroundColor: "rgba(255, 167, 38, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Datos simulados para el pie chart
  const pieChartData = {
    labels: ["WhatsApp", "Facebook Ads", "Referencias directas", "Portal web"],
    datasets: [
      {
        data: [45, 25, 15, 15],
        backgroundColor: ["#25D366", "#4267B2", "#FFA726", "#42A5F5"],
        borderColor: "#1E1E1E",
        borderWidth: 2,
      },
    ],
  }

  // Datos simulados para la tabla de conversión por agente
  const agentes = [
    { nombre: "Carlos Méndez", leads: 245, ventas: 32, conversion: 13.1, tendencia: "+2.5%" },
    { nombre: "María González", leads: 198, ventas: 28, conversion: 14.1, tendencia: "+1.8%" },
    { nombre: "Juan Pérez", leads: 176, ventas: 22, conversion: 12.5, tendencia: "+0.5%" },
    { nombre: "Ana Rodríguez", leads: 154, ventas: 18, conversion: 11.7, tendencia: "-0.3%" },
    { nombre: "Roberto Sánchez", leads: 132, ventas: 15, conversion: 11.4, tendencia: "+1.2%" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Estadísticas de Conversión</h1>
        <p className="text-gray-400">Análisis de la efectividad de las conversiones y ventas</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 hover:border-[#FFA726] transition-all hover:shadow-lg hover:shadow-[#FFA726]/5 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">{metric.title}</h3>
                <p className="text-3xl font-bold text-white">{metric.value}</p>

                {metric.trend && (
                  <div
                    className={`flex items-center gap-1 mt-2 text-xs ${
                      metric.trend.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span>{metric.trend.isPositive ? "↑" : "↓"}</span>
                    <span>{metric.trend.value}% vs mes anterior</span>
                  </div>
                )}
              </div>

              <div className="bg-[#2A2A2A] p-3 rounded-lg">
                <metric.icon className={`text-[${metric.color}]`} size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras horizontales */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Conversión por Categoría</h3>
          <div className="h-[350px]">
            <HorizontalBarChart title="" data={horizontalBarData} />
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Distribución de Fuentes de Contacto</h3>
          <div className="h-[350px] flex items-center justify-center">
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Evolución Semanal de la Tasa de Conversión</h3>
        <div className="h-[350px]">
          <TrendlineChart data={lineChartData} />
        </div>
      </div>

      {/* Tabla de conversión por agente */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Conversión por Agente</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Agente</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Leads</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Ventas</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Conversión</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Tendencia</th>
              </tr>
            </thead>
            <tbody>
              {agentes.map((agente) => (
                <tr
                  key={agente.nombre}
                  className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A] transition-colors"
                >
                  <td className="py-3 px-4 text-white font-medium">{agente.nombre}</td>
                  <td className="py-3 px-4 text-white">{agente.leads}</td>
                  <td className="py-3 px-4 text-white">{agente.ventas}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${
                          agente.conversion > 12
                            ? "text-green-400"
                            : agente.conversion > 10
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {agente.conversion}%
                      </span>
                      <div className="w-24 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            agente.conversion > 12
                              ? "bg-green-400"
                              : agente.conversion > 10
                                ? "bg-yellow-400"
                                : "bg-red-400"
                          }`}
                          style={{
                            width: `${(agente.conversion / 15) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-3 px-4 ${agente.tendencia.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                    {agente.tendencia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
