/// <reference types="vite/client" />

declare global {
  interface Window {
    __lenis?: unknown;
    __scrollToSection?: (id: string) => void;
  __scrollFast?: boolean;
  __scrollVelocity?: number;
  }
}

export {};
