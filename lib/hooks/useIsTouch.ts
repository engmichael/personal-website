"use client";

import { useEffect, useState } from "react";

/**
 * True on coarse-pointer / no-hover devices (phones, tablets). Used to fall
 * back to the native cursor and disable magnetic/hover-physics interactions.
 * SSR-safe (returns false until mounted).
 */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouch;
}
