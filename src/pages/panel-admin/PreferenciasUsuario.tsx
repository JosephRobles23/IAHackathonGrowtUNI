import { Home, Building, Building2 } from "lucide-react"
import PieChart from "./PieChart"

export default function PreferenciasUsuario() {
  // Datos simulados para el gráfico de torta
  const pieChartData = {
    labels: ["Casas", "Departamentos", "Oficinas", "Terrenos"],
    datasets: [
      {
        data: [35, 45, 10, 10],
        backgroundColor: ["#FFA726", "#E0E0E0", "#64B5F6", "#81C784"],
        borderColor: "#1E1E1E",
        borderWidth: 2,
      },
    ],
  }

  // Datos simulados para palabras clave
  const keywords = [
    { text: "Moderno", count: 156 },
    { text: "Céntrico", count: 142 },
    { text: "Terraza", count: 128 },
    { text: "Amueblado", count: 115 },
    { text: "Estacionamiento", count: 98 },
    { text: "Jardín", count: 87 },
    { text: "Seguridad", count: 76 },
    { text: "Metro", count: 72 },
    { text: "Nuevo", count: 65 },
    { text: "Piscina", count: 58 },
    { text: "Vistas", count: 52 },
    { text: "Renovado", count: 48 },
    { text: "Luminoso", count: 45 },
    { text: "Económico", count: 42 },
    { text: "Amplio", count: 38 },
  ]

  // Datos simulados para zonas más buscadas
  const topZonas = [
    { nombre: "San Isidro", busquedas: 245, icon: Building },
    { nombre: "Miraflores", busquedas: 198, icon: Home },
    { nombre: "San Borja", busquedas: 176, icon: Building2 },
  ]

  // Datos simulados para preferencias adicionales
  const preferencias = [
    { categoria: "Presupuesto Promedio", valor: "$2.5M - $3.8M" },
    { categoria: "Tamaño Promedio", valor: "120m² - 180m²" },
    { categoria: "Habitaciones", valor: "3 (promedio)" },
    { categoria: "Baños", valor: "2 (promedio)" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Preferencias del Usuario</h1>
        <p className="text-gray-400">Análisis de las preferencias y tendencias de búsqueda de los usuarios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de torta */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Distribución de Intereses</h3>
          <div className="h-[300px]">
            <PieChart data={pieChartData} />
          </div>
        </div>

        {/* Top zonas más buscadas */}
        <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
          <h3 className="text-lg font-medium text-white mb-4">Top Zonas Más Buscadas</h3>
          <div className="space-y-4">
            {topZonas.map((zona, index) => {
              const Icon = zona.icon
              return (
                <div
                  key={zona.nombre}
                  className="flex items-center gap-4 p-4 rounded-lg bg-[#2A2A2A] hover:bg-[#333333] transition-all"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFA726] text-black">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-[#FFA726]" />
                      <h4 className="font-medium text-white">{zona.nombre}</h4>
                    </div>
                    <p className="text-sm text-gray-400">{zona.busquedas} búsquedas</p>
                  </div>
                  <div className="w-24 h-2 bg-[#1E1E1E] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFA726]"
                      style={{
                        width: `${(zona.busquedas / topZonas[0].busquedas) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Palabras clave más frecuentes */}
      <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
        <h3 className="text-lg font-medium text-white mb-4">Palabras Clave Más Frecuentes</h3>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => {
            // Calcular tamaño basado en la frecuencia
            const maxCount = Math.max(...keywords.map((k) => k.count))
            const minSize = 0.8
            const maxSize = 1.4
            const size = minSize + (keyword.count / maxCount) * (maxSize - minSize)

            return (
              <span
                key={keyword.text}
                className="px-3 py-1 rounded-full bg-[#2A2A2A] text-white hover:bg-[#FFA726] hover:text-black transition-colors cursor-default"
                style={{ fontSize: `${size}rem` }}
              >
                {keyword.text}
              </span>
            )
          })}
        </div>
      </div>

      {/* Preferencias adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {preferencias.map((pref) => (
          <div
            key={pref.categoria}
            className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6 hover:border-[#FFA726] transition-all"
          >
            <h3 className="text-sm text-gray-400 mb-2">{pref.categoria}</h3>
            <p className="text-xl font-bold text-white">{pref.valor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
