// SpotifyNowPlaying.jsx
import React, { useEffect, useState, useRef } from "react";
import { Music, PauseCircle, PlayCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("https://spotifybackend-pe09.onrender.com/api/spotify");
        const data = await res.json();
        if (data?.isPlaying) {
          setTrack(data);
        } else {
          setTrack(null);
        }
      } catch (error) {
        console.error("Spotify fetch error:", error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-6 z-50 w-72">
      {/* Main Widget */}
      <div className="rounded-2xl shadow-2xl p-4 bg-black/70 backdrop-blur-xl border border-white/10 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Music className="text-green-400" size={18} />
            <h2 className="text-sm font-semibold tracking-wide">Now Playing</h2>
          </div>

          <div className="flex items-center gap-2">
            {track?.songUrl && (
              
                <a href={track.songUrl}
                target="here"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {/* Toggle Button */}
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="hover:scale-110 transition text-gray-400 hover:text-green-400"
              title={expanded ? "Close playlist" : "Open playlist"}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {track ? (
          <div className="flex gap-3 items-center">
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className="w-14 h-14 rounded-xl object-cover shadow-md"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold truncate">{track.title}</h3>
              <p className="text-xs text-gray-300 truncate">{track?.artist}</p>
              <div className="mt-2 flex items-center gap-1">
                {track.isPlaying ? (
                  <PlayCircle className="text-green-400" size={16} />
                ) : (
                  <PauseCircle className="text-gray-400" size={16} />
                )}
                <span className="text-[10px] uppercase tracking-wider text-green-300">
                  {track.isPlaying ? "Live" : "Paused"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-2">
            <Music size={22} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium">Not Playing</p>
              <p className="text-xs text-gray-400">Probably coding right now.</p>
            </div>
          </div>
        )}
      </div>

      {/* Expandable Spotify Embed */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-[420px] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            src="https://open.spotify.com/embed/playlist/37i9dQZF1EVHGWrwldPRtj?utm_source=generator&theme=0"
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}