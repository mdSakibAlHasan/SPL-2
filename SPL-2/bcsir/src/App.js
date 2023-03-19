import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Frame/Login";
import {ForgotPass, CodePage, InputPass} from "./Pages/ForgotPass";
import RecoveryPassword from "./Frame/Recovery_Password";
// import "./style.scss";
// import "./as.css";
import Register from "./Frame/Registration";
import Profile from "./Components/ProfileUI";
import ChangePass from "./Frame/Change_Password";
import AuthRequire from "./Pages/AuthRequire";

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


//import { BrowserRouter as  Route } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,

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
    path: "/CodePage",
    element: <CodePage/>,
  },
  {
    path: "/inputPass",
    element: <InputPass/>,
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
    path: "/profile/:id",
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

]);


function App() {
  return (
    <div className="App">
      <div className="Container">
      <RouterProvider router={router} />
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
