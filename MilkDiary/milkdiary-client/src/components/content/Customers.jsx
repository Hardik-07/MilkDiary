import { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useActiveLinkValue } from '../../context'
import { Layout } from '../layout'
import axios from 'axios'
import EditCustomer from '@material-ui/icons/Edit'
import DeleteCustomer from '@material-ui/icons/DeleteOutlined'
import styles from '../../styles/Customers.module.css'

export const Customers = () => {
    const { setActiveLink, authenticated } = useActiveLinkValue()
    const [custlist, setCustlist] = useState([])
    const [serachTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setActiveLink('Customers')
        axios.get('http://localhost:5000/api/v1/customers').then((response) => {
            setCustlist(response.data.data)
        })
    }, [setActiveLink])

    if (authenticated) {
        return (
            <Layout>
                <div className={styles.customersDataComonent}>
                    <div className={styles.headingBar}>
                        <div className={styles.heading}>Customers List</div>
                        <Link to='/admin/customers/newcustomer'>
                            <button className={styles.newCustomerBtn}>
                                Add Customer
                            </button>
                        </Link>
                    </div>
                    <div className={styles.searchBox}>
                        <input
                            type='text'
                            placeholder='Search...'
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                        />
                    </div>

                    <table>
                        <tr style={{ height: '3rem' }}>
                            <th>SR.No</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>CONTACT</th>
                            <th>STATUS</th>
                            <th></th>
                            <th></th>
                        </tr>

                        {custlist
                            .filter((val) => {
                                if (serachTerm === '') {
                                    return val
                                } else if (
                                    val.name
                                        .toLowerCase()
                                        .includes(serachTerm.toLowerCase())
                                ) {
                                    return val
                                }
                            })
                            .map((data, key) => {
                                return (
                                    <tr>
                                        <td
                                            style={{
                                                textAlign: 'center',
                                                width: '5%',
                                            }}>
                                            {key + 1}
                                        </td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.contact}</td>
                                        <td>
                                            {data.status === 'active' ? (
                                                <p
                                                    style={{
                                                        color: 'green',
                                                        fontWeight: 600,
                                                    }}>
                                                    Active
                                                </p>
                                            ) : (
                                                <p
                                                    style={{
                                                        color: 'red',
                                                        fontWeight: 600,
                                                    }}>
                                                    Inactive
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/admin/customers/edit/${data._id}`}>
                                                <EditCustomer
                                                    className={styles.btn}
                                                />
                                            </Link>
                                        </td>

                                        <td>
                                            <DeleteCustomer
                                                onClick={async () => {
                                                    await axios.delete(
                                                        `http://localhost:5000/api/v1/customers/${data._id}`
                                                    )
                                                    window.location.reload()
                                                }}
                                                className={styles.btn}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                    </table>
                </div>
            </Layout>
        )
    } else {
        return <Redirect push to='/' />
    }
}
