import { useState, useEffect } from 'react'
import { useActiveLinkValue } from '../../context'
import styles from '../../styles/Products.module.css'
import Card from './ProductCard'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { Layout } from '../layout/'

export const Products = () => {
    const [products, setProducts] = useState([])

    const { setActiveLink, authenticated } = useActiveLinkValue()
    useEffect(() => {
        setActiveLink('Products')
        axios.get('http://localhost:5000/api/v1/products').then((response) => {
            setProducts(response.data.data)
        })
    })

    if (authenticated) {
        return (
            <Layout>
                <div className={styles.productsComponenet}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '2em',
                        }}>
                        <div
                            style={{
                                fontSize: '2rem',
                                color: '#4f80e1',
                                fontWeight: 500,
                                position: 'sticky',
                            }}>
                            Products
                        </div>
                        <Link to='/admin/products/newproduct'>
                            <button className={styles.newProductBtn}>
                                Add Product
                            </button>
                        </Link>
                    </div>

                    <div className={styles.productsGrid}>
                        {products.length !== 0 ? (
                            products.map((data, key) => (
                                <Card
                                    name={data.name}
                                    description={data.description}
                                    cost={data.cost}
                                    image={data.image}
                                />
                            ))
                        ) : (
                            <h5>No Items Available</h5>
                        )}
                    </div>
                </div>
            </Layout>
        )
    } else {
        return <Redirect push to='/' />
    }
}
