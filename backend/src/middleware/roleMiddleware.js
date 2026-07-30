import { sendError } from '../utils/responseHandler.js';

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role))
            return sendError(res, 403, 'Forbidden: You do not have permission to access this resource.')
        next()
    }
} 

export default authorizeRoles