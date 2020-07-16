import React, { useRef, useEffect } from "react";

import "./App.css";

const App = () => {
  const aliceRun = useRef(null);
  const foreground = useRef(null);
  const background = useRef(null);

  useEffect(() => {

    var spriteFrames = [
      { transform: "translateY(0)" },
      { transform: "translateY(-100%)" },
    ];

    var alice = aliceRun.current.animate(spriteFrames, {
      easing: "steps(7, end)",
      direction: "reverse",
      duration: 500,
      playbackRate: 1,
      iterations: Infinity,
    });

    setInterval(function () {
      if (alice.playbackRate > 0.4) {
        alice.playbackRate -= 0.1;
        adjustSceneryPlayback();
      }
    }, 3000);

    var sceneryFrames = [
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ];

    var sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity,
    };

    var sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity,
    };

    var foregroundMovement = foreground.current.animate(
      sceneryFrames,
      sceneryTimingForeground
    );
    var backgroundMovement = background.current.animate(
      sceneryFrames,
      sceneryTimingBackground
    );

    var sceneries = [foregroundMovement, backgroundMovement];

    var adjustSceneryPlayback = function () {
      if (alice.playbackRate < 0.8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = (alice.playbackRate / 2) * -1;
        });
      } else if (alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    };
    adjustSceneryPlayback();

    const goFaster = () => {
      if(alice.playbackRate > 10) {
        alert("Bro stop !! She's not flash ");
      }
      else{
        alice.playbackRate += 0.2;
        adjustSceneryPlayback();
      }
      
      
    };

    window.addEventListener("click", goFaster);
  });

  return (
    <>
     <div className="container">
      <div className="sky"></div>
      <div className="earth">
        <div className="alice">
          <img
            className="aliceRun"
            ref={aliceRun}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
            alt=" "
          />
        </div>
      </div>

      <div className="scenery" id="foreground" ref={foreground}>
        <img
          id="treefore"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
          alt=" "
        />
      </div>

      <div className="scenery background1" ref={background}>
        <img
          className="pawn"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          alt=" "
        />
        <img
          className="pawn2"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          alt=" "
        />
        <img
          className="treeback"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
          alt=" "
        />
      </div>
    </div>
    </>
  );
};
export default App;
