import { useEffect, useState } from 'react'
import { useActiveLinkValue } from '../../context'
import { Layout } from '../layout/'
import styles from '../../styles/Dashboard.module.css'
import axios from 'axios'

export const Dashboard = () => {
    const { setActiveLink, userid } = useActiveLinkValue()
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [name, setName] = useState('')

    console.log(userid)
    let userUrl = `http://localhost:5000/api/v1/users/${userid}`
    let active = 0
    let inactive = 0
    let lessQuantity = []
    let pending = []

    console.log(userUrl)
    useEffect(() => {
        setActiveLink('Dashboard')
        axios.get('http://localhost:5000/api/v1/customers').then((res) => {
            setCustomers(res.data.data)
        })

        axios.get('http://localhost:5000/api/v1/products').then((res) => {
            setProducts(res.data.data)
        })

        axios.get(userUrl).then((res) => {
            setOrders(res.data.data.orders)
            setName(res.data.data.name)
        })
    }, [setActiveLink, userUrl])

    customers.map((data) => {
        if (data.status === 'active') {
            active += 1
        } else {
            inactive += 1
        }
        return 0
    })

    products.map((data) => {
        if (data.quantity <= 40) {
            lessQuantity.push(data)
        }
        return 0
    })

    orders.map((data) => {
        if (data.orderstatus === 'pending') {
            pending.push(data)
        }
        return 0
    })

    return (
        <Layout>
            <div className={styles.dashboardComonent}>
                <div className={styles.headingBar}>
                    <div className={styles.heading}>DashBoard</div>
                    <div style={{ fontSize: '1.4em' }}>{`Hello ${name}`}</div>
                </div>
                <div className={styles.userStatus}>
                    <div
                        className={styles.status}
                        style={{ backgroundColor: '#89C9B8' }}>
                        <div
                            style={{
                                textAlign: 'center',
                                fontFamily: 'sans serif',
                                color: 'whitesmoke',
                                fontWeight: 500,
                            }}>
                            <div
                                style={{
                                    fontSize: '3.5rem',
                                }}>
                                {customers.length}
                            </div>
                            <div>Total Customers</div>
                        </div>
                    </div>
                    <div
                        className={styles.status}
                        style={{ backgroundColor: '#F2A365' }}>
                        <div
                            style={{
                                textAlign: 'center',
                                fontFamily: 'sans serif',
                                color: 'whitesmoke',
                                fontWeight: 500,
                            }}>
                            <div
                                style={{
                                    fontSize: '3.5rem',
                                }}>
                                {active}
                            </div>
                            <div>Active Users</div>
                        </div>
                    </div>
                    <div
                        className={styles.status}
                        style={{ backgroundColor: '#FF6363' }}>
                        <div
                            style={{
                                textAlign: 'center',
                                fontFamily: 'sans serif',
                                color: 'whitesmoke',
                                fontWeight: 500,
                            }}>
                            <div
                                style={{
                                    fontSize: '3.5rem',
                                }}>
                                {inactive}
                            </div>
                            <div>Inactive Users</div>
                        </div>
                    </div>
                </div>
                <div className={styles.itemDetails}>
                    <div className={styles.orders}>
                        <div
                            style={{
                                backgroundColor: '#51c4d3',
                                height: '3rem',
                                display: 'flex',
                                padding: '0px 20px',
                                alignItems: 'center',
                                borderRadius: '0.6rem 0.6rem 0rem 0rem',
                                color: 'whitesmoke',
                                fontWeight: 500,
                            }}>
                            Pending Orders
                        </div>
                        <table className={styles.orderList}>
                            <tr>
                                <th style={{ width: '8%' }}>Sr.No</th>
                                <th>Name</th>
                                <th>Order</th>
                                <th>Quantiy</th>
                            </tr>

                            {pending.length === 0 ? (
                                <div>No pending Orders</div>
                            ) : (
                                pending.map((data, key) => {
                                    return (
                                        <tr>
                                            <td>{key + 1}</td>
                                            <td>{data.name}</td>
                                            <td>{data.order}</td>
                                            <td>{data.quantity}</td>
                                        </tr>
                                    )
                                })
                            )}
                        </table>
                    </div>

                    <div className={styles.items}>
                        <div>
                            <div
                                style={{
                                    backgroundColor: '#132C33',
                                    height: '3rem',
                                    display: 'flex',
                                    padding: '0px 20px',
                                    alignItems: 'center',
                                    borderRadius: '0.6rem 0.6rem 0rem 0rem',
                                    color: 'whitesmoke',
                                    fontWeight: 500,
                                }}>
                                Items ( Less than 40)
                            </div>
                            <div>
                                <ul className={styles.list}>
                                    {lessQuantity.length === 0 ? (
                                        <div>Enough Stock Available</div>
                                    ) : (
                                        lessQuantity.map((data, key) => {
                                            return (
                                                <li key={key}>
                                                    <div>{data.name}</div>
                                                    <div>:</div>
                                                    <div>{data.quantity}</div>
                                                </li>
                                            )
                                        })
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
