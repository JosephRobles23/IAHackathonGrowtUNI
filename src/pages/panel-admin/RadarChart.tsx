import { Radar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface RadarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth?: number
      pointBackgroundColor?: string
      pointBorderColor?: string
      pointHoverBackgroundColor?: string
      pointHoverBorderColor?: string
    }[]
  }
}

export default function RadarChart({ data }: RadarChartProps) {
  const options: ChartOptions<"radar"> = {
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
      r: {
        angleLines: {
          color: "#2A2A2A",
        },
        grid: {
          color: "#2A2A2A",
        },
        pointLabels: {
          color: "#CCCCCC",
          font: {
            size: 11,
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "#CCCCCC",
        },
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
  }

  return <Radar data={data} options={options} />
}
