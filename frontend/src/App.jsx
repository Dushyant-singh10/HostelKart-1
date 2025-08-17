import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function Navbar() {
  const location = useLocation();

  // hide navbar for login & signup
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="font-bold">HostelKart</h1>
      <div>
        <Link to="/" className="mr-4 hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Signup
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* You can add more pages here later */}
      </Routes>
    </Router>
  );
}

export default App;
