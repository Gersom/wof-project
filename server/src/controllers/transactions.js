const ErrorHandler = require("../handlers/transactions")
const {
  getAllTransactionsLogic,
  getTransactionByPostLogic,
  postTransactionLogic,
} = require("../logic/transactions")
const catchedAsync = require("../utils/catchedAsync")


// READ ITEMS
const getAllTransactions = catchedAsync( async (req, res) => {
  const { post } = req.query
  if(post){
    const transaction = await getTransactionByPostLogic(post)
    return res.status(200).json(transaction)
  }
  const transactions = await getAllTransactionsLogic()
  return res.status(200).json(transactions)
}, ErrorHandler.getAllTransactionsErrorHandler)

// CREATE ITEM
const createTransaction = catchedAsync( async (req, res) => {
  
  const newTransaction = await postTransactionLogic(req.body)
  res.status(200).json(newTransaction);
  
},ErrorHandler.createTransactionErrorHandler);

module.exports = {
  getAllTransactions,
  createTransaction,
};
