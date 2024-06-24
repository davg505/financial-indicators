import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CashFlowChart = ({ cashFlows }) => {
  const chartRef = useRef(null);

  const data = {
    labels: cashFlows.map(cf => cf.year),
    datasets: [
      {
        label: 'Cash Flow',
        data: cashFlows.map(cf => cf.amount),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cash Flow Chart',
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [cashFlows]);

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default CashFlowChart;
