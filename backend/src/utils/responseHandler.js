export const sendSuccess = (res, statusCode = 200, msg = "Success", data = null) => {
    res.status(statusCode).json({
        success: true,
        msg, 
        data
    })
}

export const sendError = (res, statusCode = 500, msg = "Something went wrong", errors = null ) => {
    res.status(statusCode).json({
        success: false,
        msg, 
        errors
    })
} 