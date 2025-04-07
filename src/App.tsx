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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#e8f4f8] via-[#dbeef7] to-[#c8e2f0]">

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
    </div>
  );
}

export default App;
