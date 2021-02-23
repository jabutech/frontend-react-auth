import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {  useRecoilValue } from 'recoil'
import { authenticated } from '../store'

function Guest({children}) {
    // Gunakan useHistory untuk redirect
    const redirect = useHistory()
    // Buat state auth arahkan ke authenticated
    const auth= useRecoilValue(authenticated)

    // Ketika component selesai dirender
    useEffect(() => {
        // jika user dalam keadaan auth.check: true / login
        if(auth.check){
            // redirect ke halaman homepage
            redirect.push('/')
        }
    }, [auth.check, redirect])

    return children
}

export default Guest