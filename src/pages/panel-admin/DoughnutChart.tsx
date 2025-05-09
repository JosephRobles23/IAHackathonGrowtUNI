import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
  data: {
    labels: string[]
    datasets: {
      data: number[]
      backgroundColor: string[]
      borderColor?: string
      borderWidth?: number
    }[]
  }
}

export default function DoughnutChart({ data }: DoughnutChartProps) {
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#FFFFFF",
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#1E1E1E",
        titleColor: "#FFFFFF",
        bodyColor: "#CCCCCC",
        borderColor: "#2A2A2A",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw as number
            const total = context.dataset.data.reduce((acc: number, data: number) => acc + data, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${percentage}%`
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: "easeOutQuart",
    },
  }

  return <Doughnut options={options} data={data} />
}
