import React, { Component } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default class Grafica extends Component {

    
    render() {
        return (
            <div>
                <Line
                    data={{
                        labels: ['', '', '', '', '', '', '', '', '', ''],
                        datasets: [
                            {
                                label: "Uso de cpu",
                                data: [12, 19, 3, 5, 2, 3],
                                borderColor:"#122834"
                                
                            }
                        ]
                    }}
                    width={400}
                    height={150}
                />
            </div>
        )
    }
}
