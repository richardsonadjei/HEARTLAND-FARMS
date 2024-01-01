

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
import CreateFeedNameForm from './pages/poultry/FeedName';
import FeedTransactionReport from './pages/poultry/reports/FeedTransactionReport';
import FinancialReports from './pages/poultry/reports/FinancialReports';
import FeedManagement from './pages/FeedManagement';
import RequestFeed from './pages/FeedRequest';
import FeedRequestApproval from './pages/FeedRequestApproval';
import ApproveFeedRequest from './pages/ApproveFeedRequest';
import SearchFeedName from './pages/SearchFeedName';
import ViewFeed from './pages/ViewFeed';
import FeedStockReport from './pages/poultry/reports/AllFeedStock';
import Medication from './pages/Medication';
import AllVaccinesReport from './pages/poultry/reports/AllVaccinesReport';
import CreateMedicationCategory from './pages/CreateMedicationCategory';
import AddVaccine from './pages/AddVaccine';
import AllMedicationCategoryReport from './pages/AllMedicationCategory';
import AddDrugs from './pages/AddDrug';
import AllDrugs from './pages/AllDrugs';
import RecordVaccination from './pages/RecordVaccination';
import BatchVaccinationReport from './pages/BatchVaccinationReport';
import DewormBirds from './pages/poultry/DewormBirds';
import BatchDewormingReport from './pages/poultry/reports/BatchDewormingHistory';
import DewormingReport from './pages/poultry/DewormingReport';
import RecordHealthCondition from './pages/poultry/RecordHealthCondition';
import Treatment from './pages/poultry/Treatment';
import BatchTreatmentReport from './pages/poultry/reports/BatchTreatmentReport';
import FarmSectionReport from './pages/poultry/reports/FarmSectionReport';
import RecordUnsortedEggs from './pages/poultry/reports/AddUnsortedEggs';
import DailyUnsortedEggReport from './pages/poultry/reports/DailyUnsortedEggsReport';
import AddSortedEggs from './pages/poultry/AddSortedEggs';
import DailySortedEggReport from './pages/poultry/reports/DailySortedEggsReport';
import SellEggs from './pages/poultry/SellEggs';
import EggSalesReport from './pages/poultry/reports/EggSalesReport';
import SellBirds from './pages/poultry/SellBirds';
import BirdSalesReport from './pages/poultry/reports/BirdSalesReport';
import RecordBirdMortality from './pages/poultry/BirdMortality';
import BirdMortalityReport from './pages/poultry/reports/AllBatchMortalityReport';
import BatchBirdMortalityReport from './pages/poultry/reports/BirdBatchMortalityReport';



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
          <Route path='/new-feed-name' element={<CreateFeedNameForm/>} />
          <Route path='/feed-transactions' element={<FeedTransactionReport/>} />
          <Route path='/financial-reports' element={<FinancialReports/>} />
          <Route path='/feed-management' element={<FeedManagement/>} />
          <Route path='/request-feed' element={<RequestFeed/>} />
          <Route path='/request-feed-approvals' element={<FeedRequestApproval/>} />
          <Route path='/approve-feed-requests' element={<ApproveFeedRequest/>} />
          <Route path='/search-feed-name' element={<SearchFeedName/>} />
          <Route path='/view-feed/:id' element={<ViewFeed />} />
          <Route path='/view-all-feed-stock' element={<FeedStockReport/>} />
          <Route path='/add-vaccine' element={<AddVaccine/>} />
          <Route path='/medication' element={<Medication/>} />
          <Route path='/all-vaccines' element={<AllVaccinesReport/>} />
          <Route path='/create-medication-category' element={<CreateMedicationCategory/>} />
          <Route path='/all-medication-category' element={<AllMedicationCategoryReport/>} />
          <Route path='/add-drug' element={<AddDrugs/>} />
          <Route path='/all-drug' element={<AllDrugs/>} />
          <Route path='/record-vaccination' element={<RecordVaccination/>} />
          <Route path='/batch-vaccination-history' element={<BatchVaccinationReport/>} />
          <Route path='/deworm-birds' element={<DewormBirds/>} />
          <Route path='/batch-deworming-history' element={<BatchDewormingReport/>} />
          <Route path='/deworming-history' element={<DewormingReport/>} />
          <Route path='/add-health-condition' element={<RecordHealthCondition/>} />
          <Route path='/add-treatment' element={<Treatment/>} />
          <Route path='/batch-treatment-report' element={<BatchTreatmentReport/>} />
          <Route path='/farm-section-report' element={<FarmSectionReport/>} />
          <Route path='/add-unsorted-eggs' element={<RecordUnsortedEggs/>} />
          <Route path='/add-sorted-eggs' element={<AddSortedEggs/>} />
          <Route path='/daily-unsorted-eggs-report' element={<DailyUnsortedEggReport/>} />
          <Route path='/daily-sorted-eggs-report' element={<DailySortedEggReport/>} />
          <Route path='/sell-eggs' element={<SellEggs/>} />
          <Route path='/egg-sales-report' element={<EggSalesReport/>} />
          <Route path='/sell-birds' element={<SellBirds/>} />
          <Route path='/bird-sales-report' element={<BirdSalesReport/>} />
          <Route path='/bird-mortality' element={<RecordBirdMortality/>} />
          <Route path='/all-batches-mortality-report' element={<BirdMortalityReport/>} />
          <Route path='/batch-mortality-report' element={<BatchBirdMortalityReport/>} />
         

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
