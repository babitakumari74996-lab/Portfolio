import { Navigation, Footer, CustomCursor } from "../App";
import { Process } from "../App";

export default function ProcessPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><Process /></main>
    <Footer />
  </>;
}