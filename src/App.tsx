import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/LogIn/Login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import UserDashboard from "./components/Pages/userDashboard";
import Profile from "./components/MyProfile/MyProfile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"; 
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
          <ToastContainer position="top-center" autoClose={2500}/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<Contact/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
