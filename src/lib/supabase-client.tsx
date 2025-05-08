import { createClient } from '@supabase/supabase-js';

// Tipos para la configuración
interface UserMetadata {
  name?: string;
}

export interface UserData {
  id: string;
  email?: string;
  user_metadata?: UserMetadata;
}

// Obtener variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Verificar que las credenciales estén configuradas correctamente
console.log('Supabase URL configurada:', !!supabaseUrl);
console.log('Supabase ANON KEY configurada:', !!supabaseAnonKey);

// Funciones de utilidad para autenticación
export const getCurrentUser = async (): Promise<UserData | null> => {
  try {
    console.log('Obteniendo usuario actual...');
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Error al obtener sesión:', error);
      return null;
    }
    
    console.log('Sesión obtenida:', !!session);
    return session?.user as UserData || null;
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    return null;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    console.log('Cerrando sesión...');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error al cerrar sesión:', error);
    } else {
      console.log('Sesión cerrada exitosamente');
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

export default supabase; 