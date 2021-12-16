import React, { Component } from 'react'
import MonitorCpu from '../components/MonitorCpu'
import Administracion from './Administracion'


export default class InformacionCPU extends Component {
    render() {
        return (
            <div className='conteiner'>
                <div className='row'>
                    <Administracion />
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <MonitorCpu />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                       
                    </div>
                </div>
            </div>
        )
    }
}
