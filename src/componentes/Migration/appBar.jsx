import { Box, Card, CardContent, Button, ButtonGroup, Typography, Toolbar, AppBar } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../Context/MetricsContext";
const AppBarContent = () => {
    const { migrateVersion, setMigrateVersion } = useContext(DataContext);
    const { dark_theme_letters,isDay_global, setDarkLetters } = useContext(DataContext);
    const handleMigrateVersion = () => {
        setMigrateVersion(false);
    }
    return (
        <AppBar sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(5px)'
        }}>
            <Toolbar>
                <Button onClick={handleMigrateVersion} sx={{ color:isDay_global ? 'white' : 'black'}}>Menu Principal</Button>
            </Toolbar>
        </AppBar>
    );
}
export default AppBarContent;