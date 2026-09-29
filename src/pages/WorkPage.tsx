import { Navigation, Footer, CustomCursor } from "../App";
import { Work } from "../App";

export default function WorkPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><Work /></main>
    <Footer />
  </>;
}