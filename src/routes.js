import AboutPage from './components/pages/AboutPage';
import ListPage from './components/pages/ListPage';
import MenuPanelPage from './components/pages/MenuPanelPage';
import SettingsPage from './components/pages/SettingsPage';
import HomePage from './components/pages/TabsPage';

export default [
    {
        path: '/todos/',
        component: HomePage,
        tabs: [
            {
                path: '/all',
                id: 'all',
                component: ListPage
            },
            {
                path: '/active',
                id: 'active',
                component: ListPage
            },
            {
                path: '/completed',
                id: 'completed',
                component: ListPage
            }
        ]
    },
    {
        path: '/menu/',
        component: MenuPanelPage
    },
    {
        path: '/settings/',
        component: SettingsPage
    },
    {
        path: '/about/',
        component: AboutPage
    },
    {
        path: '/',
        redirect: '/todos/'
    },
    {
        path: '(.*)',
        redirect: '/todos/all'
    }
];
