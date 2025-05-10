"use client"

import React, { useState, useEffect } from "react"
import { MessageSquare, Home, UserCheck, Building2, BrainCircuit, ThumbsUp, TrendingUp, FileDown } from "lucide-react"
import { getCurrentUser } from "../../lib/supabase-client"

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
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    initials: string;
  }>({
    name: "Cargando...",
    email: "cargando@ejemplo.com",
    initials: "..."
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          // Obtener el nombre del usuario o usar el email como fallback
          const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario';
          
          // Generar iniciales del nombre
          let initials = 'U';
          if (user.user_metadata?.name) {
            const nameParts = user.user_metadata.name.split(' ');
            if (nameParts.length > 1) {
              initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
            } else {
              initials = nameParts[0].substring(0, 2).toUpperCase();
            }
          } else if (user.email) {
            initials = user.email.substring(0, 2).toUpperCase();
          }
          
          setUserData({
            name: userName,
            email: user.email || 'Sin correo',
            initials: initials
          });
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    
    fetchUserData();
  }, []);

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
        <div className="flex items-center gap-3 px-2  py-2">
          <div className="w-8 h-8 rounded-full bg-[#FFA726] text-black flex items-center justify-center">
            <span className="text-sm font-medium">{userData.initials}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">{userData.name}</p>
            <p className="text-xs text-gray-400">{userData.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
