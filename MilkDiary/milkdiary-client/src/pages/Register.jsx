import { useState } from 'react'
import styles from '../styles/Register.module.css'
import MilkdiaryIcon from '@material-ui/icons/ImportContacts'
import axios from 'axios'
import img from '../components/data/register.svg'

export const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const url = 'http://localhost:5000/api/v1/users'

    const validate = () => {
        var regxEmail = /\S+@\S+\.\S+/
        if (name === '') {
            alert('Please Enter name')
            return false
        } else if (!regxEmail.test(email)) {
            alert('Invalid Email, Plss Enter Email again')
            return false
        } else if (password === '') {
            alert('Please Enter password')
            return false
        } else {
            return true
        }
    }

    const registerUser = async () => {
        const valid = await validate()

        if (valid) {
            await axios.post(url, {
                name: name,
                email: email,
                password: password,
                role: 'admin',
                orders: [],
            })

            alert('Registered Successfuly')
            setName('')
            setEmail('')
            setPassword('')
        }
    }

    return (
        <div>
            <div className={styles.loginPage}>
                <div className={styles.loginComponent}>
                    <div className={styles.heading}>
                        <MilkdiaryIcon style={{ fontSize: '50px' }} />
                        <h3>MILKDIARY</h3>
                    </div>
                    <div className={styles.registerForm}>
                        <div>
                            <div className={styles.registerfeilds}>
                                <h3
                                    style={{
                                        fontFamily: 'cursive',
                                        color: '#4f80e1',
                                    }}>
                                    Start Jotting your MILKDIARY
                                </h3>
                                <div>
                                    <input
                                        id='name'
                                        type='text'
                                        placeholder='Name'
                                        required
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                    <input
                                        id='email'
                                        type='email'
                                        placeholder='Email'
                                        required
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                    <input
                                        id='password'
                                        type='password'
                                        placeholder='password'
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <button onClick={registerUser}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <img src={img} alt='Not available' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
