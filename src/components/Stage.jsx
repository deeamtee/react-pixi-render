import { useCallback } from "react";
import * as PIXI from "pixi.js";
import { render } from "../hostConfig";
import { AppProvider } from "../utils/context";

const Stage = ({ children, width, height, options }) => {
  const mountStage = useCallback(
    (canvas) => {
      const app = new PIXI.Application({
        width,
        height,
        view: canvas,
        ...options,
      });
      const provider = <AppProvider app={app}>{children}</AppProvider>;
      render(provider, app.stage);
    },
    [children, height, options, width]
  );

  return <canvas ref={mountStage} />;
};

Stage.defaultProps = {
  width: 800,
  height: 600,
  options: {},
};

export default Stage;
