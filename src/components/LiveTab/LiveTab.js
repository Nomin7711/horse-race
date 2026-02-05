import background from "assets/img/locationBackground.png";
import React from "react";

import LocationCountdown from "../LocationCountdown";

const LiveTab = ({ link, diffDate }) => {
  const showCountdown = !!diffDate && diffDate > 0;
  return (
    <>
      {link ? (
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
          className="flex-col flex-1 pb-12 p-6"
        >
          <iframe
            width="100%"
            height="200"
            src={link?.toString().replace("watch?v=", "embed/") + "?autoplay=1"}
            title="YouTube video player"
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
          ></iframe>
        </div>
      ) : showCountdown ? (
        <div className="flex-1 text-center p-6">
          <p className="text-sm font-bold text-black0">
            Шууд дамжуулалт эхлэхэд:
          </p>
          <LocationCountdown diffDate={diffDate} />
        </div>
      ) : (
        <div className="flex-1 text-center p-6">
          <p className="text-black0 font-bold">Уралдаан дууссан</p>
        </div>
      )}
    </>
  );
};

export default LiveTab;
