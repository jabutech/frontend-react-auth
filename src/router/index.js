import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home'
import About from '../views/About'
import Navbar from '../components/Navbar';
import Login from '../views/Auth/Login';
import Register from '../views/Auth/Register';
import Guest from '../middleware/Guest';
import Authenticated from '../middleware/Authenticated';

function Router(){
    return(
        <BrowserRouter>
        <Navbar/>
            <div className="mt-4">
            <Switch>
                <Route exact path="/">
                    {/* Jika belum login tidak diizinkan akses */}
                    <Authenticated>
                        <Home/>
                    </Authenticated>
                </Route>
                <Route path="/about">
                    {/* Jika belum login tidak diizinkan akses */}
                    <Authenticated>
                        <About/>
                    </Authenticated>
                </Route>
                <Route path="/login">
                    {/* halaman ini hanya bisa diakses oleh Guest */}
                    <Guest>
                        <Login/>
                    </Guest>
                </Route>
                <Route path="/register">
                    {/* halaman ini hanya bisa diakses oleh Guest */}
                    <Guest>
                        <Register/>
                    </Guest>
                </Route>
            </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Router;