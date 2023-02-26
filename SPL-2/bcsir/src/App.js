import {
  createBrowserRouter,
  
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import ForgotPass from "./Pages/ForgotPass";
import "./style.scss";


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
    path: "/ForgotPass",
    element: <ForgotPass/>,
  }
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

export default App;
