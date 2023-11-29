const getAllTransactionsErrorHandler = (error, req, res, next) => {

  console.error("Error in getAllTransactions:", error);
  res.status(500).json({ error: "An error occurred while retrieving the transactions." });
};

const createTransactionErrorHandler = (error, req, res, next) => {

  console.error("Error in createTransaction:", error);
  res.status(500).json({ error: "An error occurred while creating the transaction." });
};


module.exports = {
  getAllTransactionsErrorHandler,
  createTransactionErrorHandler
}