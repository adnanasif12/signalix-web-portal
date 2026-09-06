import Head from "next/head";
import { supabase } from "../lib/supabaseClient";
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

export default function Home({ projects }) {
  return (
    <>
      <Head>
        <title>Signalix — Digital & IT Services Agency</title>
        <meta
          name="description"
          content="Signalix is a remote full-service IT & digital agency helping businesses across Africa and worldwide build, maintain, and grow their online presence."
        />
        <link rel="icon" href="/images/image2.png" type="image/png" />
        <link rel="shortcut icon" href="/images/image2.png" type="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Signalix — Digital & IT Services Agency" />
        <meta
          property="og:description"
          content="Signalix is a remote full-service IT & digital agency helping businesses across Africa and worldwide build, maintain, and grow their online presence."
        />
        <meta property="og:image" content="/images/image1.png" />
        <meta property="og:url" content="https://signalix.agency" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Signalix — Digital & IT Services Agency" />
        <meta name="twitter:image" content="/images/image1.png" />
      </Head>

      <Header />
      <Hero />
      <PulseDivider />
      <Services />
      <Industries />
      <SelectedWork projects={projects} />
      <Process />
      <WhyUs />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

// Pulls published projects from the admin panel (Portfolio section).
// revalidate: 60 means changes made in the admin panel show up on the
// live site within ~1 minute, without needing a redeploy.
export async function getStaticProps() {
  let projects = [];

  if (supabase) {
    const { data } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    projects = data || [];
  }

  return {
    props: { projects },
    revalidate: 60,
  };
}
