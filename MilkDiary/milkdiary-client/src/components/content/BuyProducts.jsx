import axios from 'axios'
import { useState, useEffect } from 'react'
import { useActiveLinkValue } from '../../context'
import { Buyier } from '../layout/Buyier'
import styles from '../../styles/BuyProducts.module.css'
import Card from './ProductCard'

import { Link } from 'react-router-dom'

export const BuyProducts = () => {
    const [products, setProducts] = useState([])

    const { setActiveLink } = useActiveLinkValue()

    useEffect(() => {
        setActiveLink('Products')
        axios.get('http://localhost:5000/api/v1/products').then((response) => {
            setProducts(response.data.data)
        })
    }, [])

    return (
        <>
            <Buyier>
                <div className={styles.products}>
                    {products.length !== 0 ? (
                        products.map((data, key) => (
                            <Link
                                to={`/buy/${data._id}`}
                                style={{ textDecoration: 'none' }}>
                                <Card
                                    name={data.name}
                                    description={data.description}
                                    cost={data.cost}
                                    image={data.image}
                                />
                            </Link>
                        ))
                    ) : (
                        <h5>No Items Available</h5>
                    )}
                </div>
            </Buyier>
        </>
    )
}
