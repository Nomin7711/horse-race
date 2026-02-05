import pointActive from "assets/icons/pointActive.svg";
import pointTab from "assets/icons/pointTab.svg";
import raceActive from "assets/icons/raceActive.svg";
import raceTab from "assets/icons/raceTab.svg";
import ticketActive from "assets/icons/ticketActive.svg";
import ticketTab from "assets/icons/ticketTab.svg";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const buttons = [
  {
    label: "Уралдаан",
    id: "/",
    icon: raceTab,
    selectedIcon: raceActive,
  },
  {
    label: "Тасалбар",
    id: "/ticketHistory",
    icon: ticketTab,
    selectedIcon: ticketActive,
  },
  {
    label: "Миний оноо",
    id: "/myTicket",
    icon: pointTab,
    selectedIcon: pointActive,
  },
];
const NavBar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(location?.pathname);
  const navigate = useNavigate();
  const handleChange = (value) => {
    setSelected(value);
    navigate(value);
  };
  return (
    <div className="pb-safe pt-3 bg-black0 shadow-2xl flex justify-evenly">
      {buttons?.map((button, idx) => (
        <button
          className="flex-1 border-0 bg-black0"
          key={idx}
          onClick={() => handleChange(button?.id)}
        >
          <img
            src={selected === button?.id ? button.selectedIcon : button?.icon}
            alt={button.label}
          />
          <p
            className={`text-xs ${
              selected === button?.id
                ? "text-primaryBlue font-bold"
                : "text-black55"
            }`}
          >
            {button?.label}
          </p>
        </button>
      ))}
    </div>
  );
};

export default NavBar;
