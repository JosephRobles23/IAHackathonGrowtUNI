import type React from "react"

interface Column {
  header: string
  accessor: string
  cell?: (value: any) => React.ReactNode
}

interface TableProps {
  data: any[]
  columns: Column[]
}

export default function Table({ data, columns }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2A2A2A]">
            {columns.map((column) => (
              <th key={column.accessor} className="text-left py-3 px-4 text-gray-400 font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#2A2A2A] transition-colors">
              {columns.map((column) => (
                <td key={`${rowIndex}-${column.accessor}`} className="py-3 px-4 text-white">
                  {column.cell ? column.cell(row[column.accessor]) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
