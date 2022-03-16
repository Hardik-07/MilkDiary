import '../styles/global.css'
import { useActiveLinkValue } from '../context'
import { Redirect } from 'react-router'
import { Dashboard } from '../components/content'

export const Admin = () => {
    const { authenticated } = useActiveLinkValue()
    if (authenticated) {
        return <Dashboard />
    } else {
        return <Redirect push to='/' />
    }
}
