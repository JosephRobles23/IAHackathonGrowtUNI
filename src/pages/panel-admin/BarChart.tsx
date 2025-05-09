import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  title: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor?: string
      borderWidth?: number
    }[]
  }
}

export default function BarChart({ title, data }: BarChartProps) {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1E1E1E",
        titleColor: "#FFFFFF",
        bodyColor: "#CCCCCC",
        borderColor: "#2A2A2A",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#2A2A2A",
          drawBorder: false,
        },
        ticks: {
          color: "#CCCCCC",
        },
      },
      y: {
        grid: {
          color: "#2A2A2A",
          drawBorder: false,
        },
        ticks: {
          color: "#CCCCCC",
        },
      },
    },
  }

  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-6">
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <div className="h-[300px]">
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}
