import * as React from "react";
import { useContext } from "react";
import {
    Typography,
    Box,
    Alert,
    AlertTitle,
    Button
} from "@mui/material";
import { Link } from "react-router-dom";
import { Test_context } from "../../../Context/Test-context";


export default function ListItems() {
 
    const { OficialAlerts ,setSingleRSSMap} = useContext(Test_context);
    const Pais = OficialAlerts?.response?.Pais;
    const items = OficialAlerts?.response[Pais] || [];




    if (!items.length) {
        return (
            <Typography variant="body">
                No hay alertas disponibles
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                maxHeight: 400,
                overflowY: "auto",
                pr: 1
            }}
        >
            {items.map((element, idx) => (
                <Box key={element.title || idx} sx={{ mb: 2 }}>
                    <Alert key={element.title}
                        severity="info"
                        action={OficialAlerts.response.prefijo === 'cap' ? (
                            <Link to='/viewerDetails/'>
                                <Button
                                    color="inherit"
                                    size="small"
                                    
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={()=>setSingleRSSMap(element.link)}
                                >
                                    Revisar Area
                                </Button>
                            </Link>
                        ) :
                            <Button
                                color="inherit"
                                size="small"
                                href={element.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                VER
                            </Button>
                        }
                    >
                        <AlertTitle >{element.title}</AlertTitle>

                        <Typography variant="caption" display="block">
                            Fecha:{" "}
                            {new Date(element.pubDate).toLocaleString("es-CO")}
                        </Typography>
                    </Alert>
                </Box>
            ))}
        </Box>
    );
}
