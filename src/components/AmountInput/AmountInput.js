import { IconButton } from "@mui/material";
import React, { useState } from "react";

import { colors } from "../../constants/colors";
import Icon from "../Icon";

const AmountInput = ({
  amount,
  handleAmountChange,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="flex flex-1 rounded-lg p-2 justify-between bg-[#090a4a0d] ">
      <div className="flex items-center">
        <input
          type="text"
          value={amount}
          inputMode="numeric"
          onChange={(e) => {
            handleAmountChange(parseInt(e.target.value.replace(/\D/g, "")));
          }}
          max={1000000}
          style={{
            border: "none",
            background: "transparent",
            flex: 1,
            fontWeight: "bold",
            color: colors.dimBlue,
            outline: "none",
          }}
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <IconButton onClick={handleDecrement} style={{ padding: 0 }}>
          <Icon
            icon={"ic24-minus"}
            size={24}
            color={"#EF4444"}
            className="bg-[#ff3b631a] rounded"
          />
        </IconButton>
        <IconButton onClick={handleIncrement} style={{ padding: 0 }}>
          <Icon
            icon={"ic24-plus"}
            size={24}
            color={"#EF4444"}
            className="bg-[#ff3b631a] rounded"
          />
        </IconButton>
      </div>
    </div>
  );
};

export default AmountInput;
