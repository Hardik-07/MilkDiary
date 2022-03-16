import { Buyier } from '../layout/Buyier'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import styles from '../../styles/Buy.module.css'
import { useActiveLinkValue } from '../../context'

export const Buy = () => {
    const { id } = useParams()
    const { userid } = useActiveLinkValue()
    const url = `http://localhost:5000/api/v1/products/${id}`
    const [productname, setProductname] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [orderquantity, setOrderquanity] = useState(0)
    const [amount, setAmount] = useState(0)
    const [imge, setImge] = useState('')

    const [name, setName] = useState()
    const [dairyid, setDairyid] = useState()

    useEffect(() => {
        axios.get(url).then((res) => {
            setProductname(res.data.data.name)
            setDescription(res.data.data.description)
            setCost(res.data.data.cost)
            setQuantity(res.data.data.qunatity)
            setImge(res.data.data.image)
        })

        axios
            .get(`http://localhost:5000/api/v1/customers/edit/${userid}`)
            .then((res) => {
                setName(res.data.data.name)
                setDairyid(res.data.data.dairyID)
            })
    }, [url])

    const onAdd = () => {
        if (orderquantity >= quantity) {
            alert('Not Enough Stock')
            setOrderquanity(quantity)
        } else {
            setOrderquanity(orderquantity + 1)
        }
    }

    const onSubtract = () => {
        if (orderquantity <= 0) {
            alert('Invalid Input')
            setOrderquanity(0)
        } else {
            setOrderquanity(orderquantity - 1)
        }
    }

    const finalamt = () => {
        setAmount(orderquantity * cost)
    }

    const submitOrder = async () => {
        try {
            await axios.post(
                `http://localhost:5000/api/v1/users/order/${dairyid}`,
                {
                    name: name,
                    order: productname,
                    quantity: orderquantity,
                    amount: amount,
                    orderstatus: 'pending',
                }
            )
            alert('ordered successfully')
        } catch (err) {
            alert(err)
        }
    }

    return (
        <Buyier>
            <div>
                <div className={styles.heading}>Product Details</div>
                <div className={styles.detailForm}>
                    <p>
                        <span>Name</span> : {productname}
                    </p>
                    <p>
                        <span>Description</span> : {description}
                    </p>
                    <p>
                        <span>Cost</span> : {cost}
                    </p>

                    <div className={styles.quantity}>
                        <div className={styles.toogler} onClick={onSubtract} v>
                            <Remove />
                        </div>
                        <div className={styles.toogler}>{orderquantity}</div>
                        <div className={styles.toogler} onClick={onAdd}>
                            <Add />
                        </div>
                    </div>
                    <div className={styles.formbtn}>
                        <button onClick={finalamt}>Final Amount</button>
                        <div style={{ fontSize: '1.4em' }}>
                            Amount to be Paid : {amount} RS
                        </div>
                        <button onClick={submitOrder}>Order</button>
                    </div>
                    <img className={styles.productimg} src={imge} alt='' />
                </div>
            </div>
        </Buyier>
    )
}
