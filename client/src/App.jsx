

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
import GuineaFowl from './pages/guineaFowl/GettingStartedFowl';
import GuineaFowlDashboard from './pages/guineaFowl/GuineaFowlDashBoard';
import RecordGuineaFowl from './pages/guineaFowl/RecordGuineaFowl';
import UpdateGuineaFowlStock from './pages/guineaFowl/UpdateGuineaFowlStock';
import AllGuineaFowlReport from './pages/guineaFowl/reports/AllGuineaFowlReport';
import GuineaFowlBatchUpdateReport from './pages/guineaFowl/reports/GuineaFowlBatchUpdateHistory';
import RecordGuineaFowlVaccination from './pages/guineaFowl/RecordGuineaFowlVaccination';
import GuineaFowlMedicationDashboard from './pages/guineaFowl/GuineaFowlMedicationDashboard';
import GuineaFowlBatchVaccinationReport from './pages/guineaFowl/reports/GuineaFowlBatchVaccinationReport';
import GuineaFowlHealthRecord from './pages/guineaFowl/BookSickGuineaFowl';
import GuineaFowlTreatment from './pages/guineaFowl/GuineaFowlTreatment';
import GuineaFowlMortality from './pages/guineaFowl/GuineaFowlMortality';
import AddSortedGuineaFowlEggs from './pages/guineaFowl/AddSortedGuineaFowlEggs';
import RecordUnsortedGuineFowlEggs from './pages/guineaFowl/AddUnsortedGuineaFowlEggs';
import DailyUnsortedGuineaFowlEggReport from './pages/guineaFowl/reports/DailyUnsortedGuineaFowlEggsReport';
import DailySortedGuineaFowlEggReport from './pages/guineaFowl/reports/DailySortedGuineaFowlReport';
import GuineaFowlReportDashboard from './pages/guineaFowl/GuineaFowlReportsDashboard';
import MoveGuineaFowls from './pages/guineaFowl/MoveGuineaFowl';
import SellGuineaFowlEggs from './pages/guineaFowl/SellGuineaFowlEggs';
import GuineaFowlEggSalesReport from './pages/guineaFowl/reports/GuineaFowlEggSalesReport';
import GuineaFowlFinancialReports from './pages/guineaFowl/reports/GuineaFowlFinancialReports';
import SellGuineaFowls from './pages/guineaFowl/SellGuineaFowls';
import GuineaFowlSalesReport from './pages/guineaFowl/reports/GuineaFowlSalesReport';
import GuineaFowlBatchMortalityReport from './pages/guineaFowl/reports/GuineaFowlBatchMortalityReport';
import GuineaFowlSingleBatchUpdateHistory from './pages/guineaFowl/reports/SingleBatchStockUpdateReport';
import PigFarmDashBoard from './pages/pigs/PigFarmDashBoard';
import PigStockTracking from './pages/pigs/PigStockTracking';
import CreatePigBreed from './pages/pigs/CreatePigBreed';
import AddNewPig from './pages/pigs/AddNewPig';
import PigStock from './pages/pigs/reports/PigStockReport';
import PigFarmReportsDashBoard from './pages/pigs/reports/PigFarmReportsDashboard';
import PigCrossing from './pages/pigs/PigCrossing';
import PigCrossingReport from './pages/pigs/reports/PigCrossingReport';
import SowCrossingReport from './pages/pigs/reports/SowCrossingReport';
import RecordPigBirth from './pages/pigs/RecordPigBirth';
import SowBirthReport from './pages/pigs/reports/SowBirthReport';
import EachSowBirthReport from './pages/pigs/reports/EachSowBirthReport';
import PigMortality from './pages/pigs/PigMortality';
import PigMortalityReport from './pages/pigs/reports/MortalityReport';
import ManagePigEvents from './pages/pigs/ManagePigEvents';
import AddPigDrugs from './pages/pigs/AddPigDrugs';
import VaccinationAndTreatment from './pages/pigs/VaccinationAndTreatment';
import PigFeedManagement from './pages/pigs/PigFeedManagement';


import MaizeGettingStarted from './pages/maize/MaizeGettngStarted';
import MaizeFarmActivities from './pages/maize/MaizeFarmActivities';
import RecordMaizeLandClearance from './pages/maize/MaizeLandClearance';
import MaizeFarmReportsDashboard from './pages/maize/maizeReports/MaizeFarmReports';
import MaizeSeasonReport from './pages/maize/maizeReports/MaizeSeasonsReport';
import MaizeSeasonalLandPreparationReport from './pages/maize/maizeReports/MaizeSeasonalLandPreparationReport';
import PlantMaize from './pages/maize/MaizePlantingRecord';
import MaizeSeasonalPlantingReport from './pages/maize/maizeReports/MaizeSeasonalPlantingReports';
import MaizeFertilizerApplication from './pages/maize/MaizeFertilizerApplication';
import MaizeManualWeeding from './pages/maize/MaizeManualWeeding';
import MaizeWeedicideApplication from './pages/maize/MaizeWeedicideApplication';
import MaizeWeedControlReport from './pages/maize/maizeReports/MaizeWeedControl';
import MaizeHarvest from './pages/maize/MaizeHarvest';
import MaizeHarvestReport from './pages/maize/maizeReports/MaizeHarvestReport';
import MaizeFertilizerApplicationReport from './pages/maize/maizeReports/MaizeFertilizerApplicationReport';
import SeasonalMaizeExpenseReport from './pages/maize/maizeReports/MaizeSeasonalExpenseReport';
import MaizeFinancialActivities from './pages/maize/MaizeFinancialActivities';
import SellMaize from './pages/maize/SellMaize';
import SeasonalMaizeProfitLossReport from './pages/maize/maizeReports/SeasonalMaizeProfitLossReport';
import PurchaseMaizeFertilizer from './pages/maize/MaizeFarmFertilizerPurchase';
import MaizeFarmMiscellaneousExpense from './pages/maize/MaizeFarmMiscelleneousExpense';


import CassavaGettingStarted from './pages/cassava/CassavaGettingStarted';
import CassavaFarmActivities from './pages/cassava/CassavaFarmActivities';
import CassavaFarmReportsDashboard from './pages/cassava/reports/CassavaFarmReports';
import CassavaSeasonReport from './pages/cassava/reports/CassavaSeaonsReport';
import RecordCassavaSeasonalLandPreparation from './pages/cassava/CassavaLandPreparation';
import PlantCassava from './pages/cassava/PlantCassava';
import CassavaFertilizerApplication from './pages/cassava/CassavaFertilizerApplication';
import CassavaManualWeeding from './pages/cassava/CassavaManualWeeding';
import CassavaWeedicideApplication from './pages/cassava/CassavaWeedicideApplication';
import CassavaHarvest from './pages/cassava/CassavaHarvest';
import CassavaSeasonalLandPreparationReport from './pages/cassava/reports/CassavaLandPreparationReport';
import CassavaSeasonalPlantingReport from './pages/cassava/reports/CassavaPlantingsReport';
import CassavaWeedControlReport from './pages/cassava/reports/CassavaWeedControl';
import CassavaFertilizerApplicationReport from './pages/cassava/reports/CassavaFertilizerApplicationReport';
import CassavaHarvestReport from './pages/cassava/reports/CassavaHarvestReports';
import SeasonalCassavaExpenseReport from './pages/cassava/reports/CassavaSeasonalExpenseReport';
import CassavaFinancialActivities from './pages/cassava/CassavaFinancialActivities';
import SellCassava from './pages/cassava/CassavaSales';
import CassavaSalesReport from './pages/cassava/reports/CassavaSalesReport';
import PurchaseCassavaFertilizer from './pages/cassava/CassavaFertilizerPurchase';
import CassavaFarmWeedicidePurchase from './pages/cassava/CassavaFarmWeedicidePurchase';
import CassavaFarmMiscellaneousExpense from './pages/cassava/CassavaFarmMiscExpense';
import SeasonalCassavaProfitLossReport from './pages/cassava/reports/CassavaSeasonalProfitLossReport';


import PoultryGettingStarted from './pages/poultry/PoultryGettingStarted';
import PoultryStockActivities from './pages/poultry/PoultryStockActivities';
import EggManagementActivities from './pages/poultry/EggManagementActivities';
import FeedAndHealthManagement from './pages/poultry/FeedHealthManagement';
import PoultryHealthManagement from './pages/poultry/PoultryHealthManagement';
import PoultryReportActivities from './pages/poultry/reports/PoultryReportsDashboard';
import PoultryFinancialActivities from './pages/poultry/PoultryFinancialActivities';
import PoultryExpenditureActivities from './pages/poultry/PoultryExpenditureActivities';
import PoultryIncomeActivities from './pages/poultry/PoultryIncomeActivities';
import AllBirdVaccinationReport from './pages/poultry/reports/AllBirdVaccinationsReport';
import BirdBatchVaccinationReport from './pages/poultry/reports/BatchVaccinationReport';


import Settings from './components/Settings';








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


          <Route path='/settings' element={<Settings/>} />
          <Route path='/poultry' element={<Poultry />} />
          <Route path='/poultry-getting-started' element={<PoultryGettingStarted />} />
          <Route path='/poultry-stock-activities' element={<PoultryStockActivities />} />


          <Route path='/poultry-dashboard' element={<PoultryDashboard/>} />
          <Route path='/create-poultry' element={<CreatePoultry/>} />
          <Route path='/farm-section' element={<CreateFarmSection/>} />
          <Route path='/stock-tracking' element={<StockTracking/>} />
          <Route path='/poultry-report' element={<PoultryReport/>} />
          <Route path='/stock-reports' element={<StockReport/>} />
          <Route path='/poultry-stock-summary-report' element={<AllBatches/>} />
          <Route path='/create-breed' element={<CreateBreed/>} />
          <Route path='/extras' element={<Extras/>} />
          <Route path='/age-report' element={<AgeReport/>} />
          <Route path='/move-birds' element={<Movement/>} />
          <Route path='/poultry-relocation-report' element={<MovementByDate/>} />
          <Route path='/update-batch' element={<UpdateBatch/>} />
          <Route path='/update-history' element={<BatchUpdateHistory/>} />
          <Route path='/add-birds' element={<AddBirds/>} />
          <Route path='/add-history' element={<BirdsAdditionHistory/>} />
          <Route path='/finance' element={<Finance/>} />

          <Route path='/create-supplier' element={<CreateSupplier/>} />
          <Route path='/all-suppliers' element={<AllSuppliers/>} />
          <Route path='/update-supplier' element={<UpdateSupplier/>} />
          <Route path='/expense-category' element={<ExpenseCategory/>} />

          <Route path='/feed-health-management' element={<FeedAndHealthManagement/>} />
          <Route path='/poultry-health-management' element={<PoultryHealthManagement/>} />
          <Route path='/poultry-report-dashboard' element={<PoultryReportActivities/>} />
          <Route path='/poultry-financial-activities' element={<PoultryFinancialActivities/>} />
          <Route path='/poultry-expenditure-activities' element={<PoultryExpenditureActivities/>} />
          <Route path='/poultry-income-activities' element={<PoultryIncomeActivities/>} />

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
          <Route path='/treat-sick-birds' element={<Treatment/>} />
          <Route path='/batch-treatment-report' element={<BatchTreatmentReport/>} />
          <Route path='/farm-section-report' element={<FarmSectionReport/>} />
          <Route path='/all-bird-vaccinations-report' element={<AllBirdVaccinationReport/>} />
          <Route path='/batch-vaccinations-report' element={<BirdBatchVaccinationReport/>} />



          <Route path='/egg-management-activities' element={<EggManagementActivities/>} />
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


          <Route path='/guinea-fowl-getting-started' element={<GuineaFowl/>} />
          <Route path='/guinea-fowl-dashboard' element={<GuineaFowlDashboard/>} />
          <Route path='/new-guineaFowl' element={<RecordGuineaFowl/>} />
          <Route path='/add-guineaFowl' element={<UpdateGuineaFowlStock/>} />
          <Route path='/all-guineaFowls' element={<AllGuineaFowlReport/>} />
          <Route path='/guineaFowls-batch-update-history' element={<GuineaFowlBatchUpdateReport/>} />
          <Route path='/move-guinea-fowls' element={<MoveGuineaFowls/>} />
          <Route path='/record-guinea-fowl-vaccination' element={<RecordGuineaFowlVaccination/>} />
          <Route path='/guinea-fowl-medication-dashboard' element={<GuineaFowlMedicationDashboard/>} />
          <Route path='/guinea-fowl-batch-vaccination-report' element={<GuineaFowlBatchVaccinationReport/>} />
          <Route path='/book-sick-guinea-fowl' element={<GuineaFowlHealthRecord/>} />
          <Route path='/treat-sick-guinea-fowl' element={<GuineaFowlTreatment/>} />
          <Route path='/record-guinea-fowl-mortality' element={<GuineaFowlMortality/>} />
          <Route path='/record-sorted-guinea-fowl-eggs' element={<AddSortedGuineaFowlEggs/>} />
          <Route path='/record-unsorted-guinea-fowl-eggs' element={<RecordUnsortedGuineFowlEggs/>} />
          <Route path='/view-daily-unsorted-guinea-fowl-eggs' element={<DailyUnsortedGuineaFowlEggReport/>} />
          <Route path='/view-daily-sorted-guinea-fowl-eggs' element={<DailySortedGuineaFowlEggReport/>} />
          <Route path='/guinea-fowl-report-dashboard' element={<GuineaFowlReportDashboard/>} />
          <Route path='/sell-guinea-fowl-eggs' element={<SellGuineaFowlEggs/>} />
          <Route path='/view-guinea-fowl-eggs-sales-within-a-period' element={<GuineaFowlEggSalesReport/>} />
          <Route path='/guinea-fowl-financial-reports' element={<GuineaFowlFinancialReports/>} />
          <Route path='/sell-guinea-fowls' element={<SellGuineaFowls/>} />
          <Route path='/guinea-fowls-sales-report' element={<GuineaFowlSalesReport/>} />
          <Route path='/guinea-fowls-batch-mortality-report' element={<GuineaFowlBatchMortalityReport/>} />
          <Route path='/guinea-fowls-single-batch-update-report' element={<GuineaFowlSingleBatchUpdateHistory/>} />

          
          <Route path='/pig-farm-dashboard' element={<PigFarmDashBoard/>} />
          <Route path='/pig-stock-tracking' element={<PigStockTracking/>} />
          <Route path='/add-pig-breed' element={<CreatePigBreed/>} />
          <Route path='/add-new-pig' element={<AddNewPig/>} />
          <Route path='/pig-stock-report' element={<PigStock/>} />
          <Route path='/pig-farm-reports' element={<PigFarmReportsDashBoard/>} />
          <Route path='/pig-crossing' element={<PigCrossing/>} />
          <Route path='/pig-crossing-report' element={<PigCrossingReport/>} />
          <Route path='/sow-crossing-report' element={<SowCrossingReport/>} />
          <Route path='/record-pig-birth' element={<RecordPigBirth/>} />
          <Route path='/pig-birth-report' element={<SowBirthReport/>} />
          <Route path='/each-pig-birth-report' element={<EachSowBirthReport/>} />
          <Route path='/add-pig-mortality' element={<PigMortality/>} />
          <Route path='/pig-mortality' element={<PigMortalityReport/>} />
          <Route path='/manage-pig-events' element={<ManagePigEvents/>} />
          <Route path='/add-pig-drugs' element={<AddPigDrugs/>} />
          <Route path='/vaccination-health-management' element={<VaccinationAndTreatment/>} />
          <Route path='/pig-feed-management' element={<PigFeedManagement/>} />

          
          <Route path='/maize-getting-started' element={<MaizeGettingStarted/>} />
          <Route path='/maize-farm-activities' element={<MaizeFarmActivities/>} />
          <Route path='/maize-land-clearance' element={<RecordMaizeLandClearance/>} />
          <Route path='/maize-farm-report-dashboard' element={<MaizeFarmReportsDashboard/>} />
          <Route path='/maize-seasons-report' element={<MaizeSeasonReport/>} />
          <Route path='/maize-seasonal-LandPreparation-report' element={<MaizeSeasonalLandPreparationReport/>} />
          <Route path='/plant-maize' element={<PlantMaize/>} />
          <Route path='/maize-seasonal-planting-report' element={<MaizeSeasonalPlantingReport/>} />
          <Route path='/maize-fertilizer-application' element={<MaizeFertilizerApplication/>} />
          <Route path='/maize-manual-weeding' element={<MaizeManualWeeding/>} />
          <Route path='/maize-weedicide-application' element={<MaizeWeedicideApplication/>} />
          <Route path='/maize-weed-control-report' element={<MaizeWeedControlReport/>} />
          <Route path='/maize-harvest' element={<MaizeHarvest/>} />
          <Route path='/maize-harvest-report' element={<MaizeHarvestReport/>} />
          <Route path='/maize-fertilizer-application-report' element={<MaizeFertilizerApplicationReport/>} />
          <Route path='/maize-seasonal-expense-report' element={<SeasonalMaizeExpenseReport/>} />
          <Route path='/maize-financial-activities' element={<MaizeFinancialActivities/>} />
          <Route path='/sell-maize' element={<SellMaize/>} />
          <Route path='/sell-maize' element={<SellMaize/>} />
          <Route path='/maize-profit-loss-report' element={<SeasonalMaizeProfitLossReport/>} />
          <Route path='/maize-farm-fertilizer-purchase' element={<PurchaseMaizeFertilizer/>} />
          <Route path='/maize-farm-weedicide-purchase' element={<PurchaseMaizeFertilizer/>} />
          <Route path='/maize-farm-misc-expense' element={<MaizeFarmMiscellaneousExpense/>} />


          {/* CASSAVA ROUTES */}
          <Route path='/cassava-getting-started' element={<CassavaGettingStarted/>} />
          <Route path='/cassava-farm-activities' element={<CassavaFarmActivities/>} />
          <Route path='/cassava-farm-report' element={<CassavaFarmReportsDashboard/>} />
          <Route path='/cassava-seasons-report' element={<CassavaSeasonReport/>} />
          <Route path='/cassava-land-preparation' element={<RecordCassavaSeasonalLandPreparation/>} />
          <Route path='/plant-cassava' element={<PlantCassava/>} />
          <Route path='/cassava-fertilizer-application' element={<CassavaFertilizerApplication/>} />
          <Route path='/cassava-manual-weeding' element={<CassavaManualWeeding/>} />
          <Route path='/cassava-weedicide-application' element={<CassavaWeedicideApplication/>} />
          <Route path='/cassava-harvest' element={<CassavaHarvest/>} />
          <Route path='/cassava-land-preparations-report' element={<CassavaSeasonalLandPreparationReport/>} />
          <Route path='/cassava-plantings-report' element={<CassavaSeasonalPlantingReport/>} />
          <Route path='/cassava-weed-control-report' element={<CassavaWeedControlReport/>} />
          <Route path='/cassava-fertilizer-application-report' element={<CassavaFertilizerApplicationReport/>} />
          <Route path='/cassava-harvest-report' element={<CassavaHarvestReport/>} />
          <Route path='/cassava-seasonal-expense-report' element={<SeasonalCassavaExpenseReport/>} />
          <Route path='/cassava-financial-activities' element={<CassavaFinancialActivities/>} />
          <Route path='/sell-cassava' element={<SellCassava/>} />
          <Route path='/cassava-sales-report' element={<CassavaSalesReport/>} />
          <Route path='/cassava-fertilizer-purchase' element={<PurchaseCassavaFertilizer/>} />
          <Route path='/cassava-weedicide-purchase' element={<CassavaFarmWeedicidePurchase/>} />
          <Route path='/cassava-misc-expense' element={<CassavaFarmMiscellaneousExpense/>} />
          <Route path='/cassava-profit-loss-report' element={<SeasonalCassavaProfitLossReport/>} />
          
         
        
          
         

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
