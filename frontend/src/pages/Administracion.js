import React, { Component } from 'react'

export default class Administracion extends Component {

    goListaProcesos(){
        window.location.href="./ListaProcesos"
    }

    goInformacionCPU(){
        window.location.href="./InformacionCPU"
    }
    goRamInfo(){
        window.location.href="./goRamInfo"
    }
    
    render() {
        return (
            <div className='conteiner '>
                <div className="row">
                    <div className='col-12 text-center '>
                        <h1>Proyecto 1</h1>
                        <p>
                            Sistemas Operativos 1<br/>
                            Oscar Roberto Velásquez León
                        </p>
                    </div>
                </div>
                <div className='row text-center'>
                    <div className='col-3 '><button  className='btn btn-primary w-80' onClick={()=>this.goListaProcesos()}>Lista de Procesos</button></div>
                    <div className='col-3'><button  className='btn btn-primary w-80'>Arbol de procesos</button></div>
                    <div className='col-3'><button  className='btn btn-primary w-80' onClick={()=>this.goRamInfo()}>Monitor RAM</button></div>
                    <div className='col-3'><button  className='btn btn-primary w-80' onClick={()=>this.goInformacionCPU()}>Monitor CPU</button></div>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10 '>
                        
                    </div>
                </div>
            </div>
        )
    }
}
