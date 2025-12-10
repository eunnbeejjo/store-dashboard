import ChartPage from '../pages/Chart';
import DetailPage from '../pages/Detail';
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
        <Route path="list/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
