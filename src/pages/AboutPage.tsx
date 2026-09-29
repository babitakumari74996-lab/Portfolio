import { Navigation, Footer, CustomCursor } from "../App";
import { About } from "../App";

export default function AboutPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><About /></main>
    <Footer />
  </>;
}