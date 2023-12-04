
const sendVerifyEmailErrorHandler = (err, req, res, next) => {
    console.error("Error in sendVerifyEmailErrorHandler:", err);

    if (err.name === "NotFoundError") {
        res.status(404).json({ error: "User not found in sendVerifyEmail operation." });
    } else {
        res.status(500).json({ error: "Internal server error while sending verify email." });
    }
}

const verifyEmailErrorHandler = (err, req, res, next) => {
    console.error("Error in verifyEmailErrorHandler:", err);

    if (err.name === "NotFoundError") {
        res.status(404).json({ error: "User not found in verifyEmail operation." });
    } else {
        res.status(500).json({ error: "Internal server error while verifying email." });
    }
}