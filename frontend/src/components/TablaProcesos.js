import React, { Component } from 'react'
import axios from 'axios';
import '../css/TableResponsive.css'



export default class TablaProcesos extends Component {

    state = {
        procesos: [],
        noEjecuciones: 0,
        noSuspendidos: 0,
        noDetenidos: 0,
        noZombies: 0,
        noDormidos: 0,
        Totales: 0,
        otros: 0,
        subProcesos: []
    }



    async getProcesos() {
        const baseUrl = "http://localhost:4200/getListaProcesos";
        await axios.get(baseUrl)
            .then(response => {
                let respuesta = response.data;
                this.setState({ procesos: respuesta });
            })
            .catch(error => {
                console.log(error);
            })
    }

    async killProcess(proceso) {
        const baseUrl = "http://localhost:4200/killProcess";
        if (proceso) {
            if (proceso.id) {
                await axios.get(baseUrl, { params: { id: proceso.id } })
                    .then(response => {
                        let respuesta = response.data;
                        this.setState({ procesos: respuesta });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }

    }
    calcularTotales() {
        let ejecuciones = 0;
        let suspendidos = 0;
        let detenidos = 0;
        let zombiez = 0;
        let totales = 0;
        let dormidos = 0;
        let otros = 0;

        let procesos = this.state.procesos;
        for (const proceso of procesos) {
            if (proceso) {


                if (proceso.estado === 0) {

                    ejecuciones++;
                } else if (proceso.estado === 1) {
                    suspendidos++;
                } else if (proceso.estado === 8) {
                    detenidos++;
                } else if (proceso.estado === 4) {
                    zombiez++;
                } else if (proceso.estado === 1026) {
                    dormidos++;
                }

            }
        }
        totales = suspendidos + detenidos + zombiez + ejecuciones + dormidos + otros;
        this.setState({ noEjecuciones: ejecuciones });
        this.setState({ noSuspendidos: suspendidos });
        this.setState({ noDetenidos: detenidos });
        this.setState({ noZombies: zombiez });
        this.setState({ Totales: totales });
        this.setState({ noDormidos: dormidos });
        this.setState({ otros: otros });
    }

    componentDidMount() {
        setInterval(() => {
            this.getProcesos();
            this.calcularTotales();
        }, 1000);

    }
    getSubProcesos(subProcesosId) {
        let display = [];
        if (subProcesosId) {
            for (const id of subProcesosId) {
                for (const porceso of this.state.procesos) {
                    if (porceso.id === id) {
                        display.unshift(porceso);
                        break;
                    }
                }
            }
            this.setState({ subProcesos: display });
        }
    }
    getCountSubProcesos(subProcesos) {
        if (subProcesos) return subProcesos.length - 1;

    }
    render() {
        return (
            <div className=''>
                <h2>Procesos</h2>
                <table className='table  fs-5 ' >
                    <tr>
                        <td>Ejecuciones:</td>
                        <td>{this.state.noEjecuciones}</td>
                        <td>Interruptible:</td>
                        <td>{this.state.noSuspendidos}</td>
                        <td>Detenidos:</td>
                        <td> {this.state.noDetenidos}</td>
                    </tr>
                    <tr>
                        <td>Zombies:</td>
                        <td>{this.state.noZombies}</td>
                        <td>Dormidos:</td>
                        <td>{this.state.noDormidos}</td>
                        <td>Otros:</td>
                        <td> {this.state.otros}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Totales:</td>
                        <td>{this.state.Totales}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table fs-lg-4 fs-6 ">
                        <thead className="thead-light fs-6 ">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Ram</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.procesos.map((proceso) => (
                                    <tr className="row-hover" key={proceso.id} onClick={() => this.getSubProcesos(proceso.hijos)} data-bs-toggle="modal" data-bs-target="#SubProcesosModal">
                                        <td>{proceso.id}</td>
                                        <td>{proceso.user}</td>
                                        <td>{proceso.nombre}({this.getCountSubProcesos(proceso.hijos)})</td>
                                        <td>{proceso.estado}</td>
                                        <td>{proceso.ram}</td>
                                        <td><button className='btn btn-danger' onClick={() => this.killProcess(proceso)}>KIll</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div class="modal fade" id="SubProcesosModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="titulo" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="titulo">Sub-Procesos</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
                                    <table className="table fs-lg-4 fs-6 ">
                                        <thead className="thead-light fs-6 ">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Usuario</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Ram</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.subProcesos.map((proceso) => (
                                                    <tr className="row-hover" key={proceso.id} onClick={() => this.getSubProcesos(proceso.hijos)} >
                                                        <td>{proceso.id}</td>
                                                        <td>{proceso.user}</td>
                                                        <td>{proceso.nombre}({this.getCountSubProcesos(proceso.hijos)})</td>
                                                        <td>{proceso.estado}</td>
                                                        <td>{proceso.ram}</td>
                                                        <td><button className='btn btn-danger' onClick={() => this.killProcess(proceso)}>KIll</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
