import { Purchase } from '../../types/api';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';

function BarChart({ data }: { data: Purchase[] }) {
  const state = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: data.map((val) => {
          const [start, end] = val.range
            .split('-')
            .map((v) => Number(v.trim()));
          const fmt = (n: number) => n.toLocaleString('ko-KR');
          return `${fmt(start)} ~ ${fmt(end)}원`;
        }),
      },
    },
    series: [
      {
        name: '구매건수',
        data: data.map((val) => val.count),
      },
    ],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
}

export default BarChart;
