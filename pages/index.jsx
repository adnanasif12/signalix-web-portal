import Head from "next/head";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import PulseDivider from "../components/PulseDivider/PulseDivider";
import Services from "../components/Services/Services";
import Process from "../components/Process/Process";
import WhyUs from "../components/WhyUs/WhyUs";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Signalix — Digital & IT Services Agency</title>
        <meta
          name="description"
          content="Signalix is a full-service IT & digital agency offering website development, maintenance, video editing, digital marketing, and social media marketing."
        />
      </Head>

      <Header />
      <Hero />
      <PulseDivider />
      <Services />
      <Process />
      <WhyUs />
      <CTA />
      <Footer />
    </>
  );
}
