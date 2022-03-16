import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import CustomerIcon from '@material-ui/icons/PersonOutlineOutlined'
import ProductIcon from '@material-ui/icons/ShoppingCartOutlined'
import Logout from '@material-ui/icons/ExitToAppSharp'

export const sidebarData = [
    {
        title: 'Dashboard',
        icon: <DashboardIcon />,
        link: '/admin',
    },
    {
        title: 'Products',
        icon: <ProductIcon />,
        link: '/admin/products',
    },
    {
        title: 'Customers',
        icon: <CustomerIcon />,
        link: '/admin/customers',
    },
    {
        title: 'Logout',
        icon: <Logout />,
        link: '/',
    },
]
