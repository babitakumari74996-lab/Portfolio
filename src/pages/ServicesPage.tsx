import { Navigation, Footer, CustomCursor } from "../App";
import { Services } from "../App";

export default function ServicesPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><Services /></main>
    <Footer />
  </>;
}