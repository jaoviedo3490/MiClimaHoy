import { Box, Card, CardContent, Button, ButtonGroup, Typography, Toolbar, AppBar } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../Context/MetricsContext";
const AppBarContent = () => {
    const { migrateVersion, setMigrateVersion } = useContext(DataContext);
    const handleMigrateVersion = () => {
        setMigrateVersion(false);
    }
    return (
        <AppBar>
            <Toolbar>
                <Button onClick={handleMigrateVersion} sx={{color:'white'}}>Menu Principal</Button>
            </Toolbar>
        </AppBar>
    );
}
export default AppBarContent;