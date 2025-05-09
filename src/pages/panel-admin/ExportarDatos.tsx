"use client"

import { useState } from "react"
import { Database, Calendar, FileSpreadsheet, FileText, Download, FileDown, Loader2 } from "lucide-react"

export default function ExportarDatos() {
  const [generatingReport, setGeneratingReport] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFormat, setSelectedFormat] = useState<"excel" | "pdf" | "csv">("excel")

  // Datos simulados para las métricas principales
  const metrics = [
    {
      title: "Total de Registros Descargables",
      value: "12,845",
      icon: Database,
      description: "Actualizado hace 2 horas",
    },
    {
      title: "Última Descarga Realizada",
      value: "05/09/2025 - 10:45",
      icon: Calendar,
      description: "Por: Admin DepaseoX",
    },
  ]

  // Datos simulados para la tabla de archivos disponibles
  const archivos = [
    {
      id: 1,
      nombre: "Reporte_Conversaciones_Mayo2025",
      tipo: "excel",
      fecha: "05/05/2025",
      tamaño: "2.4 MB",
    },
    {
      id: 2,
      nombre: "Reporte_Usuarios_Activos_Mayo2025",
      tipo: "pdf",
      fecha: "05/05/2025",
      tamaño: "1.8 MB",
    },
    {
      id: 3,
      nombre: "Reporte_Propiedades_Mayo2025",
      tipo: "excel",
      fecha: "05/05/2025",
      tamaño: "3.2 MB",
    },
    {
      id: 4,
      nombre: "Reporte_Feedback_Mayo2025",
      tipo: "csv",
      fecha: "05/05/2025",
      tamaño: "1.1 MB",
    },
    {
      id: 5,
      nombre: "Reporte_Conversiones_Abril2025",
      tipo: "excel",
      fecha: "30/04/2025",
      tamaño: "2.8 MB",
    },
    {
      id: 6,
      nombre: "Reporte_Usuarios_Activos_Abril2025",
      tipo: "pdf",
      fecha: "30/04/2025",
      tamaño: "1.7 MB",
    },
    {
      id: 7,
      nombre: "Reporte_Propiedades_Abril2025",
      tipo: "excel",
      fecha: "30/04/2025",
      tamaño: "3.0 MB",
    },
    {
      id: 8,
      nombre: "Reporte_Feedback_Abril2025",
      tipo: "csv",
      fecha: "30/04/2025",
      tamaño: "1.0 MB",
    },
  ]

  // Datos simulados para las opciones de exportación
  const exportOptions = [
    {
      id: "excel",
      name: "Excel",
      icon: FileSpreadsheet,
      description: "Exportar datos en formato Excel (.xlsx)",
      color: "#1D6F42",
    },
    {
      id: "pdf",
      name: "PDF",
      icon: FileText,
      description: "Exportar datos en formato PDF (.pdf)",
      color: "#F40F02",
    },
    {
      id: "csv",
      name: "CSV",
      icon: FileDown,
      description: "Exportar datos en formato CSV (.csv)",
      color: "#FFA726",
    },
  ]

  // Función para simular la generación de un reporte
  const handleGenerateReport = () => {
    setGeneratingReport(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setGeneratingReport(false)
            setProgress(0)
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 300)
  }

  // Función para renderizar el icono según el tipo de archivo
  const renderFileIcon = (tipo: string) => {
    switch (tipo) {
      case "excel":
        return <FileSpreadsheet className="text-[#1D6F42]" size={20} />
      case "pdf":
        return <FileText className="text-[#F40F02]" size={20} />
      case "csv":
        return <FileDown className="text-[#FFA726]" size={20} />
      default:
        return <FileText className="text-gray-400" size={20} />
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Exportar Datos / Descarga</h1>
        <p className="text-gray-400">Genera y descarga reportes de datos de la plataforma</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 hover:border-[#FFA726] transition-all hover:shadow-lg hover:shadow-[#FFA726]/5"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#2A2A2A] p-3 rounded-lg">
                <metric.icon className="text-[#FFA726]" size={24} />
              </div>
              <div>
                <h3 className="text-gray-400 text-sm font-medium mb-1">{metric.title}</h3>
                <p className="text-xl font-bold text-white">{metric.value}</p>
                <p className="text-xs text-gray-400 mt-1">{metric.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Opciones de exportación */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Generar Nuevo Reporte</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {exportOptions.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFormat === option.id
                  ? `border-[${option.color}] bg-[${option.color}]/10`
                  : "border-[#2A2A2A] hover:border-gray-500"
              }`}
              onClick={() => setSelectedFormat(option.id as "excel" | "pdf" | "csv")}
            >
              <div className="flex items-center gap-3">
                <option.icon style={{ color: option.color }} size={24} />
                <span className="font-medium text-white">{option.name}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">{option.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <button
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
              generatingReport
                ? "bg-[#2A2A2A] text-gray-400 cursor-not-allowed"
                : "bg-[#FFA726] text-black hover:bg-[#FF9800]"
            }`}
            onClick={handleGenerateReport}
            disabled={generatingReport}
          >
            {generatingReport ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generando Reporte...
              </>
            ) : (
              <>
                <Download size={20} />
                Generar Reporte
              </>
            )}
          </button>

          {generatingReport && (
            <div className="flex-1 w-full">
              <div className="h-2 w-full bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFA726] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">{Math.round(progress)}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de archivos disponibles */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Archivos Disponibles</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Nombre</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Tipo</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Fecha</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Tamaño</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Acción</th>
              </tr>
            </thead>
            <tbody>
              {archivos.map((archivo) => (
                <tr
                  key={archivo.id}
                  className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {renderFileIcon(archivo.tipo)}
                      <span className="font-medium text-white">{archivo.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white capitalize">{archivo.tipo}</td>
                  <td className="py-3 px-4 text-white">{archivo.fecha}</td>
                  <td className="py-3 px-4 text-white">{archivo.tamaño}</td>
                  <td className="py-3 px-4">
                    <button className="p-2 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] transition-colors">
                      <Download size={18} className="text-[#FFA726]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de ayuda */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-2">Información de Exportación</h3>
        <p className="text-gray-400 text-sm mb-4">
          Los reportes generados contienen datos sensibles de la plataforma. Por favor, asegúrate de manejarlos con
          confidencialidad y siguiendo las políticas de privacidad de la empresa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#2A2A2A] p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Reportes Diarios</h4>
            <p className="text-gray-400 text-xs">
              Contienen información detallada de las actividades del día anterior. Se generan automáticamente a las 3:00
              AM.
            </p>
          </div>
          <div className="bg-[#2A2A2A] p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Reportes Semanales</h4>
            <p className="text-gray-400 text-xs">
              Resumen de actividades de la semana. Se generan automáticamente cada lunes a las 5:00 AM.
            </p>
          </div>
          <div className="bg-[#2A2A2A] p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Reportes Mensuales</h4>
            <p className="text-gray-400 text-xs">
              Análisis completo del mes. Se generan automáticamente el primer día de cada mes a las 7:00 AM.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
