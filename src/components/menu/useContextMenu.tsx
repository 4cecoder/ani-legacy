import React, { useState, useEffect } from "react";

interface ContextMenuItem {
  label: string;
  action: () => void;
}

const useContextMenu = (
  menuItems: ContextMenuItem[],
  menuRef: React.RefObject<HTMLDivElement>
) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      if (menuRef.current) {
        setPosition({ top: event.pageY, left: event.pageX });
        setShowMenu(true);
      }
    };

    const handleClick = () => {
      setShowMenu(false);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, [menuRef]);

  return { position, showMenu, menuItems };
};

export default useContextMenu;
