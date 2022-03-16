import { useState, useEffect } from 'react'
import { useActiveLinkValue } from '../../context'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Back from '@material-ui/icons/ArrowBackOutlined'
import styles from '../../styles/Addcustomer.module.css'
import { Layout } from '../layout'

export const AddCustomer = () => {
    const url = 'http://localhost:5000/api/v1/customers'
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')

    const { setActiveLink, userid, authenticated } = useActiveLinkValue()
    useEffect(() => setActiveLink('Customers'))

    const validation = () => {
        var regxContact = /^[6-9]\d{9}$/
        var regxEmail = /\S+@\S+\.\S+/
        if (!regxEmail.test(email)) {
            alert('Invalid Email, Plss Enter Email again')
            return false
        }
        if (!regxContact.test(parseInt(contact))) {
            alert('invalid Contact Number(It must be 10 Digits')
            return false
        }
        return true
    }

    const saveCustomer = async () => {
        const validate = await validation()
        if (validate) {
            await axios.post(url, {
                name: name,
                email: email,
                contact: contact,
                status: 'active',
                dairyID: userid,
            })

            alert('Customer Added Successfuly')
            setName('')
            setEmail('')
            setContact('')
        }
    }

    if (authenticated) {
        return (
            <Layout>
                <div className={styles.AddcustomerComponent}>
                    <div className={styles.headingBar}>
                        <div className={styles.heading}>New Cutomer Data</div>
                        <Link to='/admin/customers'>
                            <button className={styles.backBtn}>
                                {<Back />}
                            </button>
                        </Link>
                    </div>
                    <div className={styles.dataform}>
                        <div className={styles.datafields}>
                            <label for='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.datafields}>
                            <label for='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.datafields}>
                            <label for='contact'>Contact</label>
                            <input
                                type='text'
                                id='contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        <button
                            className={styles.registerbtn}
                            onClick={saveCustomer}>
                            Register Customer
                        </button>
                    </div>
                </div>
            </Layout>
        )
    } else {
        return <Redirect push to='/' />
    }
}
