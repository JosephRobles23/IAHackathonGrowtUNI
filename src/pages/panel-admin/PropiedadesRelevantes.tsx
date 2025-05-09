import { Building2 } from "lucide-react"
import HorizontalBarChart from "./HorizontalBarChart"

export default function PropiedadesRelevantes() {
  // Datos simulados para la tabla de propiedades
  const propiedades = [
    {
      id: 1,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Apartamento Moderno Centro",
      ubicacion: "Polanco, CDMX",
      precio: "$3,850,000",
      recomendaciones: 128,
    },
    {
      id: 2,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Casa con Jardín",
      ubicacion: "Coyoacán, CDMX",
      precio: "$5,200,000",
      recomendaciones: 112,
    },
    {
      id: 3,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Penthouse con Terraza",
      ubicacion: "Condesa, CDMX",
      precio: "$7,500,000",
      recomendaciones: 98,
    },
    {
      id: 4,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Oficina Corporativa",
      ubicacion: "Santa Fe, CDMX",
      precio: "$12,800,000",
      recomendaciones: 87,
    },
    {
      id: 5,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Loft Industrial",
      ubicacion: "Roma Norte, CDMX",
      precio: "$4,200,000",
      recomendaciones: 76,
    },
    {
      id: 6,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Departamento con Alberca",
      ubicacion: "Del Valle, CDMX",
      precio: "$3,950,000",
      recomendaciones: 65,
    },
    {
      id: 7,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Casa Estilo Colonial",
      ubicacion: "San Ángel, CDMX",
      precio: "$8,700,000",
      recomendaciones: 58,
    },
    {
      id: 8,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Departamento Amueblado",
      ubicacion: "Nápoles, CDMX",
      precio: "$2,950,000",
      recomendaciones: 52,
    },
    {
      id: 9,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Terreno para Desarrollo",
      ubicacion: "Interlomas, Edo. Méx",
      precio: "$15,500,000",
      recomendaciones: 47,
    },
    {
      id: 10,
      imagen: "/placeholder.svg?height=60&width=80",
      nombre: "Casa con Vista Panorámica",
      ubicacion: "Lomas de Chapultepec, CDMX",
      precio: "$18,900,000",
      recomendaciones: 43,
    },
  ]

  // Datos simulados para el gráfico de barras horizontales
  const horizontalBarData = {
    labels: ["Polanco", "Condesa", "Santa Fe", "Roma Norte", "Coyoacán", "Del Valle", "Nápoles", "San Ángel"],
    datasets: [
      {
        label: "Solicitudes",
        data: [245, 198, 176, 154, 132, 118, 95, 82],
        backgroundColor: "#FFA726",
      },
    ],
  }

  // Datos simulados para métricas adicionales
  const metricas = [
    { titulo: "Precio Promedio", valor: "$6.2M" },
    { titulo: "Tiempo Promedio en Plataforma", valor: "45 días" },
    { titulo: "Tasa de Conversión", valor: "3.8%" },
    { titulo: "Propiedades Activas", valor: "1,245" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Propiedades Relevantes</h1>
        <p className="text-gray-400">Análisis de las propiedades más solicitadas y sus características</p>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricas.map((metrica) => (
          <div
            key={metrica.titulo}
            className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 hover:border-[#FFA726] transition-all"
          >
            <h3 className="text-sm text-gray-400 mb-2">{metrica.titulo}</h3>
            <p className="text-2xl font-bold text-white">{metrica.valor}</p>
          </div>
        ))}
      </div>

      {/* Tabla de propiedades */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Top 10 Propiedades Más Solicitadas</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Propiedad</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Ubicación</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Precio</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Recomendaciones</th>
              </tr>
            </thead>
            <tbody>
              {propiedades.map((propiedad) => (
                <tr
                  key={propiedad.id}
                  className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-15 rounded overflow-hidden bg-[#2A2A2A] flex items-center justify-center">
                        <img
                          src={propiedad.imagen || "/placeholder.svg"}
                          alt={propiedad.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-white">{propiedad.nombre}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-[#FFA726]" />
                      {propiedad.ubicacion}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white font-medium">{propiedad.precio}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{propiedad.recomendaciones}</span>
                      <div className="w-24 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FFA726]"
                          style={{
                            width: `${(propiedad.recomendaciones / propiedades[0].recomendaciones) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de barras horizontales */}
      <div>
        <HorizontalBarChart title="Zonas Más Solicitadas" data={horizontalBarData} />
      </div>
    </div>
  )
}
