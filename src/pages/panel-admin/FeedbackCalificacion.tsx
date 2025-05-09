import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import DoughnutChart from "./DoughnutChart"
import TrendlineChart from "./TrendlineChart"
import Table from "./Table"

export default function FeedbackCalificacion() {
  // Datos simulados para el doughnut chart
  const doughnutData = {
    labels: ["Positivo", "Neutral", "Negativo"],
    datasets: [
      {
        data: [68, 24, 8],
        backgroundColor: ["#66BB6A", "#E0E0E0", "#EF5350"],
        borderColor: "#1E1E1E",
        borderWidth: 2,
      },
    ],
  }

  // Datos simulados para el trendline chart
  const trendlineData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Feedback Positivo",
        data: [62, 65, 68, 72],
        borderColor: "#66BB6A",
        backgroundColor: "rgba(102, 187, 106, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Feedback Neutral",
        data: [28, 26, 24, 20],
        borderColor: "#E0E0E0",
        backgroundColor: "rgba(224, 224, 224, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Feedback Negativo",
        data: [10, 9, 8, 8],
        borderColor: "#EF5350",
        backgroundColor: "rgba(239, 83, 80, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  // Datos simulados para la tabla de feedback
  const feedbackData = [
    {
      id: 1,
      usuario: "Carlos Méndez",
      comentario: "Excelente servicio, encontré lo que buscaba rápidamente.",
      calificacion: 5,
      fecha: "2025-05-09",
    },
    {
      id: 2,
      usuario: "María González",
      comentario: "Buena experiencia, aunque podría mejorar en algunas recomendaciones.",
      calificacion: 4,
      fecha: "2025-05-08",
    },
    {
      id: 3,
      usuario: "Juan Pérez",
      comentario: "El asistente entendió perfectamente mis necesidades.",
      calificacion: 5,
      fecha: "2025-05-08",
    },
    {
      id: 4,
      usuario: "Ana Rodríguez",
      comentario: "Respuestas rápidas pero algo genéricas.",
      calificacion: 3,
      fecha: "2025-05-07",
    },
    {
      id: 5,
      usuario: "Roberto Sánchez",
      comentario: "No entendió bien lo que buscaba.",
      calificacion: 2,
      fecha: "2025-05-07",
    },
    {
      id: 6,
      usuario: "Laura Martínez",
      comentario: "Muy útil para encontrar opciones en mi zona.",
      calificacion: 5,
      fecha: "2025-05-06",
    },
    {
      id: 7,
      usuario: "Diego López",
      comentario: "Buenas recomendaciones, pero tardó en responder.",
      calificacion: 4,
      fecha: "2025-05-06",
    },
    {
      id: 8,
      usuario: "Sofía Torres",
      comentario: "Excelente atención y seguimiento.",
      calificacion: 5,
      fecha: "2025-05-05",
    },
    {
      id: 9,
      usuario: "Javier Ramírez",
      comentario: "Respuestas precisas y útiles.",
      calificacion: 5,
      fecha: "2025-05-05",
    },
    {
      id: 10,
      usuario: "Patricia Flores",
      comentario: "Experiencia regular, podría mejorar.",
      calificacion: 3,
      fecha: "2025-05-04",
    },
  ]

  // Métricas principales
  const metrics = [
    {
      title: "Calificación Promedio",
      value: (
        <div className="flex items-center gap-1">
          <span className="text-3xl font-bold">4.2</span>
          <div className="flex">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} size={18} className="text-[#FFA726] fill-[#FFA726]" />
            ))}
            <Star size={18} className="text-[#FFA726]" />
          </div>
        </div>
      ),
      description: "de 5 estrellas",
    },
    {
      title: "Total Feedback Recibido",
      value: "1,245",
      description: "+12% vs mes anterior",
    },
    {
      title: "Tasa de Respuesta",
      value: "98%",
      description: "Tiempo promedio: 2.5 min",
    },
  ]

  // Columnas para la tabla
  const columns = [
    { header: "Usuario", accessor: "usuario" },
    { header: "Comentario", accessor: "comentario" },
    {
      header: "Calificación",
      accessor: "calificacion",
      cell: (value: number) => {
        return (
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={`${i < value ? "text-[#FFA726] fill-[#FFA726]" : "text-gray-500"}`} />
            ))}
          </div>
        )
      },
    },
    { header: "Fecha", accessor: "fecha" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Feedback y Calificación del Agente</h1>
        <p className="text-gray-400">Análisis de la satisfacción de los usuarios con el asistente virtual</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 hover:border-[#FFA726] transition-all hover:shadow-lg hover:shadow-[#FFA726]/5 hover:-translate-y-1"
          >
            <h3 className="text-gray-400 text-sm font-medium mb-2">{metric.title}</h3>
            <div className="mb-1">
              {typeof metric.value === "string" ? (
                <p className="text-3xl font-bold text-white">{metric.value}</p>
              ) : (
                metric.value
              )}
            </div>
            <p className="text-xs text-gray-400">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doughnut chart */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Distribución de Feedback</h3>
          <div className="h-[350px] flex items-center justify-center">
            <DoughnutChart data={doughnutData} />
          </div>
        </div>

        {/* Trendline chart */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Evolución Semanal del Feedback</h3>
          <div className="h-[350px]">
            <TrendlineChart data={trendlineData} />
          </div>
        </div>
      </div>

      {/* Tabla de feedback */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Últimos Feedback Recibidos</h3>
        <Table data={feedbackData} columns={columns} />
      </div>

      {/* Estadísticas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 flex items-center gap-4">
          <div className="bg-[#66BB6A]/20 p-3 rounded-lg">
            <ThumbsUp className="text-[#66BB6A]" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Tasa de Satisfacción</p>
            <p className="text-2xl font-bold text-white">92%</p>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 flex items-center gap-4">
          <div className="bg-[#FFA726]/20 p-3 rounded-lg">
            <MessageSquare className="text-[#FFA726]" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Comentarios Positivos</p>
            <p className="text-2xl font-bold text-white">846</p>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 flex items-center gap-4">
          <div className="bg-[#42A5F5]/20 p-3 rounded-lg">
            <Star className="text-[#42A5F5]" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Calificaciones 5 Estrellas</p>
            <p className="text-2xl font-bold text-white">68%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
