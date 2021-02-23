import axios from 'axios';
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticated } from '../store';
// Import Toast notifikasi
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';

function Navbar(){
    // Gunakan useHistory untuk redirect
    const redirect = useHistory()
    // Masukkan user yang login di ambil dari state authenticated
    const [auth, setAuth] = useRecoilState(authenticated)
    // Method logout
    const logout = async () => {
        // jika berhasil
        try {
            // proses logout ke backend
            let response = await axios.post('logout')
            // set auth.check menjadi false
            setAuth({ check: false })
            // hapus token dari local storage browser
            localStorage.removeItem('token')
            // alihkan ke halaman login
            redirect.push('/login')
            // Tampilkan notif dengan toast
            toast.notify(response.data.message)
        }
        // Jika gagal
        catch(e) {
            // Tampilkan notif dengan toast
            toast.notify(e.message)
        }
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
        <NavLink className="navbar-brand" to="/">Metion</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink exact className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
            </ul>

            {/* Tampilkan nama user login */}
            {
                // check status auth
                auth.check ?

                // Jika true
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="#">{auth.user.name}</NavLink>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link btn" onClick={logout}>Logout</button>
                    </li>
                </ul>

                :

                // Jika False
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                </ul>

            }
        </div>
        </nav>
    )
}

export default Navbar;