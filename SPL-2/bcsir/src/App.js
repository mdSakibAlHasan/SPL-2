import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,

  },
  {

  }
])


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
