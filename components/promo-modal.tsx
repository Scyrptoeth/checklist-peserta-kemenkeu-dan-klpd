"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PROMO_LINK = "https://s.id/tubelstan";

interface PromoModalProps {
  storageKey: string;
}

export function PromoModal({ storageKey }: PromoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    try {
      window.localStorage.setItem(storageKey, "dismissed");
    } catch {
      // Modal still closes for this page view when browser storage is unavailable.
    }
  }, [storageKey]);

  useEffect(() => {
    setMounted(true);
    const timeoutId = window.setTimeout(() => {
      try {
        setIsOpen(window.localStorage.getItem(storageKey) !== "dismissed");
      } catch {
        setIsOpen(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [storageKey]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleClose();
      }
    }

    function handleTabKey(event: KeyboardEvent) {
      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleTabKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleTabKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === overlayRef.current) {
      handleClose();
    }
  }

  function handleOpenLink() {
    window.open(PROMO_LINK, "_blank", "noopener,noreferrer");
  }

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-950/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={handleOverlayClick}
      ref={overlayRef}
      role="dialog"
    >
      <div className="relative my-auto w-full max-w-[320px] overflow-hidden rounded-xl border border-ink-200 bg-white shadow-xl sm:max-w-[360px]">
        <button
          aria-label="Tutup iklan"
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-white/90 text-ink-600 shadow-sm transition-colors hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          onClick={handleClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={20} />
        </button>

        <button
          aria-label="Buka link pendaftaran Tubel STAN"
          className="block w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
          onClick={handleOpenLink}
          type="button"
        >
          <Image
            alt="Promosi kelas Tubel STAN gelombang terakhir. Sisa kuota 3 peserta. Link pendaftaran s.id/tubelstan"
            className="h-auto w-full object-contain"
            height={2812}
            priority
            src="/iklan-tubelstan.jpeg"
            width={2250}
          />
        </button>

        <a
          className="flex items-center justify-center border-t border-ink-200 bg-amber-400 px-5 py-4 text-center font-bold text-ink-900 transition-[filter] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
          href={PROMO_LINK}
          rel="noopener noreferrer"
          target="_blank"
        >
          Tersisa 3 Kuota, Daftar Sekarang dengan Klik s.id/tubelstan
        </a>
      </div>
    </div>
  );
}
