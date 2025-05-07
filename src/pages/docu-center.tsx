import React, { useState, useRef } from 'react';
import { Upload, File, FileText, X, Trash2, Edit2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Componentes básicos
const Button = ({ children, variant = "default", className = "", onClick, ...props }) => {
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

const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

const Progress = ({ value, className = "", indicatorClassName = "" }) => {
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div
        className={`h-full w-full flex-1 bg-[#FF9800] transition-all ${indicatorClassName}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
};

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="z-10 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">{children}</div>
    </div>
  );
};

// Tipos
interface FileDocument {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
}

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

// DocuCenter componente principal
const DocuCenter = () => {
  // Estados para el área de carga de archivos
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados para la tabla de documentos
  const [documents, setDocuments] = useState<FileDocument[]>([
    { id: 1, name: "Informe Anual 2023.pdf", type: "pdf", size: "2.4 MB", date: "2023-12-15" },
    { id: 2, name: "Contrato de Servicio.docx", type: "docx", size: "1.8 MB", date: "2023-11-28" },
    { id: 3, name: "Notas de Reunión.txt", type: "txt", size: "0.3 MB", date: "2023-12-05" },
    { id: 4, name: "Presentación Proyecto.pdf", type: "pdf", size: "5.2 MB", date: "2023-12-10" },
    { id: 5, name: "Presupuesto 2024.docx", type: "docx", size: "1.1 MB", date: "2023-12-18" },
    { id: 6, name: "Lista de Tareas.txt", type: "txt", size: "0.1 MB", date: "2023-12-01" },
    { id: 7, name: "Manual de Usuario.pdf", type: "pdf", size: "3.7 MB", date: "2023-11-15" },
    { id: 8, name: "Propuesta Cliente.docx", type: "docx", size: "2.3 MB", date: "2023-12-08" },
    { id: 9, name: "Registro de Cambios.txt", type: "txt", size: "0.5 MB", date: "2023-12-12" },
    { id: 10, name: "Análisis de Mercado.pdf", type: "pdf", size: "4.1 MB", date: "2023-11-20" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingDocument, setEditingDocument] = useState<{ id: number; name: string } | null>(null);
  const [newName, setNewName] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null);

  // Estados para el gráfico
  const [chartData, setChartData] = useState<ChartItem[]>([
    { name: "PDF", value: 4, color: "#FF5252" },
    { name: "DOCX", value: 3, color: "#448AFF" },
    { name: "TXT", value: 3, color: "#BDBDBD" },
  ]);

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

  const uploadFiles = () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);

          // Add uploaded files to documents
          const newDocuments = files.map((file, index) => ({
            id: documents.length + index + 1,
            name: file.name,
            type: file.name.split(".").pop()?.toLowerCase() || '',
            size: `${(file.size / 1024).toFixed(1)} KB`,
            date: new Date().toISOString().split("T")[0],
          }));

          setDocuments([...documents, ...newDocuments]);

          // Update chart data
          updateChartData([...documents, ...newDocuments]);

          // Clear files
          setTimeout(() => {
            setFiles([]);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Funciones para la tabla de documentos
  const documentsPerPage = 5;

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "docx":
      case "doc":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "txt":
        return <File className="h-5 w-5 text-gray-400" />;
      default:
        return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleEdit = (id: number, name: string) => {
    setEditingDocument({ id, name });
    setNewName(name);
    setIsEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (!editingDocument) return;

    setDocuments(documents.map((doc) => (doc.id === editingDocument.id ? { ...doc, name: newName } : doc)));

    setIsEditDialogOpen(false);
    setEditingDocument(null);
  };

  const openDeleteDialog = (id: number) => {
    setDocumentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!documentToDelete) return;

    const newDocuments = documents.filter((doc) => doc.id !== documentToDelete);
    setDocuments(newDocuments);
    updateChartData(newDocuments);

    setIsDeleteDialogOpen(false);
    setDocumentToDelete(null);
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
                        <p className="text-sm text-gray-500 dark:text-gray-400">Subiendo... {progress}%</p>
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
                      className="pl-8 bg-white dark:bg-[#131631] border-gray-300 dark:border-gray-700 text-gray-200"
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
                            No se encontraron documentos
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
            </div>
          </div>
        </div>
      </main>

      {/* Diálogo de edición */}
      <Dialog isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Editar nombre del documento</h3>
          <div className="py-4">
            <Input
              value={newName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
              className="bg-white dark:bg-[#131631] border-gray-300 dark:border-gray-700"
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