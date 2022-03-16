import axios from 'axios'
import { useActiveLinkValue } from '../../context'
import { Link, Redirect } from 'react-router-dom'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Layout } from '../layout/'
import Back from '@material-ui/icons/ArrowBackOutlined'
import styles from '../../styles/EditCustomer.module.css'

export const EditCustomer = () => {
    const { id } = useParams()
    const { setActiveLink, authenticated } = useActiveLinkValue()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [status, setStatus] = useState('')

    const url = `http://localhost:5000/api/v1/customers/edit/${id}`
    useEffect(() => {
        setActiveLink('Customers')
        axios.get(url).then((res) => {
            setName(res.data.data.name)
            setEmail(res.data.data.email)
            setContact(res.data.data.contact)
            setStatus(res.data.data.status)
        })
    }, [setActiveLink, url])

    const validation = () => {
        var regxContact = /^[6-9]\d{9}$/
        var regxEmail = /\S+@\S+\.\S+/
        if (!regxEmail.test(email)) {
            alert('Invalid Email Foramt')
            return false
        }
        if (!regxContact.test(parseInt(contact))) {
            alert('Invalid Number Format (It must be 10 Digits)')
            return false
        }
        return true
    }

    const savechanges = async () => {
        try {
            const valid = validation()
            if (valid) {
                console.log(valid)
                await axios.put(url, {
                    name: name,
                    email: email,
                    contact: contact,
                    status: status,
                })
                alert('Update Data Succesfully')
            }
        } catch (err) {
            alert(err)
        }
    }

    if (authenticated) {
        return (
            <Layout>
                <div className={styles.editComponent}>
                    <div className={styles.headingBar}>
                        <div className={styles.heading}>Edit Customer</div>
                        <Link to='/admin/customers'>
                            <button className={styles.backBtn}>
                                {<Back />}
                            </button>
                        </Link>
                    </div>
                    <div className={styles.dataform}>
                        <div className={styles.datafields}>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                disabled
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.datafields}>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.datafields}>
                            <label htmlFor='contact'>Contact</label>
                            <input
                                type='text'
                                id='contact'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                        <div className={styles.statusToogle}>
                            <input
                                type='radio'
                                name='status'
                                value='active'
                                checked={status === 'active'}
                                id='active'
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <label htmlFor='active'>Active</label>
                            <input
                                type='radio'
                                name='status'
                                value='inactive'
                                checked={status === 'inactive'}
                                id='inactive'
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <label htmlFor='inactive'>Inactive</label>
                        </div>
                        <button
                            className={styles.editbtn}
                            onClick={savechanges}>
                            Update
                        </button>
                    </div>
                </div>
            </Layout>
        )
    } else {
        return <Redirect push to='/' />
    }
}
