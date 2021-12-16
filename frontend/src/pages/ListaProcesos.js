import React, { Component } from 'react'
import Administracion from './Administracion'
import TablaProcesos from '../components/TablaProcesos'

export default class ListaProcesos extends Component {
    render() {
        return (
            <div className='conteiner'>
                <div className='row'>
                    <Administracion/>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <TablaProcesos/>
                    </div>
                </div>
                
               
            </div>
        )
    }
}
