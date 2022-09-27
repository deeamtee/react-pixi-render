import { useContext, useEffect } from "react";
import { AppContext } from "./context";

export const useApp = () => {
    const app = useContext(AppContext);

    if (app === null) {
        throw new Error("No PIXI.Application is available here. You can only access it in children of <Stage />");
    }

    return app;
}

export const useTick = (fn) => {
    const { ticker } = useApp();

    useEffect(() => {
        ticker.add(fn);

        return () => {
            ticker.remove(fn)
        }
    }, [fn, ticker])
}