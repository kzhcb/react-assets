import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const GaugeChart = (props) => {
  const initChart = () => {
    let element = document.getElementById(props.id);
    let myChart = echarts.init(element);
    myChart.clear();
    let option;
    option = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%',
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}',
          },
          data: [
            {
              value: 50,
              name: 'SCORE',
            },
          ],
        },
      ],
    };
    option && myChart.setOption(option);
  };

  useEffect(() => {
    initChart();
  }, []);

  return (
    <div
      id={props.id}
      style={{ width: '100%', height: '100%' }}
      className={props.className}
    ></div>
  );
};

export default GaugeChart;
