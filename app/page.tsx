import Header from "@/components/header";
import Hero from "@/components/hero";
import InvoiceUses from "@/components/InvoiceUses";
import MoreTools from "@/components/MoreTools";
import StampMaker from "@/components/StampMaker";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StampMaker />
        <MoreTools/>
        <InvoiceUses/>
      </main>
    </>
  );
}