import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Frontend/Landing";
import Login from "./Frontend/Login";
import Signup from "./Frontend/Signup";
import Search from "./Frontend/Search";
import GetStarted from "./Frontend/New-partner/GetStarted";
import Step1 from "./Frontend/New-partner/Step1";
import Step2 from "./Frontend/New-partner/Step2";
import Cart from "./Frontend/Cart";
import Step3 from "./Frontend/New-partner/Step3";
import Account from "./Frontend/Profile/Account";
import Orders from "./Frontend/Profile/Orders";
import Favourites from "./Frontend/Profile/Favourites";
import Settings from "./Frontend/Profile/Settings";
import Address from "./Frontend/Profile/Address";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dish/:id" element={<Search />} />
        <Route path="/restaurant/:id" element={<Search />} />
        <Route path="/new-partner/get-started" element={<GetStarted />} />
        <Route path="/new-partner/step1" element={<Step1 />} />
        <Route path="/new-partner/step2" element={<Step2 />} />
        <Route path="/new-partner/step3" element={<Step3 />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/account" element={<Account />}>
          <Route path="orders" element={<Orders />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="settings" element={<Settings />} />
          <Route path="addresses" element={<Address />} />
          <Route index element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

//To tackle the problem of routing make 2 separate calls
// to the Database...one for matching dishes and if it return null then
// another for matching restraunt name & then redirect accordingly.
