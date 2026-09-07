import Seo from "../../../components/Seo";
import AboutMe from "../About/AboutMe";
import HeroSection from "../HeroSection";
import MyPortfolio from "../Portolio/MyPortfolio";
import MySkills from "../Services/MySkills";

export default function Home() {
  return (
    <>
      <Seo
        title="Habix Technologies | Powering Digital Transformation Through Blockchain Innovation"
        description="Habix Technologies is a venture studio building blockchain transformation frameworks — process automation, cross-border settlement, audit trails and tokenized ecosystems on Solana."
        path="/"
      />
      <HeroSection />
      <MySkills />
      <AboutMe />
      <MyPortfolio />
    </>
  );
}
