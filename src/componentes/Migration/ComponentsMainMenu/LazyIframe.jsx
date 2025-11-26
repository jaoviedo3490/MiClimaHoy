import { useMediaQuery, useTheme } from "@mui/material";



const LazyIframe = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (<iframe
        src={props.mapUrl}
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
