"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ToastKind = "success" | "error";

type ToastItem = {
  id: number;
  message: string;
  kind: ToastKind;
};

type PushToast = (message: string, kind?: ToastKind) => void;

const ToastContext = createContext<PushToast>(() => {});

export function useToast(): PushToast {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const push = useCallback<PushToast>((message, kind = "success") => {
    const id = ++nextId.current;
    setToasts((current) => [...current, { id, message, kind }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 6000);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      {/* Sits above the save bar; polite so it never interrupts. */}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed bottom-20 right-4 z-[60] flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-2"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto animate-pop-in rounded-xl border px-4 py-3 text-sm leading-5 shadow-lift",
              toast.kind === "error"
                ? "border-accent/60 bg-surface text-accent"
                : "border-line bg-surface text-ink"
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
