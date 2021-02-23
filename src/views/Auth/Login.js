import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticated } from '../../store'

function Login(){
    // Gunakan useHistory untuk redirect
    const redirect = useHistory()
    // Import state authenticated from store>index.js
    const [auth, setAuth] = useRecoilState(authenticated)
    // State Paramenter 
    const [username, setUsername] = useState('letenk')
    const [password, setPassword] = useState('12345678')
    // State untuk error
    const [errors, setErrors] = useState([])
    // Ambil data form yang akan login dari value
    const dataLogin = {username, password}

    // Method login
    const login = async (e) => {
        // agar tidak refresh
        e.preventDefault()
        // Jika berhasil
        try{
            // Proses login dan masukkan data yang login dari variavle dataLogin
            let response = await axios.post('login', dataLogin)
            // setelah berhasil login, simpan token ke local storage browset
            localStorage.setItem('token', response.data.token)
            // Rubah state auth auth menjadi true
            setAuth({
                // Rubah state check auth menjadi true
                check: true,
                user: response.data.data
            })
            // Redirect ke halaman home menggunakan redirect history diatas
            redirect.push('/')
        }
        catch(e){
            // Jika gagal
            // console.log(e);
            setErrors(e.response.data.errors)
        }
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    {/* Jika ada error failed login tampilkan dengan if */}
                    {
                        // cek error failed login
                        errors.failedLogin ?
                        // Jika ada error
                        <div className="alert alert-danger" role="alert">{errors.failedLogin[0]}</div>
                        // Jika tidak ada kosongkan
                        : ''
                    }
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            {/* method */}
                            <form onSubmit={login}>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">username</label>
                                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} name="username" id="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`}/>
                                    {/* Tampilkan error untuk username */}
                                    {
                                        errors.username ? <div className="invalid-feedback">{errors.username[0]}</div> : ''
                                    }
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                                    {/* Tampilkan error untuk username */}
                                    {
                                        errors.password ? <div className="invalid-feedback">{errors.password[0]}</div> : ''
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;