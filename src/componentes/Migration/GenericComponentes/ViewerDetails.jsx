import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Typography, Box, Alert, AlertTitle } from '@mui/material';
import { XMLParser } from "fast-xml-parser"
import { useState } from 'react';


export default function ViewerDetails(props) {
    const [json,setJson] = useState([]);
    const rssLightParser = new XMLParser();

    React.useEffect(() => {
        (async () => {
            const res = await fetch(`https://corsproxy.io/${props.rss}`)
            const xml = await res.text()


            const json = rssLightParser.parse(xml)
            setJson(json)

            console.log(json)
        })()
    }, [])
    return (
        <Box>
            <Typography variant='h3'>Climate Alert</Typography>
            <Typography variant='h3'>Identificador OID: {json.alert?.identifier}</Typography>
            
        </Box>
    );
}
