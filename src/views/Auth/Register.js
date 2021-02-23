import axios from 'axios'
import React, { useState } from 'react'

function Register(){
    // init form
    // [state, dispatcher]
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password,  setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    // State success message
    const [messageSuccess, setMessageSuccess] = useState('')

    // state error message
    const [messageErrors, setMessageErrors] = useState('')
    // state all error, use state karena errornya banyak buat menjadi empty array
    const [errors, setErrors] = useState([])


    // Menangkap value form isian
    const record = { name, username, password, password_confirmation }

    // Proses Register
    const store = async (e) => {
        // Ketika di klik tidak ada refresh
        e.preventDefault();
        // Jika berhasil
        try{
            // Akses route register dan kirim data registrasinya
            let response = await axios.post('register', record)
            // Tampilkan responsnya di log
            setMessageSuccess(response.data.message);

            // Ketika berhasil kosongkan lagi formnya
            setName('')
            setUsername('')
            setPassword('')
            setPasswordConfirmation('')
            // Kosongkan message juga errornya jika ada
            setMessageErrors('')
            // kosongkan all error
            setErrors('')

        }
        // Jika gagal
        catch(e){
            // jika ada message sukses Kosongkan message juga suksesnya dulu jika ada
            setMessageSuccess('')
            // Kirim error message ke state stateErrors diatas
            setMessageErrors(e.response.data.message);
            // Kirim errors state errors untuk menampung seluruh error per field
            setErrors(e.response.data.errors)
        }
        
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-5">
                    {/* Jika ada error Tapilkan error dengan if */}
                    {
                        // cek error pada state
                        messageErrors ?
                        // Jika error tampilkan message errornya
                        // Jika error ingin di custom kata kata sendiri, pada {messageErrors} masukkan kata katanya
                        <div className="alert alert-danger" role="alert">{messageErrors}</div>
                        :
                        // Jika tidak kosongkan state message
                        ''
                    }

                    {/* Jika sukses  tampilkan suksesnya*/}
                    {
                        // cek message pada state
                        messageSuccess ?
                        // Jika sukses tampilkan message sukksesnya
                        // Jika message ingin di custom kata kata sendiri, pada {messageSuccess} masukkan kata katanya
                        <div className="alert alert-success" role="alert">{messageSuccess}</div>
                        :
                        // Jika tidak kosongkan state messagenya
                        ''
                    }

                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                           {/* method register */}
                            <form onSubmit={store}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} name="name" id="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                    {/* Tampilkan error untuk name */}
                                    {
                                        errors.name ? <div className="invalid-feedback">{errors.name[0]}</div> : ''
                                    }
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="form-label">username</label>
                                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} name="username" id="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`}/>
                                    {/* Tampilkan error untuk username */}
                                    {
                                        errors.username ? <div className="invalid-feedback">{errors.username[0]}</div> : ''
                                    }
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                                    {/* Tampilkan error untuk username */}
                                    {
                                        errors.password ? <div className="invalid-feedback">{errors.password[0]}</div> : ''
                                    }
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password_confirmation" className="form-label">Password Confirmation</label>
                                    <input type="password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={password_confirmation} name="password_confirmation" id="password_confirmation" className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                                    {/* Tampilkan error untuk username */}
                                    {
                                        errors.password ? <div className="invalid-feedback">{errors.password[0]}</div> : ''
                                    }
                                </div>

                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;