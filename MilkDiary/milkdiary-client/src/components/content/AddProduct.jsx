import { useState, useEffect } from 'react'
import { useActiveLinkValue } from '../../context'
import axios from 'axios'
import styles from '../../styles/Addproduct.module.css'
import { Layout } from '../layout/'
import { Redirect } from 'react-router'

export const AddProduct = () => {
    const url = 'http://localhost:5000/api/v1/products'
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [baseImage, setBaseImage] = useState('')

    const { setActiveLink, authenticated } = useActiveLinkValue()
    useEffect(() => setActiveLink('Products'))

    //to set image
    const setImg = async (event) => {
        const file = event.target.files[0]
        const base64 = await convertBase64(file)
        setBaseImage(base64)
    }

    //converts file to base64
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = () => {
                reject(Error)
            }
        })
    }

    //to upload data of product
    const uploadData = async () => {
        const res = await axios.post(url, {
            name: name,
            description: description,
            cost: cost,
            image: baseImage,
            quantity: quantity,
        })
        console.log(res)

        alert('DATA Submited succesfuly')
        setName('')
        setDescription('')
        setCost(0)
        setBaseImage('')
    }

    if (authenticated) {
        return (
            <Layout>
                <div className={styles.newProduct}>
                    <div className={styles.heading}>Add Product Data</div>
                    <div className={styles.dataform}>
                        <div className={styles.datafields}>
                            <label htmlFor='name'>Name of Product</label>
                            <input
                                id='name'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className={styles.datafields}>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                id='description'
                                cols='30'
                                rows='10'
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }></textarea>
                        </div>

                        <div className={styles.datafields}>
                            <label for='cost'>Cost</label>
                            <input
                                type='number'
                                id='cost'
                                placeholder='Cost in Rupees'
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </div>
                        <div className={styles.datafields}>
                            <label for='quantity'>Quantity</label>
                            <input
                                type='number'
                                id='quantity'
                                placeholder='Quantity of item'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className={styles.datafields}>
                            <input
                                style={{ display: 'none' }}
                                type='file'
                                id='file'
                                onChange={(e) => setImg(e)}
                            />
                            <div className={styles.imgdiv}>
                                <label for='file' id={styles.imgInput}>
                                    Choose Image
                                </label>
                                <div className={styles.imgBox}>
                                    {baseImage !== '' ? (
                                        <img
                                            src={baseImage}
                                            alt='No available'
                                        />
                                    ) : (
                                        <h4 style={{ color: '#dfe2e9' }}>
                                            Preview
                                        </h4>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.addbtn} onClick={uploadData}>
                        Add Product
                    </button>
                </div>
            </Layout>
        )
    } else {
        return <Redirect push to='/' />
    }
}
