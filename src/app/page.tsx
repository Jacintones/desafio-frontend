import { ListagemPautas } from "@/features/listagemPauta/component";
import AppHeader from "@/components/layout/AppHeader";

export default function Home() {
  return (
    <>
      <AppHeader />
      <ListagemPautas />
    </>
  );
}
