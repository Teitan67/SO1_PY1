import React from 'react'
import {BrowserRouter,Switch,Route}from 'react-router-dom'
import Administracion from '../pages/Administracion';
import ListaProcesos from '../pages/ListaProcesos';
import InformacionCPU from '../pages/InformacionCPU';
import InfoRam from '../pages/InfoRam';

function RoutesRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Administracion}/>
                <Route exact path="/ListaProcesos" component={ListaProcesos}/>
                <Route exact path="/InformacionCPU" component={InformacionCPU}/>
                <Route exact path="/goRamInfo" component={InfoRam}/>
            </Switch>
        </BrowserRouter>
    );
}

export default RoutesRoutes