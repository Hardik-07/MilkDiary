import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useActiveLinkValue } from '../context'
import styles from '../styles/Login.module.css'
import MilkdiaryIcon from '@material-ui/icons/ImportContacts'
import doodle from '../components/data/doodle.jpg'

export const Login = () => {
    const { setAuthenticated, setUserid } = useActiveLinkValue()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [authorize, setAuthorize] = useState(false)
    const [role, setRole] = useState('')
    const [id, setId] = useState('')
    const url = `http://localhost:5000/api/v1/users/login/${name}`

    const loginFunction = () => {
        axios
            .get(url)
            .then((res) => {
                if (res.data.data[0].password === password) {
                    setId(res.data.data[0]._id)
                    setRole(res.data.data[0].role)
                    setAuthenticated(true)
                    setUserid(res.data.data[0]._id)
                    setAuthorize(true)
                } else {
                    throw new Error('Incorrect password entered')
                }
            })
            .catch((err) => {
                alert(err)
            })
    }

    if (authorize) {
        return <Redirect push to={{ pathname: `/${role}`, state: { id } }} />
    } else {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginComponent}>
                    <div className={styles.heading}>
                        <MilkdiaryIcon style={{ fontSize: '50px' }} />
                        <h3>MILKDIARY</h3>
                    </div>
                    <div className={styles.loginForm}>
                        <div className={styles.formSection}>
                            <div className={styles.textContent}>
                                <h3> Welcome Back!</h3>
                                <p
                                    style={{
                                        fontSize: '12px',
                                        marginTop: '10px',
                                    }}>
                                    Sign in by entering the information below
                                </p>
                            </div>
                            <div className={styles.fields}>
                                <div>
                                    <input
                                        type='text'
                                        id='name'
                                        placeholder='Name'
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <input
                                        type={'password'}
                                        id='name'
                                        value={password}
                                        placeholder='Password'
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    className={styles.loginbtn}
                                    onClick={loginFunction}>
                                    Login
                                </button>
                                <p
                                    style={{
                                        fontSize: '13px',
                                        margin: '5px 10px',
                                    }}>
                                    <span>Don't have a account?</span>
                                    <Link to='/register'>Create one</Link>
                                </p>
                            </div>
                        </div>

                        <div>
                            <img
                                className={styles.imgdoodle}
                                src={doodle}
                                alt='not Found'
                            />
                            <img
                                className={styles.imgdoodle}
                                src={doodle}
                                alt='not Found'
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
