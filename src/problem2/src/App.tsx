import { MainLayout } from '@/components/layouts';
import { AppProvider } from '@/components/providers';
import { HomePage, NotFoundPage } from '@/pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
  <AppProvider>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  </AppProvider>
);

export default App;
