import { createContext, useContext, useState } from "react";
import { PLAYERS } from "../constants/players";

const AuctionContext = createContext();

const TEAM_NAMES = [
  "Team A",
  "Team B",
  "Team C",
  "Team D",
  "Team E",
  "Team F",
  "Team G",
  "Team H",
];

const TOTAL_PURSE = 60000;

export function AuctionProvider({ children }) {
  const [teams, setTeams] = useState(() =>
    TEAM_NAMES.map((name, i) => ({
      id: i,
      name,
      purse: TOTAL_PURSE,
      playerIds: [], // 🔒 ONLY sold players
    }))
  );

  const [auctionPlayer, setAuctionPlayer] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [leadingTeamId, setLeadingTeamId] = useState(null);
  const [auctionActive, setAuctionActive] = useState(false);

  function startAuction() {
    const unsold = PLAYERS.filter(
      (p) => !teams.some((t) => t.playerIds.includes(p.id))
    );
    if (!unsold.length) return;

    const random = unsold[Math.floor(Math.random() * unsold.length)];
    setAuctionPlayer(random);
    setCurrentBid(random.basePrice);
    setLeadingTeamId(null);
    setAuctionActive(true);
  }

  function placeBid(teamId) {
    if (!auctionActive) return;
    setCurrentBid((b) => b + 500);
    setLeadingTeamId(teamId);
  }

  function finalizeAuction() {
    if (!auctionPlayer || leadingTeamId === null) return;

    setTeams((prev) =>
      prev.map((team) =>
        team.id !== leadingTeamId
          ? team
          : {
              ...team,
              purse: team.purse - currentBid,
              playerIds: [...team.playerIds, auctionPlayer.id],
            }
      )
    );

    setAuctionPlayer(null);
    setCurrentBid(0);
    setLeadingTeamId(null);
    setAuctionActive(false);
  }

  return (
    <AuctionContext.Provider
      value={{
        teams,
        auctionPlayer,
        currentBid,
        leadingTeamId,
        auctionActive,
        startAuction,
        placeBid,
        finalizeAuction,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuction() {
  return useContext(AuctionContext);
}
