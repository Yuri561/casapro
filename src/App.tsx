import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/LogIn/Login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap routes with Layout */}
        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/create-account"
          element={
            <Layout>
              <CreateAccount />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
