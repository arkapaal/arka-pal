import { useEffect } from "react";

export default function Callback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("Spotify Code:", code);
  }, []);

  return <div>Spotify authorization successful. Check console.</div>;
}