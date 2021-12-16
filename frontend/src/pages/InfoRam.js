import React, { Component } from 'react'
import MonitorRam from '../components/MonitorRam'
import Administracion from './Administracion'

export default class InfoRam extends Component {
    render() {
        return (
            <div className='conteiner'>
                <div className='row'>
                    <Administracion />
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <MonitorRam />
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
