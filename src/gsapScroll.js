import { useEffect } from "react";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother);

export default function useGsapScrollSmoother() {
  useEffect(() => {
    // Inizializza solo una volta
    if (!window._gsapScrollSmoother) {
      window._gsapScrollSmoother = ScrollSmoother.create({
        smooth: 1.2, // più alto = più morbido
        effects: true,
      });
    }
    return () => {};
  }, []);
}