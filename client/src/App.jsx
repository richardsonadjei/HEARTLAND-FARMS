

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import SignOut from './pages/SignOut';
import PrivateRoute from './components/PrivateRoute';
import ViewAllUsers from './pages/ViewAllUsers';
import Poultry from './pages/Poultry';
import PoultryDashboard from './pages/poultry/PoultryDashboard';
import CreatePoultry from './pages/poultry/CreatePoultry';
import CreateFarmSection from './pages/CreateFarmSection';
import StockTracking from './pages/poultry/StockTracking';
import StockReport from './pages/poultry/reports/StockReports';
import AllBatches from './pages/poultry/reports/AllBatches';
import PoultryReport from './pages/poultry/PoultryReport';
import CreateBreed from './pages/poultry/CreateBreed';
import Extras from './pages/poultry/Extras';
import AgeReport from './pages/poultry/reports/AgeReport';
import Movement from './pages/poultry/Movement';
import MovementByDate from './pages/poultry/reports/MovementByDate';
import UpdateBatch from './pages/poultry/UpdateBatch';
import BatchUpdateHistory from './pages/poultry/reports/BatchUpdateHistory';
import AddBirds from './pages/poultry/AddBirds';
import BirdsAdditionHistory from './pages/poultry/reports/BirdAdditionHistory';
import Finance from './pages/Finance';
import CreateSupplier from './pages/CreateSupplier';
import AllSuppliers from './pages/AllSuppliers';
import UpdateSupplier from './pages/UpdateSupplier';
import ExpenseCategory from './pages/ExpenseCategory';
import PurchaseFeed from './pages/PurchaseFeed';
import CreateFeedCategory from './pages/CreateFeedCategory';
import AllFeedCategories from './pages/AllFeedCategories';



export default function App() {
  return (
    <BrowserRouter>
      <Header />
     
      <Routes>
      <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-out' element={<SignOut/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/allusers' element={<ViewAllUsers/>} />
          
          <Route path='/poultry' element={<Poultry />} />
          <Route path='/poultry-dashboard' element={<PoultryDashboard/>} />
          <Route path='/create-poultry' element={<CreatePoultry/>} />
          <Route path='/farm-section' element={<CreateFarmSection/>} />
          <Route path='/stock-tracking' element={<StockTracking/>} />
          <Route path='/poultry-report' element={<PoultryReport/>} />
          <Route path='/stock-reports' element={<StockReport/>} />
          <Route path='/all-batches' element={<AllBatches/>} />
          <Route path='/create-breed' element={<CreateBreed/>} />
          <Route path='/extras' element={<Extras/>} />
          <Route path='/age-report' element={<AgeReport/>} />
          <Route path='/move-birds' element={<Movement/>} />
          <Route path='/date-movement' element={<MovementByDate/>} />
          <Route path='/update-batch' element={<UpdateBatch/>} />
          <Route path='/update-history' element={<BatchUpdateHistory/>} />
          <Route path='/add-birds' element={<AddBirds/>} />
          <Route path='/add-history' element={<BirdsAdditionHistory/>} />
          <Route path='/finance' element={<Finance/>} />
          <Route path='/create-supplier' element={<CreateSupplier/>} />
          <Route path='/all-suppliers' element={<AllSuppliers/>} />
          <Route path='/update-supplier' element={<UpdateSupplier/>} />
          <Route path='/expense-category' element={<ExpenseCategory/>} />
          <Route path='/purchase-feed' element={<PurchaseFeed/>} />
          <Route path='/create-feed-category' element={<CreateFeedCategory/>} />
          <Route path='/all-feed-category' element={<AllFeedCategories/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
