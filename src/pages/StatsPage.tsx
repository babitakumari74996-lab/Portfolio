import { Navigation, Footer, CustomCursor } from "../App";
import { Stats } from "../App";

export default function StatsPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><Stats /></main>
    <Footer />
  </>;
}