import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface LineChartProps {
  title: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
    }[]
  }
}

export default function LineChart({ title, data }: LineChartProps) {
  const options: ChartOptions<"line"> = {
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
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
