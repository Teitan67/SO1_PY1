import React, { Component } from 'react'
import axios from 'axios';

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


export default class MonitorCpu extends Component {

    state = {
        cpu: '0',
        TimeLine:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100]
    }

    async getCpu() {
        const baseUrl = "http://localhost:4200/getCpu";
        await axios.get(baseUrl)
            .then(response => {
                let respuesta = response.data.cpu;
                respuesta = 100 - respuesta;
                this.state.TimeLine.unshift(respuesta);
                if(this.state.TimeLine.lenght>20){
                    this.state.TimeLine.pop();
                }
                
                this.setState({ cpu: respuesta.toFixed(1) });
                this.setState({ TimeLine: this.state.TimeLine});
                
                
                //Grafica.data.datasets[0].data=this.state.TimeLine;
                

            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        setInterval(() => {
            this.getCpu();
        }, 1500);

    }


    render() {
        return (
            <div >
                <p className='fs-1 text-center'>
                    CPU<br />
                    {this.state.cpu}%
                </p>
                <Line
                    id='Grafica'
                    data={{
                        labels: ['','','','','','','','','','','','','','','','','','','',''],
                        datasets: [
                            {
                                label: "Uso de cpu",
                                data:this.state.TimeLine,
                                borderColor: "#00b8ff"

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
