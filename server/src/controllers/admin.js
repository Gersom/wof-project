const { getUsersStatsErrorhandler } = require("../handlers/admin");
const { getAllUsersStatsLogic, getUsersInfoLogic, restoreUserLogic, deleteUserLogic } = require("../logic/admin");
const catchedAsync = require("../utils/catchedAsync");

const getUserStats = catchedAsync(async (req, res) => {
    const stats = await getAllUsersStatsLogic();
    res.status(200).json(stats)
}, getUsersStatsErrorhandler);

const getUsersInfo = catchedAsync(async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const stats = await getUsersInfoLogic(Number(page), Number(pageSize));
    res.status(200).json(stats)
}, getUsersStatsErrorhandler);

const deleteUser = catchedAsync(async (req, res) => {
    const { id } = req.params;
    const response = await deleteUserLogic(id);
    res.status(200).json(response);
}, getUsersStatsErrorhandler);

const restoreUser = catchedAsync(async (req, res) => {
    const { id } = req.params;
    const response = await restoreUserLogic(id);
    res.status(200).json(response);
}, getUsersStatsErrorhandler);


module.exports = { getUserStats, getUsersInfo, restoreUser, deleteUser };