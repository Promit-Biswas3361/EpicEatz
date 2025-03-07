import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Frontend/Landing";
import Login from "./Frontend/Login";
import Signup from "./Frontend/Signup";
import Search from "./Frontend/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dish/:id" element={<Search />} />
        <Route path="/restaurant/:id" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;

//To tackle the problem of routing make 2 separate calls
// to the Database...one for matching dishes and if it return null then
// another for matching restraunt name & then redirect accordingly. 