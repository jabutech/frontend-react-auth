import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authenticated } from '../store'

function Authenticated({children}) {
    // Gunakan useHistory untuk redirect
    const redirect = useHistory()
    // Buat state auth arahkan ke authenticated
    const auth = useRecoilValue(authenticated)

    // Ketika component selesai dirender
    useEffect(() => {
        // jika user dalam keadaan auth.check: false / belum login
        if(!auth.check){
            // redirect ke halaman login
            redirect.push('/login')
        }
    }, [auth.check, redirect])

    return children
}

export default Authenticated