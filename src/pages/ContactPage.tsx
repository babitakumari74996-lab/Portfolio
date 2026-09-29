import { Navigation, Footer, CustomCursor } from "../App";
import { Contact } from "../App";

export default function ContactPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><Contact /></main>
    <Footer />
  </>;
}