import {atom} from 'recoil'

// Property Auth
const authenticated = atom({
    // Status login default false
    key: 'authenticated',
    default: {
        // Default nilai isLoggedin adalah false
        check: false,
        // Default nilain data user yang login adalah empty aray
        user: []
    }
})

export { authenticated } 