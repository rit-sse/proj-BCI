import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const chartSize = {
  width: 250,
  height: 250
};

const chartOptions = {
  responsive: false,
  tooltips: { enabled: false },
  legend: { display: false },
  plugins: {
    datalabels: {
      display: true,
      color: 'white'
    }
  }
};

function Visualization(props) {
  return (
    <React.Fragment>
      <Bar
        data={{
          labels: props.labels,
          datasets: [
            {
              backgroundColor: props.backgroundColor || 'rgba(0,220,0,0.4)',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: props.data
            }
          ]
        }}
        options={{
          ...chartOptions
        }}
        {...chartSize}
      />
    </React.Fragment>
  );
}

export default Visualization;
