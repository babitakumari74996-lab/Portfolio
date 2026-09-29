import { Hero, About, Skills, Work, Process, Services, Testimonials, Stats, FAQ, Contact } from "../App";
import { Navigation, Footer, CustomCursor, Preloader } from "../App";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [loading]);
  return <>
    <AnimatePresence>{loading && <Preloader onFinish={() => setLoading(false)} />}</AnimatePresence>
    <CustomCursor /><Navigation />
    <main><Hero /><About /><Skills /><Work /><Process /><Services /><Testimonials /><Stats /><FAQ /><Contact /></main>
    <Footer />
  </>;
}