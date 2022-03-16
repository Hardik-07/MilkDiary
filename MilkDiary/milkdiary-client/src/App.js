import './styles/global.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Admin, Login, BuyPage, Register } from './pages/index'
import {
    Customers,
    EditCustomer,
    Products,
    AddProduct,
    AddCustomer,
    BuyProducts,
    Buy,
} from './components/content'

const App = () => {
    return (
        <>
            <Router>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/admin' component={Admin} />
                <Route exact path='/customer' component={BuyProducts} />
                <Route exact path='/admin/products' component={Products} />
                <Route
                    exact
                    path='/admin/products/newproduct'
                    component={AddProduct}
                />
                <Route exact path='/admin/customers' component={Customers} />
                <Route
                    exact
                    path='/admin/customers/newcustomer'
                    component={AddCustomer}
                />
                <Route
                    path='/admin/customers/edit/:id'
                    component={EditCustomer}
                />
                <Route path='/buy/:id' component={Buy} />
            </Router>
        </>
    )
}

export default App
