import MilkdiaryIcon from '@material-ui/icons/ImportContacts'
import styles from '../../styles/Sidebar.module.css'
import { sidebarData } from '../data/sidebarList'
import { useActiveLinkValue } from '../../context'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const { activeLink } = useActiveLinkValue()
    return (
        <nav>
            <div className={styles.logo_container}>
                <center>
                    <MilkdiaryIcon style={{ fontSize: 35 }} />
                    <p>MILKDIARY</p>
                </center>
                <ul className={styles.sidebarList}>
                    {sidebarData.map((data, index) => {
                        return (
                            <Link
                                to={data.link}
                                className={`${styles.listItems} `}>
                                <li
                                    key={index}
                                    className={
                                        activeLink === data.title
                                            ? styles.active
                                            : ''
                                    }>
                                    <div className={styles.itemIcon}>
                                        {data.icon}
                                    </div>
                                    <div className={styles.itemTitle}>
                                        {data.title}
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar
