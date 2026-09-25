import { useEffect, type RefObject } from "react";

type UseDismissMenu = {
  menuRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  isOpen: boolean;
};

export function useDismissMenu({ menuRef, onClose, isOpen }: UseDismissMenu) {
  useEffect(() => {
    if (!isOpen) return;

    function closeWhenClickOutSite(event: PointerEvent) {
      const target = event.target as Node;

      if (!menuRef.current?.contains(target)) {
        onClose();
      }
    }

    function closeWhenScrolling() {
      onClose();
    }

    document.addEventListener("pointerdown", closeWhenClickOutSite);
    document.addEventListener("scroll", closeWhenScrolling, true);
  }, [menuRef, isOpen, onClose]);
}
