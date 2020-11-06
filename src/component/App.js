import React, { useEffect, useRef, useState } from "react";
import Workspace from "./Workspace";
import dimension, {
  drawGrid,
  restrictedCoordinates,
  target,
  drawBlock,
  drawCharacter,
  status,
  restoreGame
} from "./CanvasAssets";

import nut from "../Images/nut.png";
import squirrel from "../Images/squirrel.png";
import squirrelNut from "../Images/squirrel-nut.png";

let ctx;

export default function App() {
  const ref = useRef();
  const [h1Value, setH1Value] = useState("Help the squirrel to fetch nut.");
  const [workspaceStatus, setWorkspaceStatus] = useState("start");

  useEffect(() => {
    let canvas = ref.current;
    canvas.width = dimension.w;
    canvas.height = dimension.h;
    ctx = canvas.getContext("2d");

    main();
  });

  function main() {
    ctx.clearRect(0, 0, dimension.w, dimension.h);
    drawGrid(ctx, "#49A6CF");
    drawBlock(
      ctx,
      "#49A6CF",
      restrictedCoordinates,
      "https://as2.ftcdn.net/jpg/03/34/01/45/500_F_334014537_vwNUVQcbFkNcC8buHRZF20O8P2FHl05X.jpg"
    );
    if (status !== 1) {
      drawBlock(ctx, "#49A6CF", target, nut);

      // "https://www.flaticon.com/svg/static/icons/svg/2435/2435673.svg"
    }
    if (status === 2) {
      setWorkspaceStatus("stop");
      setH1Value(
        "Something is wrong in you code, you sunk the squirrel. Start again."
      );
    }
    if (status === 0) {
      drawCharacter(ctx, "#49A6CF", squirrel);
      // "https://www.flaticon.com/svg/static/icons/svg/1864/1864534.svg"
    }
    if (status === 1) {
      setWorkspaceStatus("stop");
      setH1Value("Great! squirrel is very happy.");
      drawCharacter(ctx, "#49A6CF", squirrelNut);
      // "https://www.flaticon.com/svg/static/icons/svg/1934/1934150.svg"
    }

    requestAnimationFrame(main);
  }

  function resetGame() {
    restoreGame(0);
    setWorkspaceStatus("restart");
    setH1Value("Help the squirrel to fetch nut.");
  }
  return (
    <React.Fragment>
      <div className="top-wrapper">
        <div className="instruction-container">
          <h2> {h1Value} </h2>
        </div>
        <div className="blocklyWrapper">
          <div className="blocklyContainer">
            <Workspace status={workspaceStatus} resetGame={resetGame} />
          </div>
          <div className="rectangle">
            <canvas ref={ref} id="canvas" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
