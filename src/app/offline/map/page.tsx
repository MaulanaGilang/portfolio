import type { Metadata } from "next";
import { SagaPage } from "@/components/offline/SagaPage";
import { MapScreen } from "./MapScreen";

export const metadata: Metadata = {
  title: "Map of Moonwake",
  description: "The coast of Moonwake, House Maulana's cliff-city: drag to look around, then select the city.",
};

export default function MapPage() {
  return (
    <SagaPage>
      <MapScreen />
    </SagaPage>
  );
}
