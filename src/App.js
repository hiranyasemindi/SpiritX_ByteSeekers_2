import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Transactions from "./pages/Tournements";
import Players from "./pages/Players";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import PlayerForm from "./components/PlayerForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/" element={<LoginPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route
          path="admin/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/players"
          element={
            <ProtectedRoute>
              <Layout>
                <Players />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/players/add"
          element={
            <ProtectedRoute>
              <Layout>
                <PlayerForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/players/edit"
          element={
            <ProtectedRoute>
              <Layout>
                <PlayerForm />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/tournements"
          element={
            <ProtectedRoute>
              <Layout>
                <Transactions />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
