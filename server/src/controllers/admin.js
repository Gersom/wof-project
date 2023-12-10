const { getUsersStatsErrorhandler } = require("../handlers/admin");
const { getAllUsersStatsLogic, getUsersInfoLogic } = require("../logic/admin");
const catchedAsync = require("../utils/catchedAsync");

const getUserStats = catchedAsync(async(req, res) => {
    const stats = await getAllUsersStatsLogic();
    res.status(200).json(stats)
}, getUsersStatsErrorhandler);

const getUsersInfo = catchedAsync(async(req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const stats = await getUsersInfoLogic(Number(page), Number(pageSize));
    res.status(200).json(stats)
}, getUsersStatsErrorhandler)

module.exports = { getUserStats, getUsersInfo };