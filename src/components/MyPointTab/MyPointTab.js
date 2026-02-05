import { styled, Tab, Tabs } from "@mui/material";
import trophy from "assets/icons/trophyWhite.svg";
import React from "react";

import { colors } from "../../constants/colors";
function a11yProps(index) {
  return {
    id: `home-tab-${index}`,
    "aria-controls": `home-tabpanel-${index}`,
  };
}

const CustomTabs = styled(Tabs)(({ theme }) => ({
  height: 47,
  backgroundColor: "#592A81",
  borderRadius: "12px",
  "& .MuiTabs-indicator": {
    position: "absolute",
    height: "100%",
    backgroundColor: colors.hipay,
    borderRadius: "16px",
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  flex: 1,
  zIndex: 2,
  color: colors.black0,
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "500",
  "&.Mui-selected": {
    color: "white",
  },
}));
const MyPointTab = ({ value, handleChange }) => {
  return (
    <div className="p-6">
      <CustomTabs value={value} onChange={handleChange}>
        <CustomTab
          label={
            <div>
              <p className="font-bold text-xs">Миний оноо</p>
            </div>
          }
          {...a11yProps(0)}
        />
        <CustomTab
          label={
            <div className="flex text-center items-center gap-[2px]">
              <img src={trophy} alt={"dataImg"} />
              <p className="font-bold text-xs">Супер шагнал</p>
            </div>
          }
          {...a11yProps(1)}
        />
      </CustomTabs>
    </div>
  );
};

export default MyPointTab;
