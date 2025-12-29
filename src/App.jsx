import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AuctionDashboard from "./AuctionDashboard";
import TeamDetails from "./TeamDetails";
import TeamCompare from "./TeamCompare";
import MatchDashboard from "./MatchDashboard"; // 🆕 Match Summary Dashboard

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auction */}
        <Route path="/" element={<AuctionDashboard />} />

        {/* Team */}
        <Route path="/team/:teamIndex" element={<TeamDetails />} />

        {/* Compare */}
        <Route path="/compare" element={<TeamCompare />} />

        {/* 🆕 Match Summary / Tournament Dashboard */}
        <Route path="/matches" element={<MatchDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
