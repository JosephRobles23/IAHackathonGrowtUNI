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

interface StackedBarChartProps {
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

export default function StackedBarChart({ data }: StackedBarChartProps) {
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
        stacked: true,
        grid: {
          color: "#2A2A2A",
          drawBorder: false,
        },
        ticks: {
          color: "#CCCCCC",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: "#2A2A2A",
          drawBorder: false,
        },
        ticks: {
          color: "#CCCCCC",
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  }

  return <Bar options={options} data={data} />
}
