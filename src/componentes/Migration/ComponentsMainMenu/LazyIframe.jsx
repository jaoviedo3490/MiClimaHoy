import { useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import { Ui_Context } from "../../../Context/Ui-Context";



const LazyIframe = () => {
    const { mapUrlState } = useContext(Ui_Context);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (<iframe
        src={mapUrlState}
        width={isMobile ? "100%" : "100%"}
        height={isMobile ? "400px" : "460px"}
        style={{ border: 0, borderRadius: "8px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        key={Date.now()}
    />)
}
export default LazyIframe;
