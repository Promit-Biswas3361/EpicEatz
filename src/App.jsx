import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Frontend/Landing";
import Search from "./Frontend/Search";
import GetStarted from "./Frontend/New-partner/GetStarted";
import Step1 from "./Frontend/New-partner/Step1";
import Step2 from "./Frontend/New-partner/Step2";
import Cart from "./Frontend/Cart";
import Step3 from "./Frontend/New-partner/Step3";
import Account from "./Frontend/UserProfile/Account";
import Orders from "./Frontend/UserProfile/Orders";
import Favourites from "./Frontend/UserProfile/Favourites";
import Settings from "./Frontend/UserProfile/Settings";
import Address from "./Frontend/UserProfile/Address";
import Checkout from "./Frontend/Checkout";
import OrderConfirmation from "./Frontend/OrderConfirmation";
import AboutUs from "./Frontend/AboutUs";
import Contact from "./Frontend/Contact";
import OwnerAccount from "./Frontend/OwnerProfile/OwnerAccount";
import OwnerOrders from "./Frontend/OwnerProfile/OwnerOrders";
import OwnerSettings from "./Frontend/OwnerProfile/OwnerSettings";
import MenuTimings from "./Frontend/OwnerProfile/MenuTimings";
import RestaurantDetails from "./Frontend/OwnerProfile/RestaurantDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dish/:id" element={<Search />} />
        <Route path="/restaurant/:id" element={<Search />} />
        <Route path="/new-partner/get-started" element={<GetStarted />} />
        <Route path="/new-partner/step1" element={<Step1 />} />
        <Route path="/new-partner/step2" element={<Step2 />} />
        <Route path="/new-partner/step3" element={<Step3 />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/account" element={<Account />}>
          <Route path="orders" element={<Orders />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="settings" element={<Settings />} />
          <Route path="addresses" element={<Address />} />
          <Route index element={<Orders />} />
        </Route>

        <Route path="/owner-account" element={<OwnerAccount />}>
          <Route path="orders" element={<OwnerOrders />} />
          <Route path="menu" element={<MenuTimings />} />
          <Route path="settings" element={<OwnerSettings />} />
          <Route path="details" element={<RestaurantDetails />} />
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
