import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/LogIn/Login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Layout from "./components/Layout/Layout";
import UserDashboard from "./components/Pages/userDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

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

        <Route
          path="/dashboard"
          element={
            <Layout>
              <UserDashboard />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;