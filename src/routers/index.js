import NotFound from '../pages/notFound';
import Welcome from '../pages/welcome';
import Table from '../pages/basic/table';
import UserManage from '../pages/setting/user_manage';

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
    },
    {
        path: '/dashboard/setting/user_manage',
        component: UserManage
    }
]
 
export default routeConfig;