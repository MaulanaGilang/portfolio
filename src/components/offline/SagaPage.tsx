import { ViewTransition } from "react";

/** The transition type set on links between the saga pages (After Hours, the Codex, the map). */
export const SAGA = ["saga"];

/**
 * Wraps one saga page so that moving between After Hours, the Codex and the map
 * closes the old page into black and opens the new one like a shutter
 * (see the "saga" rules in globals.css).
 */
export function SagaPage({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={{ saga: "saga-enter", default: "none" }} exit={{ saga: "saga-exit", default: "none" }} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
