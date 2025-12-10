import ChartPage from '../pages/Chart';
import HomePage from '../pages/Home';
import ListPage from '../pages/List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="chart" element={<ChartPage />} />
        <Route path="list" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
