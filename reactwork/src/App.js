
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Forgotpassword from "./components/Forgotpassword";
import Areyouhere from "./components/Areyouhere";
import Investorregister from "./components/investor/Register";
import Founderregister from "./components/founder/Register";
import Investordashboard from "./components/investor/Dashbord";
import Founderdashboard from "./components/founder/Dashbord";
import ViewMore from "./components/investor/Viewmore";
import FounderViewMore from "./components/founder/Viewmore";
import VerifyOTP from "./components/Verifyotp";
import InvestorProfile from "./components/investor/Profile";
import FounderProfile from "./components/founder/Profile";

function App(){
  return <>
  
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/sign-in" element={<Signin/>}/>
      <Route path="/sign-up" element={<Signup/>}/>
      <Route path="/forgot-password" element={<Forgotpassword/>}/>
      <Route path="/are-you-here" element={<Areyouhere/>}/>
      <Route path="/investor/register" element={<Investorregister/>}/>
       <Route path="/founder/register" element={<Founderregister/>}/>
       <Route path="/investor/dashboard" element={<Investordashboard/>}/>
       <Route path="/founder/dashboard" element={<Founderdashboard/>}/>
       <Route path="/investor/:id" element={<ViewMore/>}/>
        <Route path="/founder/:id" element={<FounderViewMore/>}/>
       <Route path="/verify-otp" element={<VerifyOTP/>}/>
       <Route path="/investor/profile/:id" element={<InvestorProfile/>}/>
        <Route path="/founder/profile/:id" element={<FounderProfile/>}/>
    </Routes>
  </>
}

export default App;
