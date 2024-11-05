import { lazy } from 'react';

const HomePage = lazy(() => import('pages/Home'));

const Routes = [
  {
    key: 'home',
    path: '/',
    element: <HomePage />
  }
];

export default [...Routes];
