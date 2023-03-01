import React from "react";
import ReactDOM from "react-dom/client";
//import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AuthContexProvider } from "./compute/authContex";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContexProvider>
      {/* <MemoryRouter
        initialEntries={["/ForgotPass","/CodePage",{pathname: "/recover"}]}
        initialIndex={1}
        > */}
      <App />
      {/* </MemoryRouter> */}
    </AuthContexProvider>
  </React.StrictMode>
);


//<MemoryRouter
// initialEntries={["/one", "/two", { pathname: "/three" }]}
// initialIndex={1}
// >