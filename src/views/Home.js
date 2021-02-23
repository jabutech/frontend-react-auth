import React from 'react'
import { useRecoilValue } from 'recoil';
import { authenticated } from '../store';

function Home(){
    // Mengambil data state dari store>index.js
    const auth = useRecoilValue(authenticated)
    return(
        <div className="container">
            {/* Menampilkan data user yang sedang login */}
            Selamat datang <b>{auth.user.name}</b>
        </div>
    )
}

export default Home;