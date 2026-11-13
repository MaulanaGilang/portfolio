"use client";

import { useRouter } from "next/navigation";
import { MoonwakeMap } from "@/components/offline/MoonwakeMap";
import { SAGA } from "@/components/offline/SagaPage";

/** The map as a page: closing it goes back to After Hours through the saga transition. */
export function MapScreen() {
  const router = useRouter();
  return <MoonwakeMap onClose={() => router.push("/offline", { transitionTypes: SAGA })} />;
}
