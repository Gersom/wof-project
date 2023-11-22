const catchedAsync = (fn, errorHandler) => async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            if (errorHandler) {
                errorHandler(error, req, res, next);
            } else {
                next(error);
            }
        }
    };
    
module.exports = catchedAsync;
    