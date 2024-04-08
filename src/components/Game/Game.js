import React, { Fragment } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Game() {
    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl: "build/KeepMovingBuild.loader.js",
        dataUrl: "build/KeepMovingBuild.data",
        frameworkUrl: "build/KeepMovingBuild.framework.js",
        codeUrl: "build/KeepMovingBuild.wasm"
    });

    return (
        <Fragment>
            {!isLoaded && (
                <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
            )}
            <Unity
                unityProvider={unityProvider}
                style={{visibility: isLoaded ? "visible" : "hidden"}}
            />
        </Fragment>
    )
}

export default Game;