
import * as React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useContext, useState } from "react";
import {
    Typography,
    Box,
    Alert,
    AlertTitle,
    Button,
    TextField
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { Test_context } from "../../../Context/test-context";

export default function ListItems() {

    const { OficialAlerts } = useContext(Test_context);
    const Pais = OficialAlerts?.response?.Pais;
    const items = OficialAlerts?.response?.[Pais] || [];
    const [search, setSearch] = useState("");


    const filteredItems = items.filter((element) => {
        return element?.title?.toLowerCase().includes(search.toLowerCase());
    });

    if (!items.length) {
        return (
            <Typography variant="body">
                No hay alertas disponibles
            </Typography>
        );
    }

    return (
        <Box sx={{ width: "100%" }}>

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
                        transition: "all 0.2s ease",

                        "&:before": {
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        },

                        "&:after": {
                            borderBottom: "2px solid",
                            borderColor: "primary.main",
                        },

                        "&:hover:not(.Mui-disabled):before": {
                            borderBottom: "1px solid",
                            borderColor: "primary.main",
                        },
                    },

                    "& .MuiInputBase-input": {
                        padding: "9px 0",
                        fontSize: "0.9rem",
                    },

                    "& .MuiInputBase-input::placeholder": {
                        color: "text.secondary",
                        opacity: 1,
                    },
                }}
            />

            <Box
                sx={{
                    maxHeight: 400,
                    overflowY: "auto",
                    pr: 1,

                    "&::-webkit-scrollbar": {
                        width: 6,
                    },

                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "divider",
                        borderRadius: 10,
                    },

                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                }}
            >

                {!filteredItems.length ? (

                    <Box
                        sx={{
                            py: 5,
                            px: 2,
                            textAlign: "center",
                            color: "text.secondary",
                        }}
                    >
                        <SearchOffIcon
                            sx={{
                                fontSize: 36,
                                mb: 1,
                                opacity: 0.5,
                            }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                            }}
                        >
                            No se encontraron alertas
                        </Typography>

                        {search && (
                            <Typography
                                variant="caption"
                                sx={{
                                    display: "block",
                                    mt: 0.5,
                                    opacity: 0.7,
                                }}
                            >
                                Intenta con otro término de búsqueda
                            </Typography>
                        )}
                    </Box>

                ) : (

                    filteredItems.map((element, idx) => {

                        const severity = element?.["cap:severity"];

                        const alertSeverity =
                            severity === "Moderate"
                                ? "warning"
                                : severity === "Severe"
                                    ? "error"
                                    : severity === "Extreme"
                                        ? "error"
                                        : "info";

                        return (
                            <Box
                                key={`${element.title}_${idx}`}
                                sx={{
                                    mb: 1.5,

                                    "&:last-child": {
                                        mb: 0,
                                    },
                                }}
                            >

                                <Alert
                                    severity={alertSeverity}
                                    variant="outlined"

                                    action={
                                        OficialAlerts.response.prefijo !== "cap" && (
                                            <Button
                                                color="info"
                                                size="small"
                                                href={element.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                endIcon={
                                                    <OpenInNewIcon fontSize="small" />
                                                }
                                                sx={{
                                                    minWidth: "auto",
                                                    fontWeight: 700,
                                                    fontSize: "0.7rem",
                                                    letterSpacing: "0.03em",
                                                    px: 1.25,
                                                    py: 0.5,
                                                    borderRadius: 1.5,
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                VER
                                            </Button>
                                        )
                                    }

                                    sx={{
                                        alignItems: "flex-start",
                                        borderRadius: 2,
                                        py: 1,
                                        px: 1.25,

                                        backgroundColor:
                                            severity === "Moderate"
                                                ? "#ED6C02"
                                                : severity === "Severe"
                                                    ? "#D32F2F"
                                                    : severity === "Extreme"
                                                        ? "#7B1FA2"
                                                        : "#1976D2",

                                        borderColor:
                                            severity === "Moderate"
                                                ? "#E65100"
                                                : severity === "Severe"
                                                    ? "#C62828"
                                                    : severity === "Extreme"
                                                        ? "#6A1B9A"
                                                        : "#1565C0",

                                        color: "#fff",

                                        "& .MuiAlert-icon": {
                                            color: "#fff",
                                            mt: 0.15,
                                            mr: 1,
                                            fontSize: "1.3rem",
                                        },

                                        "& .MuiAlert-message": {
                                            width: "100%",
                                            minWidth: 0,
                                            py: 0.15,
                                            color: "#fff",
                                        },

                                        "& .MuiAlert-action": {
                                            pt: 0.2,
                                            pr: 0,
                                            mr: 0,
                                            alignItems: "center",
                                        },

                                        "& .MuiAlertTitle-root": {
                                            color: "#fff",
                                        },
                                    }}
                                >

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 1,
                                            mb: 0.5,
                                        }}
                                    >

                                        <AlertTitle
                                            sx={{
                                                mb: 0,
                                                fontWeight: 700,
                                                fontSize: "0.9rem",
                                                lineHeight: 1.3,
                                                color: "#fff",
                                            }}
                                        >
                                            {element?.title}
                                        </AlertTitle>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "0.68rem",
                                                lineHeight: 1,
                                                color: "rgba(255,255,255,0.9)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                                whiteSpace: "nowrap",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {severity === "Moderate"
                                                ? "Moderada"
                                                : severity === "Severe"
                                                    ? "Severa"
                                                    : severity === "Extreme"
                                                        ? "Extrema"
                                                        : "Información"}
                                        </Typography>

                                    </Box>

                                    {element?.content && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "0.82rem",
                                                lineHeight: 1.55,
                                                color: "#fff",
                                                mb: 0.75,
                                            }}
                                        >
                                            {element.content}
                                        </Typography>
                                    )}

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                            color: "rgba(255,255,255,0.8)",
                                            fontSize: "0.7rem",
                                        }}
                                    >
                                        <AccessTimeIcon
                                            sx={{
                                                fontSize: 14,
                                            }}
                                        />

                                        {new Date(element?.pubDate).toLocaleString(
                                            "es-CO",
                                            {
                                                dateStyle: "short",
                                                timeStyle: "short",
                                            }
                                        )}
                                    </Typography>

                                </Alert>

                            </Box>
                        );
                    })
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