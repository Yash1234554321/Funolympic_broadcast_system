import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Home from "./pages/BrowseLiveGames";
import BrowseMatchHighlights from "./pages/BrowseMatchHighlights";
import ViewLiveGame from "./pages/ViewLiveGame";
import ViewMatchHighlights from "./pages/ViewMatchHighlights";
import ChangePassword from "./pages/ChangePassword";
import Navigation from "./UI/Navigation";
import { useEffect, useState } from "react";
import ProtectedRoute from "./pages/PrivateRoute";

//all routing are handled here
function App() {
  let token = JSON.parse(localStorage.getItem("token") || "{}");

  const [refresh, setRefresh] = useState(Math.random());

  useEffect(() => {
    console.log(refresh);
  }, [refresh]);

  return (
    <Router>
      {typeof token === "string" && <Navigation setRefresh={setRefresh} />}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setRefresh={setRefresh} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/change-password"
          element={
            <>
              <ProtectedRoute>
                <ChangePassword setRefresh={setRefresh} />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/home"
          element={
            <>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/matchhighlights"
          element={
            <>
              <ProtectedRoute>
                <BrowseMatchHighlights />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/viewlivegame/:id"
          element={
            <>
              <ProtectedRoute>
                <ViewLiveGame />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/viewmatchhighlight/:id"
          element={
            <>
              <ProtectedRoute>
                <ViewMatchHighlights />
              </ProtectedRoute>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
