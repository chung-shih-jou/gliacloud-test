import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LoadingProvider from 'provider/Loading';
import Loading from 'components/Loading';
import MainLayout from 'layout/main';
import PageNotFound from 'components/PageNotFound';
import { routes } from 'routes';

function RenderRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route {...route} key={route.key} element={<MainLayout>{route.element}</MainLayout>} />
      ))}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <LoadingProvider>
          <RenderRoutes />
        </LoadingProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
