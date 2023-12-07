const { getUsersStatsErrorhandler } = require("../handlers/breeds");
const { getAllUsersStatsLogic } = require("../logic/admin");
const catchedAsync = require("../utils/catchedAsync");

const getUserStats = catchedAsync(async(req, res) => {
    const stats = await getAllUsersStatsLogic();
    res.status(200).json(stats)
}, getUsersStatsErrorhandler)

module.exports = { getUserStats };