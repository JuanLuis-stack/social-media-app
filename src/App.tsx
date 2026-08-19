// App.tsx

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Home from "./pages/Home";
import Layout from "./layouts/DasboardLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
