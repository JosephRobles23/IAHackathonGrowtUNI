"use client"

import type React from "react"

import { MessageSquare, Home, UserCheck, Building2, BrainCircuit, ThumbsUp, TrendingUp, FileDown } from "lucide-react"

type Section =
  | "Visión General"
  | "Interacciones del Usuario"
  | "Preferencias del Usuario"
  | "Propiedades Relevantes"
  | "Conversaciones Inteligentes"
  | "Feedback y Calificación del Agente"
  | "Estadísticas de Conversión"
  | "Exportar Datos"

interface SidebarMenuProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

export default function SidebarMenu({ activeSection, onSectionChange }: SidebarMenuProps) {
  const menuItems: { icon: React.ElementType; label: Section }[] = [
    { icon: Home, label: "Visión General" },
    { icon: MessageSquare, label: "Interacciones del Usuario" },
    { icon: UserCheck, label: "Preferencias del Usuario" },
    { icon: Building2, label: "Propiedades Relevantes" },
    { icon: BrainCircuit, label: "Conversaciones Inteligentes" },
    { icon: ThumbsUp, label: "Feedback y Calificación del Agente" },
    { icon: TrendingUp, label: "Estadísticas de Conversión" },
    { icon: FileDown, label: "Exportar Datos" },
  ]

  return (
    <div className="w-72 bg-[#0F0F0F] border-r border-[#2A2A2A] flex flex-col">
      <div className="p-6 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <div className="bg-[#FFA726] text-black p-1 rounded">
            {/* <Building2 size={20} /> */}
          </div>
          <h1 className="text-xl font-bold text-white"></h1>
        </div>
        <p className="text-sm text-gray-400 mt-7">Panel Administrativo</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = activeSection === item.label
            const Icon = item.icon

            return (
              <li key={item.label}>
                <button
                  onClick={() => onSectionChange(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#1E1E1E] text-[#FFA726] border-l-4 border-[#FFA726]"
                      : "text-gray-300 hover:bg-[#1A1A1A]"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-[#FFA726]" : ""} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center">
            <span className="text-sm font-medium">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin DepaseoX</p>
            <p className="text-xs text-gray-400">admin@depaseox.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
