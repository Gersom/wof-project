const catchedFunction = (fn, errorHandler) => (next) => {
    try {
        fn(next);
    } catch (error) {
        if (errorHandler) {
            errorHandler(error, next);
        } else {
            next(error);
        }
    }
};

module.exports = catchedFunction;
