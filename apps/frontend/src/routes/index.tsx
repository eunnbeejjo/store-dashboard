import ChartPage from '../pages/Chart';
import HomePage from '../pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="chart" element={<ChartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
