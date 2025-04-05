import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/LogIn/Login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Layout from "./components/Layout/Layout";
import UserDashboard from "./components/Pages/userDashboard";
import { AuthProvider } from "./context/AuthContext"; // ✅ Use AuthProvider
import Profile from "./components/MyProfile/MyProfile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
