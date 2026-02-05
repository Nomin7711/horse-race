import { IconButton } from "@mui/material";
import logo from "assets/header-logo.svg";
import background from "assets/img/background.png";
import Icon from "components/Icon";
import { colors } from "constants/colors";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onClick, rightIcon, rightClick, rightSvg, border }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`px-4 py-2 flex flex-row justify-between bg-dimBlue ${
        border && "rounded-b-2xl"
      }`}
      style={{
        // paddingTop: "max(env(safe-area-inset-top), 24px)",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        objectFit: "cover",
      }}
    >
      <IconButton
        onClick={onClick ? onClick : () => navigate(-1)}
        style={{ flex: 1, alignItems: "flex-end" }}
      >
        <Icon icon="ic24-chevron-left" size={24} color={colors.black0} />
      </IconButton>

      <div className="w-[calc(100%-80px)] flex items-center">
        <img alt="" src={logo} height={24} />
      </div>

      {rightIcon ? (
        <IconButton onClick={rightClick}>
          <Icon icon={rightIcon} size={24} color={colors.black0} />
        </IconButton>
      ) : rightSvg ? (
        <IconButton onClick={rightClick}>
          <img src={rightSvg} alt={"icon"} />
        </IconButton>
      ) : (
        <div className="w-[40px] h-[40px]" />
      )}
    </div>
  );
};

export default Header;
