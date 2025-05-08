import React, { useState, useRef, useEffect } from 'react';
import { Upload, File, FileText, X, Trash2, Edit2, Search, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { supabase, getCurrentUser } from '../lib/supabase-client';
import type { UserData } from '../lib/supabase-client';

// Interfaces y tipos
interface FileDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  description?: string;
  folder_path?: string;
  status?: string;
}

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

interface FileReference {
  id: string;
  created_at: string;
  name: string;
  description: string;
  file_extension: string;
  size_bytes: number;
  status: string;
  updated_at: string;
  folder_path: string;
  user_id: string;
  folder_id: string;
}

// Componentes básicos
const Button = ({ children, variant = "default", className = "", onClick, ...props }: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "destructive";
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown;
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-[#FF9800] text-black hover:bg-[#F57C00]",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Progress = ({ value, className = "", indicatorClassName = "" }: {
  value: number;
  className?: string;
  indicatorClassName?: string;
}) => {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className={`h-full w-full flex-1 bg-[#FF9800] transition-all ${indicatorClassName}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
};

const Dialog = ({ isOpen, onClose, children }: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="z-10 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">{children}</div>
    </div>
  );
};

// DocuCenter componente principal
const DocuCenter = () => {
  // Estado para el usuario
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para el área de carga de archivos
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados para la tabla de documentos
  const [documents, setDocuments] = useState<FileDocument[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDocument, setEditingDocument] = useState<{ id: string; name: string } | null>(null);
  const [newName, setNewName] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

  // Estados para el gráfico
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  // Obtener el usuario actual y sus documentos
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        
        if (userData) {
          fetchUserDocuments(userData.id);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setError("Error al autenticar. Por favor, inicia sesión nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  // Obtener documentos del usuario desde Supabase
  const fetchUserDocuments = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("file_references")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedDocs: FileDocument[] = data.map((doc: FileReference) => ({
          id: doc.id,
          name: doc.name,
          type: getShortType(doc.file_extension),
          size: formatBytes(doc.size_bytes),
          date: doc.created_at,
          description: doc.description,
          folder_path: doc.folder_path,
          status: doc.status
        }));

        setDocuments(formattedDocs);
        updateChartData(formattedDocs);
      }
    } catch (error) {
      console.error("Error al obtener documentos:", error);
      setError("Error al cargar los documentos. Por favor, intenta nuevamente.");
    }
  };

  // Formatear bytes a un formato legible
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Funciones para el área de carga de archivos
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFiles = (fileList: FileList | null): File[] => {
    if (!fileList) return [];

    const validFiles: File[] = [];
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    Array.from(fileList).forEach((file) => {
      if (validTypes.includes(file.type)) {
        validFiles.push(file);
      } else {
        setError(`El archivo "${file.name}" no es un formato válido. Solo se aceptan PDF, DOC, DOCX y TXT.`);
      }
    });

    return validFiles;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const validFiles = validateFiles(e.dataTransfer.files);
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      setError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validFiles = validateFiles(e.target.files);
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      setError(null);
    }

    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Subir archivos al endpoint de Google Drive y guardar referencias en Supabase
  const uploadFiles = async () => {
    if (files.length === 0 || !user) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        
        // Calcular progreso por archivo
        const fileProgress = (i / files.length) * 100;
        setProgress(fileProgress);

        // Llamar al endpoint externo para subir a Google Drive
        const response = await fetch('https://starfish-app-de9zs.ondigitalocean.app/google-drive', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error al subir el archivo ${file.name}`);
        }

        const result = await response.json();

        if (result.success) {
          // Guardar referencia en Supabase
          const { error: insertError } = await supabase
            .from('file_references')
            .insert({
              name: result.file.name,
              description: result.file.description || `Archivo subido a Google Drive`,
              file_extension: result.file.file_extension,
              size_bytes: result.file.size_bytes,
              status: result.file.status,
              folder_id: result.drive_info.folder_id,
              folder_path: result.drive_info.folder_path,
              user_id: user.id
            });

          if (insertError) {
            throw insertError;
          }
        } else {
          throw new Error(result.message || 'Error en la respuesta del servidor');
        }
      }

      // Cuando se completa, actualizar la lista de documentos
      setProgress(100);
      setTimeout(() => {
        fetchUserDocuments(user.id);
        setFiles([]);
        setUploading(false);
      }, 500);

    } catch (error) {
      console.error("Error al subir archivos:", error);
      setError(error instanceof Error ? error.message : "Error al subir los archivos");
      setUploading(false);
    }
  };

  // Funciones para la tabla de documentos
  const documentsPerPage = 5;

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return (
          <div className="h-6 w-6 flex items-center justify-center rounded bg-red-500 text-white">
            <FileText className="h-4 w-4" />
          </div>
        );
      case "docx":
      case "doc":
        return (
          <div className="h-6 w-6 flex items-center justify-center rounded bg-blue-500 text-white">
            <FileText className="h-4 w-4" />
          </div>
        );
      case "txt":
        return (
          <div className="h-6 w-6 flex items-center justify-center rounded bg-gray-500 text-white">
            <File className="h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="h-6 w-6 flex items-center justify-center rounded bg-gray-500 text-white">
            <File className="h-4 w-4" />
          </div>
        );
    }
  };

  const handleEdit = (id: string, name: string) => {
    setEditingDocument({ id, name });
    setNewName(name);
    setIsEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!editingDocument || !user) return;

    try {
      const { error } = await supabase
        .from('file_references')
        .update({ name: newName })
        .eq('id', editingDocument.id)
        .eq('user_id', user.id);

      if (error) throw error;

      // Actualizar localmente
      setDocuments(documents.map((doc) => (doc.id === editingDocument.id ? { ...doc, name: newName } : doc)));

      setIsEditDialogOpen(false);
      setEditingDocument(null);
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
      setError("Error al actualizar el nombre del documento");
    }
  };

  const openDeleteDialog = (id: string) => {
    setDocumentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!documentToDelete || !user) return;

    try {
      const { error } = await supabase
        .from('file_references')
        .delete()
        .eq('id', documentToDelete)
        .eq('user_id', user.id);

      if (error) throw error;

      // Actualizar localmente
      const newDocuments = documents.filter((doc) => doc.id !== documentToDelete);
      setDocuments(newDocuments);
      updateChartData(newDocuments);

      setIsDeleteDialogOpen(false);
      setDocumentToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
      setError("Error al eliminar el documento");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Funciones para el gráfico
  const updateChartData = (docs: FileDocument[]) => {
    const types: Record<string, number> = {};

    docs.forEach((doc) => {
      const type = doc.type.toUpperCase();
      types[type] = (types[type] || 0) + 1;
    });

    const colors: Record<string, string> = {
      PDF: "#FF5252",
      DOCX: "#448AFF",
      DOC: "#448AFF",
      TXT: "#BDBDBD",
    };

    const newChartData = Object.keys(types).map((type) => ({
      name: type,
      value: types[type],
      color: colors[type] || "#BDBDBD",
    }));

    setChartData(newChartData);
  };

  const totalDocuments = chartData.reduce((sum, item) => sum + item.value, 0);

  const getShortType = (mimeOrExt: string) => {
    if (!mimeOrExt) return 'DESCONOCIDO';
    if (mimeOrExt.includes('pdf') || mimeOrExt.toLowerCase() === 'pdf') return 'PDF';
    if (mimeOrExt.includes('word') || mimeOrExt.toLowerCase() === 'docx' || mimeOrExt.toLowerCase() === 'doc') return 'DOCX';
    if (mimeOrExt.includes('plain') || mimeOrExt.toLowerCase() === 'txt' || mimeOrExt.includes('text')) return 'TXT';
    return mimeOrExt.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 dark:bg-dark-bg flex items-center justify-center">
        <p className="text-xl text-gray-800 dark:text-white">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 dark:bg-dark-bg flex flex-col items-center justify-center p-4">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Acceso Denegado</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
          Debes iniciar sesión para acceder a DocuCenter. Por favor, inicia sesión y vuelve a intentarlo.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 dark:bg-dark-bg">
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">DocuCenter</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            
            {/* Área de carga de archivos */}
            <div className="bg-white dark:bg-[#111827] rounded-lg p-6 mb-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Subir Documentos</h3>

              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    isDragging ? "border-[#FF9800] bg-[#FF9800]/10" : "border-gray-300 dark:border-gray-700"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Arrastra y suelta tus documentos</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    O{" "}
                    <button className="text-[#FF9800] hover:underline" onClick={() => fileInputRef.current?.click()}>
                      selecciona archivos
                    </button>{" "}
                    desde tu dispositivo
                  </p>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX, TXT (Máx. 10MB por archivo)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {error && (
                  <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-2 rounded">{error}</div>
                )}

                {files.length > 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-[#131631] p-3 rounded">
                          <div className="flex items-center">
                            <File className="h-5 w-5 mr-2 text-[#FF9800]" />
                            <div>
                              <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs text-gray-900 dark:text-white">{file.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {uploading ? (
                      <div className="space-y-2">
                        <Progress value={progress} />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Subiendo... {progress.toFixed(0)}%</p>
                      </div>
                    ) : (
                      <Button onClick={uploadFiles} className="w-full bg-[#FF9800] text-black hover:bg-[#F57C00]">
                        Subir {files.length} {files.length === 1 ? "archivo" : "archivos"}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tabla de documentos */}
            <div className="bg-white dark:bg-[#111827] rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Mis Documentos</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Buscar documentos..."
                      className="pl-8 bg-white dark:bg-[#131631] border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200"
                      value={searchTerm}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#131631]">
                        <th className="text-left p-3 text-gray-500 dark:text-gray-300">Nombre</th>
                        <th className="text-left p-3 text-gray-500 dark:text-gray-300">Tipo</th>
                        <th className="text-left p-3 text-gray-500 dark:text-gray-300">Tamaño</th>
                        <th className="text-left p-3 text-gray-500 dark:text-gray-300">Fecha</th>
                        <th className="text-right p-3 text-gray-500 dark:text-gray-300">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDocuments.length > 0 ? (
                        currentDocuments.map((doc) => (
                          <tr key={doc.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#222a45]">
                            <td className="p-3 font-medium">
                              <div className="flex items-center gap-2">
                                {getDocumentIcon(doc.type)}
                                <span className="truncate max-w-[200px] sm:max-w-xs text-gray-900 dark:text-white">{doc.name}</span>
                              </div>
                            </td>
                            <td className="p-3 uppercase text-xs text-gray-700 dark:text-gray-300">{doc.type}</td>
                            <td className="p-3 text-gray-700 dark:text-gray-300">{doc.size}</td>
                            <td className="p-3 text-gray-700 dark:text-gray-300">{formatDate(doc.date)}</td>
                            <td className="p-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#2a325a]"
                                  onClick={() => handleEdit(doc.id, doc.name)}
                                >
                                  <Edit2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                </button>
                                <button
                                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#2a325a]"
                                  onClick={() => openDeleteDialog(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-6 text-gray-500 dark:text-gray-400">
                            {loading ? "Cargando documentos..." : "No se encontraron documentos"}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {filteredDocuments.length > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Mostrando {indexOfFirstDocument + 1}-{Math.min(indexOfLastDocument, filteredDocuments.length)} de{" "}
                      {filteredDocuments.length} documentos
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        className="p-2 h-8 w-8 flex items-center justify-center border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Página {currentPage} de {totalPages || 1}
                      </span>
                      <Button
                        variant="outline"
                        className="p-2 h-8 w-8 flex items-center justify-center border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gráfico circular */}
          <div className="bg-white dark:bg-[#111827] rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Resumen de Documentos</h3>

            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-4xl font-bold text-[#FF9800]">{totalDocuments}</h4>
                <p className="text-gray-500 dark:text-gray-400">Documentos totales</p>
              </div>

              {totalDocuments > 0 ? (
                <>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white dark:bg-[#131631] border border-gray-200 dark:border-gray-800 rounded-md p-2 shadow-md">
                                  <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Tipo</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{data.name}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cantidad</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{data.value} documentos</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Porcentaje</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{((data.value / totalDocuments) * 100).toFixed(1)}%</span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          formatter={(value, entry, index) => {
                            const item = chartData[index];
                            return (
                              <span className="text-sm text-gray-900 dark:text-white">
                                {value} ({item.value})
                              </span>
                            );
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {chartData.map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: item.color }} />
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{((item.value / totalDocuments) * 100).toFixed(1)}%</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No hay documentos para mostrar. Sube tu primer documento para ver estadísticas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Diálogo de edición */}
      <Dialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white ">Editar nombre del documento</h3>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
              className="bg-white dark:bg-[#131631] border-gray-300 dark:border-gray-700 dark:text-gray-200"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="text-gray-800 dark:text-white p-2">
              Cancelar
            </Button>
            <Button className="bg-[#FF9800] text-black hover:bg-[#F57C00] p-2" onClick={saveEdit}>
              Guardar
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Diálogo de eliminación */}
      <Dialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Confirmar eliminación</h3>
          <div className="py-4">
            <p className="text-gray-800 dark:text-white">¿Estás seguro de que deseas eliminar este documento?</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Esta acción no se puede deshacer.</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="text-gray-800 dark:text-white p-2">
              Cancelar
            </Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white p-2" onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DocuCenter; 