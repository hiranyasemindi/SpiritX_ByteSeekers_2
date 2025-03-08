import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Transactions from "./pages/Tournements";
import Players from "./pages/Players";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import PlayerData from "./pages/PlayerData";
import PlayerForm from "./components/PlayerForm";
import TeamView from "./pages/TeamView";
import UserLogin from "./pages/UserLoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/" element={<LoginPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
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
        <Route
          path="admin/tournements/team/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TeamView />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/players/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <PlayerData />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
