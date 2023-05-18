import React from "react";

interface ContextMenuProps {
  menuItems: { label: string; action: () => void }[];
  top: number;
  left: number;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ menuItems, top, left }) => {
  return (
    <div
      className="absolute z-50 divide-y divide-gray-100 rounded-md bg-white shadow-lg"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {menuItems.map((item) => (
        <button
          key={item.label}
          className="flex items-center px-4 py-2 hover:bg-gray-100"
          onClick={item.action}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ContextMenu;
