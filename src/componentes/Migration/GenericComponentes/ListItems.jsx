import * as React from "react";
import { useContext, useState } from "react";
import {
    Typography,
    Box,
    Alert,
    AlertTitle,
    Button,
    TextField
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Test_context } from "../../../Context/test-context";


export default function ListItems() {

    const { OficialAlerts, setSingleRSSMap } = useContext(Test_context);
    const Pais = OficialAlerts?.response?.Pais;
    const items = OficialAlerts?.response[Pais] || [];
    const [search, setSearch] = useState("");

    console.log(items);
    const filteredItems = items.filter((element) => {
        return element?.title.toLowerCase().includes(search.toLowerCase())
    })




    if (!items.length) {
        return (
            <Typography variant="body">
                No hay alertas disponibles
            </Typography>
        );
    }

    return (
        <Box>

            <TextField
                fullWidth
                variant="standard"
                placeholder="Buscar alerta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <SearchIcon
                                sx={{
                                    color: "text.secondary",
                                    mr: 1,
                                    fontSize: 21,
                                }}
                            />
                        ),
                    },
                }}
                sx={{
                    mb: 2,

                    "& .MuiInput-root": {
                        "&:before": {
                            borderBottom: "1px solid #d0d7de",
                        },

                        "&:after": {
                            borderBottom: "2px solid #1976d2",
                        },

                        "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "1px solid #1976d2",
                        },
                    },

                    "& .MuiInputBase-input": {
                        padding: "8px 0",
                        fontSize: "0.9rem",
                    },

                    "& .MuiInputBase-input::placeholder": {
                        color: "#fdfdfd",
                        opacity: 1,
                    },
                }}
            />

            <Box
                sx={{
                    maxHeight: 400,
                    overflowY: "auto",
                    pr: 1
                }}
            >

                {!filteredItems.length ? (
                    <Typography variant="body2">
                        No se encontraron alertas
                    </Typography>
                ) : (
                    filteredItems.map((element, idx) => (
                        <Box key={`${element.title}_${idx}`} sx={{ mb: 2 }}>

                            <Alert
                                key={element.title}
                                severity="info"
                                action={
                                    OficialAlerts.response.prefijo === 'cap'
                                        ? (
                                            <></>
                                        )
                                        :
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

                                <AlertTitle>
                                    {element.title}
                                </AlertTitle>

                                <Typography variant="caption" display="block">
                                    Fecha:{" "}
                                    {new Date(element.pubDate).toLocaleString("es-CO")}
                                </Typography>

                            </Alert>

                        </Box>
                    ))
                )}

            </Box>

        </Box>
    );
}
/*<Button
                                    color="inherit"
                                    size="small"
                                    
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={()=>setSingleRSSMap(element.link)}
                                >
                                    Revisar Area
                                </Button>*/