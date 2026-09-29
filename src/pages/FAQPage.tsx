import { Navigation, Footer, CustomCursor } from "../App";
import { FAQ } from "../App";

export default function FAQPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><FAQ /></main>
    <Footer />
  </>;
}