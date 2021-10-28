import React from 'react'
import { createPortfolioConsumer } from '../../../../context/portfolioContext';
import { Line } from "react-chartjs-2";

const VisitBox = () => {

    const data = {
        labels: ['10/16', '10/17', '10/18', '10/19', '10/20', '10/21', '10/22'],
        datasets: [
          {
            label: '방문자',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    //tooltips 사용시
        tooltips: {
          enabled: true,
          mode: "nearest",
          position: "average",
          intersect: false,
        },
        plugins : {
            legend : {
                display:false,
            }
        },
      };
      
    return (
        <div className="visitBox dashboardBox">
            <div className="dateRange">

            </div>
            
            <Line data={data} options={options}/>
        </div>
    )
}

export default createPortfolioConsumer(VisitBox);
