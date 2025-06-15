
"use client"; 

import AppHeader from "@/components/layout/AppHeader";
import dynamic from "next/dynamic";

const PautaDetails = dynamic(() => import("@/features/detalhePauta/component/DetalhesPauta"), {
  ssr: false,
});

export default function PautaDetailsPage() {
  return (
    <>
      <AppHeader />
      <PautaDetails />
    </>
  )
}
