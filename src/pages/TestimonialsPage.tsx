import { Navigation, Footer, CustomCursor } from "../App";
import { Testimonials } from "../App";

export default function TestimonialsPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><Testimonials /></main>
    <Footer />
  </>;
}