import { Navigation, Footer, CustomCursor } from "../App";
import { Skills } from "../App";

export default function SkillsPage() {
  return <>
    <CustomCursor /><Navigation />
    <main className="section-page"><Skills /></main>
    <Footer />
  </>;
}