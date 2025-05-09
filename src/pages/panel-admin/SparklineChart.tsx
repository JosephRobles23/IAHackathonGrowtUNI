import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

interface SparklineChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      fill?: boolean
      tension?: number
    }[]
  }
}

export default function SparklineChart({ data }: SparklineChartProps) {
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
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
    animation: {
      duration: 2000,
      easing: "easeOutQuart",
    },
  }

  return <Line options={options} data={data} />
}
