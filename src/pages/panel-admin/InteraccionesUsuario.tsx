import { MessageSquare, Bot, Clock } from "lucide-react"
import MetricCard from "./MetricCard"
import BarChart from "./BarChart"
import Table from "./Table"

export default function InteraccionesUsuario() {
  // Datos simulados para las métricas
  const metrics = [
    {
      title: "Total Mensajes Recibidos",
      value: "3,842",
      icon: MessageSquare,
      trend: { value: 15.2, isPositive: true },
    },
    {
      title: "Total Respuestas del Bot",
      value: "3,756",
      icon: Bot,
      trend: { value: 14.8, isPositive: true },
    },
    {
      title: "Tiempo Promedio de Respuesta",
      value: "1.8 seg",
      icon: Clock,
      trend: { value: 0.3, isPositive: false },
    },
  ]

  // Datos simulados para el gráfico de barras agrupadas
  const barChartData = {
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    datasets: [
      {
        label: "Mensajes Recibidos",
        data: [120, 190, 210, 180, 230, 140, 90],
        backgroundColor: "#FFA726",
      },
      {
        label: "Respuestas del Bot",
        data: [115, 185, 205, 175, 225, 135, 85],
        backgroundColor: "#E0E0E0",
      },
    ],
  }

  // Datos simulados para la tabla de interacciones
  const interacciones = [
    {
      id: 1,
      usuario: "Carlos Méndez",
      fecha: "2025-05-09 13:45",
      tipo: "Búsqueda de departamento",
      estado: "Completada",
    },
    {
      id: 2,
      usuario: "María González",
      fecha: "2025-05-09 12:30",
      tipo: "Consulta de precio",
      estado: "Completada",
    },
    {
      id: 3,
      usuario: "Juan Pérez",
      fecha: "2025-05-09 11:15",
      tipo: "Solicitud de visita",
      estado: "Pendiente",
    },
    {
      id: 4,
      usuario: "Ana Rodríguez",
      fecha: "2025-05-09 10:20",
      tipo: "Información de zona",
      estado: "Completada",
    },
    {
      id: 5,
      usuario: "Roberto Sánchez",
      fecha: "2025-05-08 18:45",
      tipo: "Búsqueda de casa",
      estado: "Completada",
    },
    {
      id: 6,
      usuario: "Laura Martínez",
      fecha: "2025-05-08 16:30",
      tipo: "Consulta de financiamiento",
      estado: "Completada",
    },
    {
      id: 7,
      usuario: "Diego López",
      fecha: "2025-05-08 15:10",
      tipo: "Búsqueda de oficina",
      estado: "Abandonada",
    },
    {
      id: 8,
      usuario: "Sofía Torres",
      fecha: "2025-05-08 14:25",
      tipo: "Consulta de disponibilidad",
      estado: "Completada",
    },
    {
      id: 9,
      usuario: "Javier Ramírez",
      fecha: "2025-05-08 12:40",
      tipo: "Búsqueda de terreno",
      estado: "Completada",
    },
    {
      id: 10,
      usuario: "Patricia Flores",
      fecha: "2025-05-08 11:05",
      tipo: "Solicitud de contacto",
      estado: "Pendiente",
    },
  ]

  const columns = [
    { header: "Usuario", accessor: "usuario" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Tipo de Consulta", accessor: "tipo" },
    {
      header: "Estado",
      accessor: "estado",
      cell: (value: string) => {
        const colorMap: Record<string, string> = {
          Completada: "bg-green-900 text-green-300",
          Pendiente: "bg-yellow-900 text-yellow-300",
          Abandonada: "bg-red-900 text-red-300",
        }
        return <span className={`px-2 py-1 rounded text-xs ${colorMap[value] || ""}`}>{value}</span>
      },
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Interacciones del Usuario</h1>
        <p className="text-gray-400">Análisis de las conversaciones e interacciones con la plataforma</p>
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

      {/* Gráfico de barras agrupadas */}
      <div>
        <BarChart title="Mensajes por Día de la Semana" data={barChartData} />
      </div>

      {/* Tabla de interacciones recientes */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Últimas Interacciones</h3>
        <Table data={interacciones} columns={columns} />
      </div>
    </div>
  )
}
