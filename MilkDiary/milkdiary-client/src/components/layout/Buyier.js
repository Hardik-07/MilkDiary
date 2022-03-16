import { BuyPage } from '../../pages/BuyPage'
import '../../styles/global.css'

export const Buyier = ({ children }) => {
    return (
        <div className='buyier'>
            <BuyPage />
            <main>{children}</main>
        </div>
    )
}
