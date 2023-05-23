import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./Frame/Login";
import HomeMain from "./Components/Home";
import RecoveryPassword from "./Frame/Recovery_Password";
import Register from "./Frame/Registration";
import Profile from "./Components/ProfileUI";
import ChangePass from "./Frame/Change_Password";
import AuthRequire from "./Pages/AuthRequire";
import ShowResearcherList from "./Components/ShowResearcherList";


import AchievementPublication from './Set_up_profile/AchievementPublication'
import EducationInfo from './Set_up_profile/EducationInfo'
import JoiningInfo from './Set_up_profile/JoiningInfo'
import LeaveDeputationInfo from './Set_up_profile/LeaveDeputationInfo'
import OtherJobExperience from './Set_up_profile/OtherJobExperience'
import PersonalInfoForm from './Set_up_profile/PersonalInfo'
import PostingInfo from './Set_up_profile/PostingInfo'
import PromotionInfo from './Set_up_profile/PromotionInfo'
import PS_AddressForm from'./Set_up_profile/PS_AddressForm'
import SpouseAndChildrenInfo from './Set_up_profile/SpouseAndChildrenInfo'
import TrainingInfo from './Set_up_profile/TrainingInfo'
import Navbar from "./Components/Navbar";
import Footer from "./Footer/Footer";
import './App.css';
import SetCommittee from "./R_D/SetCommittee"
import DeclareCall from "./R_D/DeclareCall"
import EditDeadline from "./R_D/EditDeadline"
import ProposalForm from "./R_D/ProposalForm";
import AddRemoveResearcher from "./R_D/AddOrRemoveResearcher";


//import { BrowserRouter as  Route } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomeMain/>,

  },
  {
    path: "/institude",
    element: <ShowResearcherList/>,

  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Register",
    element: <Register/>,
  },
  {
    path: "/ForgotPass",
    element: <RecoveryPassword/>,
  },
  {
    path: "/changePass",
    element: <ChangePass/>,
  },
  {
    path: "/authRequire",
    element: <AuthRequire/>,
  },
  {
    path: "/profile/:id",
    element: <Profile/>,
  },
  {
    path: "/achievement",
    element: <AchievementPublication/>,
  },
  {
    path: "/education",
    element: <EducationInfo/>,
  },
  {
    path: "/join",
    element: <JoiningInfo/>,
  },
  {
    path: "/levelDeputation",
    element: <LeaveDeputationInfo/>,
  },
  {
    path: "/otherjob",
    element: <OtherJobExperience/>,
  },
  {
    path: "/personalInfo",
    element: <PersonalInfoForm/>,
  },
  {
    path: "/editdateline",
    element: <EditDeadline/>,
  },
  {
    path: "/setcommittee",
    element: <SetCommittee/>,
  },
  {
    path: "/declareCall",
    element: <DeclareCall/>,
  },
  {
    path: "/submitProposal",
    element: <ProposalForm/>,
  },
  {
    path: "/addRemoveResearcher",
    element: <AddRemoveResearcher/>,
  },

]);


function App() {
  return (
    <div className="my_body">
      <div>
        <Navbar/>
      <RouterProvider router={router} />
        <Footer/>
      </div>
    </div>
    
  );
}

// export function AppWrapper() {
//   return (
//     <Router>
//       <div>
//         <Route exact path="/" component={App} />
//         <Route exact path="/CodePage" component={CodePage} />
//         <Route exact path="/ForgotPass" component={ForgotPass} />
//       </div>
//     </Router>
//   );
// }

// simple string URLs.

export default App;
