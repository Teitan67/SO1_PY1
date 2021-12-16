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


export default class MonitorRam extends Component {

    state = {
        porcentaje: '0',
        total:'0',
        ocupada:'0',
        TimeLine:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100]
    }

    async getRam() {
        const baseUrl = "http://localhost:4200/getRamInfo";
        await axios.get(baseUrl)
            .then(response => {
                let porcentaje = response.data.porcentaje;
                let total = response.data.total;
                let ocupada = response.data.ocupada;



                
                this.state.TimeLine.unshift(porcentaje);
                if(this.state.TimeLine.lenght>20){
                    this.state.TimeLine.pop();
                }
                
                this.setState({ porcentaje: porcentaje});
                this.setState({ total: total});
                this.setState({ ocupada: ocupada});

                this.setState({ TimeLine: this.state.TimeLine});
                
                
                //Grafica.data.datasets[0].data=this.state.TimeLine;
                

            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        setInterval(() => {
            this.getRam();
        }, 1500);

    }


    render() {
        return (
            <div >
                <p className='fs-1 text-center'>
                    
                    Total : {this.state.total} mb<br />
                    Ocupada : {this.state.ocupada} mb<br />
                    RAM : {this.state.porcentaje}%<br />
                </p>
                <Line
                    id='Grafica'
                    data={{
                        labels: ['','','','','','','','','','','','','','','','','','','',''],
                        datasets: [
                            {
                                label: "Uso de RAM",
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
