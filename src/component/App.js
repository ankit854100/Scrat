import React, { useEffect, useRef, useState } from "react";
import Workspace from "./Workspace";
import dimension, {
  drawGrid,
  drawBlock,
  drawCharacter,
  status,
  restoreGame,
  direction,
  coordinates,
  carrots
} from "./CanvasAssets";

import trophy from "../Images/Frame.png";
import squirrelLeft from "../Images/squirrel.png";
import squirrelNut from "../Images/squirrel-nut.png";
import carrot from "../Images/carrot.png";
import squirrelRight from "../Images/squirrel-right.png";
import web from "../Images/web.png";
import tree from "../Images/tree.png";

class Score extends React.Component {
  state = {
    score: 0
  };
  changeScore = (value) => {
    this.setState({
      score: value
    });
  };
  render() {
    return (
      <div>
        {" "}
        <h3>
          score: <span style={{ width: 50 }}>{this.state.score}</span>
        </h3>
      </div>
    );
  }
}

let squirrel;
let ctx;

export default function App() {
  const ref = useRef();
  const [h1Value, setH1Value] = useState("Help the squirrel to fetch nut.");
  const [workspaceStatus, setWorkspaceStatus] = useState("start");

  var scores = useRef();

  useEffect(() => {
    let canvas = ref.current;
    canvas.width = dimension.w;
    canvas.height = dimension.h;
    ctx = canvas.getContext("2d");

    main();
  });

  function main() {
    ctx.clearRect(0, 0, dimension.w, dimension.h);
    drawGrid(ctx, "grey");
    drawBlock(ctx, "grey", coordinates, web, 1);
    drawBlock(ctx, "#fff", coordinates, tree, 2);
    drawBlock(ctx, "fff", coordinates, carrot, 3);
    if (status !== 1) {
      drawBlock(ctx, "grey", coordinates, trophy, 5);
    }
    if (status === 2) {
      setWorkspaceStatus("stop");
      setH1Value(
        "Something is wrong in you code, you sunk the squirrel. Start again."
      );
    }
    if (status === 0) {
      if (direction === "left") {
        squirrel = squirrelLeft;
      } else if (direction === "right") {
        squirrel = squirrelRight;
      }
      drawCharacter(ctx, "grey", squirrel);
      scores.current.changeScore(carrots);
    }
    if (status === 1) {
      setWorkspaceStatus("stop");
      setH1Value("Great! squirrel is very happy.");
      drawCharacter(ctx, "grey", squirrelNut);
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
            <Score ref={scores} />
            <canvas ref={ref} id="canvas" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
