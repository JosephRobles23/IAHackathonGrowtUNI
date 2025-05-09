"use client"

import React, { useState, ReactNode } from "react"
import SidebarMenu from "./SidebarMenu"
import VisionGeneral from "./VisionGeneral"
import InteraccionesUsuario from "./InteraccionesUsuario"
import PreferenciasUsuario from "./PreferenciasUsuario"
import PropiedadesRelevantes from "./PropiedadesRelevantes"
import ConversacionesInteligentes from "./ConversacionesInteligentes"
import FeedbackCalificacion from "./FeedbackCalificacion"
import EstadisticasConversion from "./EstadisticasConversion"
import ExportarDatos from "./ExportarDatos"

type Section =
  | "Visión General"
  | "Interacciones del Usuario"
  | "Preferencias del Usuario"
  | "Propiedades Relevantes"
  | "Conversaciones Inteligentes"
  | "Feedback y Calificación del Agente"
  | "Estadísticas de Conversión"
  | "Exportar Datos"

interface AdminLayoutProps {
  children?: ReactNode;
  initialSection?: Section;
}

export default function AdminLayout({ children, initialSection = "Visión General" }: AdminLayoutProps) {
  const [activeSection, setActiveSection] = useState<Section>(initialSection)

  const renderContent = () => {
    // Si hay children específicos, mostrarlos en lugar del contenido dinámico
    if (children) {
      return children;
    }
    
    // Renderizar el contenido según la sección activa
    switch (activeSection) {
      case "Visión General":
        return <VisionGeneral />
      case "Interacciones del Usuario":
        return <InteraccionesUsuario />
      case "Preferencias del Usuario":
        return <PreferenciasUsuario />
      case "Propiedades Relevantes":
        return <PropiedadesRelevantes />
      case "Conversaciones Inteligentes":
        return <ConversacionesInteligentes />
      case "Feedback y Calificación del Agente":
        return <FeedbackCalificacion />
      case "Estadísticas de Conversión":
        return <EstadisticasConversion />
      case "Exportar Datos":
        return <ExportarDatos />
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-2xl text-white font-medium">Sección {activeSection} en desarrollo</h1>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <SidebarMenu activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">{renderContent()}</div>
    </div>
  )
}
