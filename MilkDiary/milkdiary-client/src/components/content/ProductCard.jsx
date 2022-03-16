import styles from '../../styles/Card.module.css'

const ProductCard = ({ name, description, cost, image }) => {
    return (
        <div className={styles.productCard}>
            <div>
                <img src={image} alt='No available' />
            </div>
            <div className={styles.contentWrapper}>
                <div>{name}</div>

                <p>{description}</p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <p style={{ fontWeight: 600 }}>{cost} Rs</p>
                </div>
            </div>
        </div>
    )
}
export default ProductCard
