import Typography from '@mui/material/Typography';
const renderMessage = ({ errors, fieldName }) => {
    // Verificar si el campo está "sucio" y tiene errores
    if (errors[fieldName]) {
        return (
            <Typography variant="caption" style={{ fontSize: '0.8rem', textTransform: 'lowercase' }} color="error">
                {errors[fieldName].charAt(0).toUpperCase() + errors[fieldName].slice(1)}
            </Typography>
        );
    }
    // Si el campo no está "sucio" o no tiene errores, no mostrar ningún mensaje
    return null;
};
export {
    renderMessage,
};