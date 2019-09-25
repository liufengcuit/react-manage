import NotFound from '../pages/notFound';
import Welcome from '../pages/welcome';
import Login from '../pages/login';

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
    }
  ]
 
export default routeConfig;