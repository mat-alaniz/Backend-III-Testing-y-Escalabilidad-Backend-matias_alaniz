

const errorHandler = (error, req, res, next) => {
    console.log('🔴 ERROR:', error.message);
    
    // Errores de MongoDB
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: 'Error de validación: ' + error.message
        });
    }
    
    if (error.code === 11000) {
        return res.status(400).json({
            success: false,
            error: 'El registro ya existe en la base de datos'
        });
    }
    
    
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor: ' + error.message
    });
};

export default errorHandler;