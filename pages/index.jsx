import Head from "next/head";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import PulseDivider from "../components/PulseDivider/PulseDivider";
import Services from "../components/Services/Services";
import Industries from "../components/Industries/Industries";
import SelectedWork from "../components/SelectedWork/SelectedWork";
import Process from "../components/Process/Process";
import WhyUs from "../components/WhyUs/WhyUs";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Signalix — Digital & IT Services Agency</title>
        <meta
          name="description"
          content="Signalix is a remote full-service IT & digital agency helping businesses across Africa and worldwide build, maintain, and grow their online presence."
        />
      </Head>

      <Header />
      <Hero />
      <PulseDivider />
      <Services />
      <Industries />
      <SelectedWork />
      <Process />
      <WhyUs />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
