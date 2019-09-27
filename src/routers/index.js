import NotFound from '../pages/notFound';
import Welcome from '../pages/welcome';
import Table from '../pages/basic/table';

const routeConfig = [
    { path: '/dashboard',
      component: Welcome
    },
    {
        path: '/404',
        component: NotFound
    },
    {
        path: '/dashboard/basic/table',
        component: Table
    }
]
 
export default routeConfig;