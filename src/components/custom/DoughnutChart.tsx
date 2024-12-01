'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {

  const accountsNames = accounts.map(acc => acc.name)
  const balances = accounts.map(acc => acc.currentBalance)
  const data = {
    labels: accountsNames,
    datasets: [
      {
        label: "Banks",
        data: balances,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ]
  }
  return <Doughnut data={data} options={{
    cutout: '60%',
    plugins: {
      legend: {
        display: false
      }
    }
  }}
  />
}

export default DoughnutChart