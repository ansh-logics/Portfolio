import "./Glow.css"
import { PropsWithChildren } from "react";

type props = {
    className:string,
}
const GlowingText = (props:PropsWithChildren<props>) => {
    return (
        <>
            <span className={`${props.className} text glow-text text-white`}>{props.children}</span>
        </>
    );
};

export default GlowingText;
