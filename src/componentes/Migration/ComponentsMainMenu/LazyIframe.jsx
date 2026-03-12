import { useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import { Test_context } from "../../../Context/test-context";



const LazyIframe = () => {
    const { mapUrlState } = useContext(Test_context);
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
    />)
}
export default LazyIframe;
