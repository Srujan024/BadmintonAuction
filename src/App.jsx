import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionDashboard from "./AuctionDashboard";
import TeamDetails from "./TeamDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuctionDashboard />} />
        <Route path="/team/:teamIndex" element={<TeamDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
