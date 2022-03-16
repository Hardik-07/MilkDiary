import { useActiveLinkValue } from '../context'
import { Redirect } from 'react-router'
import { useEffect } from 'react'
import styles from '../styles/BuyPage.module.css'
import MilkdiaryIcon from '@material-ui/icons/ImportContacts'
import { Link } from 'react-router-dom'
import { BuyProducts, OrderList } from '../components/content'

export const BuyPage = () => {
    const { authenticated } = useActiveLinkValue()

    if (authenticated) {
        return (
            <div>
                <div className={styles.navbar}>
                    <div className={styles.heading}>
                        <MilkdiaryIcon style={{ fontSize: 40 }} />
                        <div
                            style={{ fontWeight: '600', margin: '0em 0.5em ' }}>
                            MILKDIARY
                        </div>
                    </div>
                    <Link to='/'>
                        <button className={styles.logoutbtn}>Logout</button>
                    </Link>
                </div>
            </div>
        )
    } else {
        return <Redirect push to='/' />
    }
}
