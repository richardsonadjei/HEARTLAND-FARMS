import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';





import BeforeStartExpenses from './pages/BeforeStartExpenses';
import AllBeforeExpenses from './pages/AllBeforeStartExpenses';


// import AllSeasonsReport from './components/AllSeasons';
// import AllInactiveSeasonsReport from './components/AllInactiveSeasons';
import VegesHomepage from './pages/vegetables/VegesHomePage';
import CabbageFarmManager from './pages/vegetables/cabbage/CabbageHome';
import AllFarmActivities from './pages/vegetables/AllVeges/FarmActivities';
import Extras from './pages/vegetables/AllVeges/Extras';
import IncomeAndExpenseHome from './pages/vegetables/finance/IncomeAndExpenseHome';
import SpringOnionFarmManager from './pages/vegetables/springOnion/SpringOnionHome';
import GreenPepperFarmManager from './pages/vegetables/GreenPepper/GreenPepperHome';
import CarrotHomeFarmManager from './pages/vegetables/Carrot/CarrotHome';
import CashCropsHomepage from './pages/CashCrops/CashCropsHome';
import CashCropsExtras from './pages/CashCrops/CashCropsExtras';
import CashCropAllFarmActivities from './pages/CashCrops/CashCropsFarmActivities';
import MaizeFarmManager from './pages/CashCrops/Maize/MaizeHome';
import CassavaFarmManager from './pages/CashCrops/Cassava/CassavaHomePage';
import PlantainFarmManager from './pages/CashCrops/Plantain/PlantainHome';
import CashCropFinanceHome from './pages/CashCrops/Finance/FinanceHome';
import PalmFarmManager from './pages/CashCrops/Palm Plantation/PalmHome';
import AllVegeNursings from './pages/vegetables/AllVeges/AllVegesActivitiesReport/AllVegeNursingReport';
import AllVegeTransplantings from './pages/vegetables/AllVeges/AllVegesActivitiesReport/AllVegeTransplantingReport';
import AllVegeDirectPlantings from './pages/vegetables/AllVeges/AllVegesActivitiesReport/AllVegesDirectPlantingReport';
import AllVegeFertilizerApplications from './pages/vegetables/AllVeges/AllVegesActivitiesReport/AllVegesFertilizerApplication';
import AllVegePestAndWeedControls from './pages/vegetables/AllVeges/AllVegesActivitiesReport/PestAndWeedControlsReport';
import AllVegeExpenses from './pages/vegetables/AllVeges/AllVegesActivitiesReport/ExpensesReport';
import PepperFarmManager from './pages/vegetables/Pepper-TohToh/PepperHome';
import CucumberFarmManager from './pages/vegetables/Cucumber/CucumberHome';
import LettuceFarmManager from './pages/vegetables/Lettuce/LettuceHome';
import OkroFarmManager from './pages/vegetables/Okro/OkroHome';
import TomatoFarmManager from './pages/vegetables/Tomato/TomatoHome';
import FarmAnimalsHomepage from './pages/Animals/FarmAnimalsHome';
import AnimalsExtras from './pages/Animals/AnimalsExtras';
import AnimalFarmActivities from './pages/Animals/AnimalFarmActivities';
import FinanceHome from './pages/Animals/finance/FinanceHome';
import GoatsHome from './pages/Animals/Goats/GoatsHome';
import SheepHome from './pages/Animals/Sheep/SheepHome';
import PigHome from './pages/Animals/Pigs/PigHome';
import CattleHome from './pages/Animals/Cattle/CattleHome';
import BirdsHomepage from './pages/Birds/BirdsHome';
import BirdFarmActivities from './pages/Birds/farm Activities/BirdsFarmActivities';
import PoultryHome from './pages/Birds/Poultry/PoultryHome';
import BirdExtras from './pages/Birds/extras/BirdsExtras';
import BirdsFinanceHome from './pages/Birds/finance/FinanceHome';
import CollectEggs from './pages/Birds/farm Activities/CollectEggs';
import BirdsHatcheryHome from './pages/Birds/Hatchery/HatcheryHome';
import TurkeyHome from './pages/Birds/Turkey/TurkeyHome';
import DuckHome from './pages/Birds/Ducks/DucksHome';
import GuineaFowlHome from './pages/Birds/GuineaFowl/GuineaFowlHome';
import HumanResourceManagement from './components/Human Resource/HRHome';
import UpdateUser from './pages/UpdateUser';
import Dashboard from './pages/MainDashBoard';

import AccountMonitoringDashboard from './pages/Dashboards/AccountMonitoringDashboard';
import AddFarmExpense from './pages/Dashboards/Finance/AddFarmExpense';
import AddPartnerContribution from './pages/Dashboards/Finance/AddPartnersContribution';
import RecordSalesIncome from './pages/Dashboards/Finance/AddSalesIncome';
import FinancialReports from './pages/Dashboards/Finance/reports/FinancialReportsHome';
import BirdsFarmDashboard from './pages/Dashboards/BirdsDashBoards';
import AnimalFarmDashboard from './pages/Dashboards/FarmAnimalsDashBoard';
import CashCropDashboard from './pages/Dashboards/CashCropDashBoard';
import VegetablesDashboard from './pages/Dashboards/VegetablesDashBoard';









export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        
        <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/user-update' element={<UpdateUser/>} />
          <Route path='/sign-out' element={<SignOut />} />

      


          <Route path='/before-expense' element={<BeforeStartExpenses/>} />
          <Route path='/all-before-expense' element={<AllBeforeExpenses/>} />




{/* CASHCROPS */}
<Route path='/cash-cropsHome-page' element={<CashCropsHomepage/>} />
<Route path='/cash-crops-extras' element={<CashCropsExtras/>} />
<Route path='/cash-crops-farm-activities' element={<CashCropAllFarmActivities/>} />
<Route path='/maize-home' element={<MaizeFarmManager/>} />
<Route path='/cassava-home' element={<CassavaFarmManager/>} />
<Route path='/plantain-home' element={<PlantainFarmManager/>} />
<Route path='/cashCrop-finance-home' element={<CashCropFinanceHome/>} />
<Route path='/plantain-home' element={<PlantainFarmManager/>} />
<Route path='/palm-home' element={<PalmFarmManager/>} />
{/* VEGES */}
<Route path='/vegesHome-page' element={<VegesHomepage/>} />
{/* CABBAGE */}
<Route path='/cabbage-home' element={<CabbageFarmManager/>} />
<Route path='/all-farm-activities' element={<AllFarmActivities/>} />
<Route path='/extras' element={<Extras/>} />
<Route path='/finance-veges' element={<IncomeAndExpenseHome/>} />

{/* SPRING ONION */}
<Route path='/spring-onion-home' element={<SpringOnionFarmManager/>} />

{/* GREEN PEPPER */}
<Route path='/green-pepper-home' element={<GreenPepperFarmManager/>} />

{/* CARROT */}
<Route path='/carrot-home' element={<CarrotHomeFarmManager/>} />
<Route path='/all-vege-nursings' element={<AllVegeNursings/>} />
<Route path='/all-vege-transplantings' element={<AllVegeTransplantings/>} />
<Route path='/all-vege-direct-planting' element={<AllVegeDirectPlantings/>} />
<Route path='/all-vege-fertilizer-applications' element={<AllVegeFertilizerApplications/>} />
<Route path='/all-vege-pest-and-weed-controls' element={<AllVegePestAndWeedControls/>} />
<Route path='/all-vege-expense' element={<AllVegeExpenses/>} />

{/* PEPPER TOH TOH */}
<Route path='/pepper-home' element={<PepperFarmManager/>} />
<Route path='/cucumber-home' element={<CucumberFarmManager/>} />
<Route path='/lettuce-home' element={<LettuceFarmManager/>} />
<Route path='/okro-home' element={<OkroFarmManager/>} />
<Route path='/tomato-home' element={<TomatoFarmManager/>} />

{/* ANIMALS  */}
<Route path='/animals-home-page' element={<FarmAnimalsHomepage/>} />
<Route path='/animals-extras' element={<AnimalsExtras/>} />
<Route path='/animal-farm-activity' element={<AnimalFarmActivities/>} />
<Route path='/animal-farm-finance' element={<FinanceHome/>} />
<Route path='/goats-home' element={<GoatsHome/>} />
<Route path='/sheep-home' element={<SheepHome/>} />
<Route path='/pig-home' element={<PigHome/>} />
<Route path='/cattle-home' element={<CattleHome/>} />


<Route path='/birds-home' element={<BirdsHomepage/>} />
<Route path='/birds-farm-activities' element={<BirdFarmActivities/>} />
<Route path='/poultry-home' element={<PoultryHome/>} />
<Route path='/birds-extras' element={<BirdExtras/>} />
<Route path='/birds-finance' element={<BirdsFinanceHome/>} />
<Route path='/collect-eggs' element={<CollectEggs/>} />
<Route path='/hatchery-home' element={<BirdsHatcheryHome/>} />


<Route path='/turkey-home' element={<TurkeyHome/>} />
<Route path='/duck-home' element={<DuckHome/>} />
<Route path='/guinea-fowl-home' element={<GuineaFowlHome/>} />

<Route path='/hr' element={<HumanResourceManagement/>} />
<Route path='/dashboard' element={<Dashboard/>} />

<Route path='/accounts' element={<AccountMonitoringDashboard/>} />
<Route path='/add-farm-expense' element={<AddFarmExpense/>} />
<Route path='/add-partners-contribution' element={<AddPartnerContribution/>} />
<Route path='/add-sales' element={<RecordSalesIncome/>} />
<Route path='/financial-reports' element={<FinancialReports/>} />
<Route path='/birds-farm-dashboard' element={<BirdsFarmDashboard/>} />
<Route path='/animal-farm-dashboard' element={<AnimalFarmDashboard/>} />
<Route path='/cash-crop-dashboard' element={<CashCropDashboard/>} />
<Route path='/vegetables-dashboard' element={<VegetablesDashboard/>} />


{/* EXTRAS */}
{/* <Route path='/active-seasons' element={<AllSeasonsReport/>} />
<Route path='/inactive-seasons' element={<AllInactiveSeasonsReport/>} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}