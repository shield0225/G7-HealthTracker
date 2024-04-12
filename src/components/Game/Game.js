import React, { Fragment } from "react";
import { Container, ProgressBar } from "react-bootstrap";
import { Unity, useUnityContext } from "react-unity-webgl";
import NavBar from "../NavBar";
import Footer from "../Footer";

function Game() {
    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl: "build/KeepMovingBuild.loader.js",
        dataUrl: "build/KeepMovingBuild.data",
        frameworkUrl: "build/KeepMovingBuild.framework.js",
        codeUrl: "build/KeepMovingBuild.wasm"
    });

    return (
        <Container>
            <NavBar />
            <br />
            <Fragment>
                {!isLoaded && (
                    <ProgressBar animated now={loadingProgression * 100}/>
                )}
                <Unity
                    unityProvider={unityProvider}
                    style={{ visibility: isLoaded ? "visible" : "hidden" }}
                />
            </Fragment>
            <br />
            <Footer />
        </Container>
    )
}

export default Game;