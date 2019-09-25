import NotFound from '../pages/notFound';
import Welcome from '../pages/welcome';
import Login from '../pages/login';
import Table from '../pages/basic/table';

const routeConfig = [
    { path: '/',
      component: Login
    },
    { path: '/dashboard',
      component: Welcome
    },
    {
        path: '/404',
        component: NotFound
    },
    {
        path: '/basic/table',
        component: Table
    }
]
 
export default routeConfig;