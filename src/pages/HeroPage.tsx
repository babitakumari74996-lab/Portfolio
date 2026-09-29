import { Navigation, Footer, CustomCursor } from "../App";
import { Hero } from "../App";

export default function HeroPage() {
  return <>
    <CustomCursor /><Navigation />
    <main><Hero /></main>
    <Footer />
  </>;
}