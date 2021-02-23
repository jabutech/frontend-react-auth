import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Router from './router';
// import axios
import axios from 'axios'
// Import auth dari store>index.js
import { authenticated } from './store'

function App(){
  // buat state isLoggedIn dan set dispacternya dan Panggil state authenticated dengan recoil
  const [auth, setAuth] = useRecoilState(authenticated)
  // Set state untuk mounted ready
  const [mounted, setMounted] = useState(false)

  // Ambil data user ketika berhasil login
  const getUser = async () => {
    
    try{
      // Ambil data dari backend controller me
      let response = await axios.get('me')

      // Setelah authorisasi berhasil masukkan data ke state isLoggedIn
      setAuth({
        // rubah state check menjadi true
        check: true,
        // rubah state user dengan data user yang didapat dari backend me
        user: response.data.data
      })

    }catch (e){
      console.log(e);
    }

    // Set state mounted jadi true
    setMounted(true)
  }

  // Include method get user
  useEffect(() => {
    getUser()
  }, [auth.check, mounted])
  // Panggil state isLoggedIn diatas

// Loading
  // cek jika mounted belum berhasil / false
  if(!mounted){
    return (
      // Div dibuat agar loading ketengah, jika pakai tailwind sesuaikan
      <div className="row justify-content-center align-items-center vh-100">
        {/* Code loading yang sudah diimport html > jsx */}
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} width="64px" height="64px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <path fill="none" stroke="#e90c59" strokeWidth={8} strokeDasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round" style={{transform: 'scale(0.8)', transformOrigin: '50px 50px'}}>
            <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
          </path>
        </svg>
      </div>
      
    )
  }

  return(
    <Router/>
  )
}

export default App;