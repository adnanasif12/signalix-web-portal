import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return <Component {...pageProps} />;
}
