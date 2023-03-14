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
//import { BrowserRouter as  Route } from 'react-router-dom';
let profileID;
export const FunctionInfo = (researcherID)=>{
  profileID = researcherID;
  console.log(profileID+" inside app");
}

export const getID = ()=>{
  return profileID;
}

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
    path: "/profile",
    element: <Profile id={profileID}/>,
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
