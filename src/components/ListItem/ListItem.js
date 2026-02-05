import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ButtonBase,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useMutateCheckout } from "../../api/useMutateCheckout";
import { CONSTANT_AMOUNTS } from "../../constants";
import { colors } from "../../constants/colors";
import { mainSelectors } from "../../redux/slices/mainSlice";
import { formatNumber } from "../../utils";
import AmountInput from "../AmountInput";
import Loader from "../Loader";

const ListItem = ({ entry, type, isOngoing }) => {
  const { event } = useSelector(mainSelectors.getMain);
  const {
    race_id,
    id: entry_id,
    win_odd,
    place_odd,
    horse,
    horse_number,
  } = entry || {};

  const odd = type === "win" ? win_odd : place_odd;
  const [amount, setAmount] = useState("");
  const handleAmount = (amount) => {
    if (amount === "") return 0;
    else return parseInt(amount?.replace(/,/g, ""));
  };
  const handleIncrement = () => {
    const value = handleAmount(amount);
    if (!isNaN(value) && Number.isInteger(value)) {
      const formattedValue = formatNumber(value + 1000);
      setAmount(formattedValue);
    } else {
      setAmount("");
    }
  };
  const handleDecrement = () => {
    const value = handleAmount(amount);
    if (value > 999) {
      if (!isNaN(value) && Number.isInteger(value)) {
        const formattedValue = formatNumber(value - 1000);
        setAmount(formattedValue);
      } else {
        setAmount("");
      }
    }
  };
  const { isLoading, mutateAsync } = useMutateCheckout();
  const handleSubmit = async () => {
    const data = {
      amount: handleAmount(amount),
      race_id: race_id,
      entry_id: entry_id,
      event_id: event?.id,
      type: type,
    };
    const res = await mutateAsync(data);
    if (res?.code === 1) {
      window.hpsPayment(res?.data?.checkoutId);
    }
  };
  const handleAmountChange = (value) => {
    const clampedValue = Math.min(value, 1000000);

    if (!isNaN(clampedValue) && Number.isInteger(clampedValue)) {
      const formattedValue = formatNumber(clampedValue);
      setAmount(formattedValue);
    } else {
      setAmount("");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : (
        <Accordion
          square={true}
          disabled={isOngoing}
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.10)",
            backgroundColor: colors.black0,
            marginBottom: "12px",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={
              isOngoing ? <LockIcon fontSize="small" /> : <ExpandMoreIcon />
            }
            sx={{
              borderRadius: "12px",
              backgroundColor: colors.black0,
            }}
          >
            <div className="flex text-dimBlue flex-1 justify-between">
              <div className="flex">
                <p className="font-bold text-sm">
                  №{horse_number} {horse?.name}
                </p>
                <p className="pl-1 text-sm">({horse?.trainer?.name})</p>
              </div>
              <p
                className={`${
                  isOngoing ? "text-black55" : "text-[#EF4444]"
                } font-bold`}
              >
                {odd || "X"}
              </p>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex-col space-y-4">
              <p className="text-black55 text-xxs text-center px-6">
                Бооцоо хожих хэмжээ бусад оролцогчдоос хамааран өөрчлөгдөх
                боломжтой
              </p>
              <div className="flex flex-1 justify-between space-x-3">
                <AmountInput
                  amount={amount}
                  handleAmountChange={handleAmountChange}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                />
                <button
                  style={{
                    backgroundColor: colors.hipay,
                    borderRadius: "8px",
                    flex: 1,
                    border: "none",
                    padding: 8,
                    width: "fit-content",
                  }}
                  onClick={() => {
                    handleSubmit();
                  }}
                  disabled={isLoading}
                  // disabled={
                  //   parseInt(amount?.replace(/,/g, "")) < 1 ||
                  //   parseInt(amount?.replace(/,/g, "")) > 1000000
                  // }
                >
                  <p className="text-xs text-white font-bold w-full">
                    Бооцоо тавих
                  </p>
                </button>
              </div>
              <p className="text-black55 text-xxs font-medium">
                Шууд бооцоо тавих
              </p>
              <div className="flex justify-between gap-2">
                {CONSTANT_AMOUNTS?.map((am, idx) => (
                  <button
                    key={idx}
                    className="bg-dimBlue text-black0 text-xs p-2 rounded-lg flex-1 border-0"
                    onClick={() => handleAmountChange(am)}
                  >
                    {formatNumber(am)}₮
                  </button>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default ListItem;
