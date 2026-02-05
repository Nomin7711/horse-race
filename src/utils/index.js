import React from "react";

import { config } from "../config";

export function numberWithCommas(x) {
  return (+x)?.toLocaleString();
}
export const useCountdown = (s) => {
  const [time, setTime] = React.useState(s);

  React.useEffect(() => {
    if (s === 0) {
      return;
    }
    const interval = setInterval(() => {
      setTime((t) => {
        if (t === 0) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [s]);

  React.useEffect(() => {
    if (s) {
      setTime(s);
    }
  }, [s]);

  const pad = (n) => (n < 10 ? "0" : "") + n;

  const days = Math.floor(time / (60 * 60 * 24));
  const hoursLeft = Math.floor((time - days * 86400) / 3600);
  const minutesLeft = Math.floor((time - days * 86400 - hoursLeft * 3600) / 60);
  const seconds = Math.floor(time % 60);

  return [pad(days), pad(hoursLeft), pad(minutesLeft), pad(seconds)];
};

export const handleName = (name) => {
  return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
};
export function formatNumber(
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount =
        decimalCount > 0
          ? Math.abs(Number(amount) || 0).toFixed(decimalCount)
          : Math.trunc(Number(amount) || 0)),
      10
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

export const parseImageUrl = (fileName) => {
  return config.domain + "uploads/" + fileName;
};

export const format_date = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")} | ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export const format_race_name = (name) => {
  const raceName = name?.split(" ")[0] || {};
  const raceGroup = name?.split(" ").slice(1).join(" ");
  return [raceName, raceGroup];
};
