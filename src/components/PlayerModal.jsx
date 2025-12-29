import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function PlayerModal({ player, onClose }) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <AnimatePresence>
      {player && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed inset-0 z-40
              bg-black/50 backdrop-blur-sm
            "
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              pointer-events-none
            "
          >
            <div
              className="
                pointer-events-auto
                bg-white rounded-3xl shadow-2xl
                p-8 w-80 text-center relative
              "
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              {/* Player */}
              <img
                src={player.img}
                alt={player.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
              />

              <h2 className="text-2xl font-bold mb-1">
                {player.name}
                {player.captain && " 👑"}
              </h2>

              <p className="text-gray-500 mb-2">Tier {player.tier}</p>

              <p className="text-xl font-semibold">₹{player.bidAmount}</p>

              {player.captain && (
                <div className="mt-3 text-sm font-semibold text-yellow-600">
                  Team Captain
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
