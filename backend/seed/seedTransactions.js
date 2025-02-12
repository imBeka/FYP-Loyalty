import Transaction from "../models/transactionModel.js"; // Adjust the path to your Transaction model
import transactions from "./fakeTransactions.js"; // Adjust the path to your fake transactions data

const seedTransactions = async () => {
    try {
      // Clear existing transactions
      await Transaction.deleteMany({});
  
      // Insert fake transactions
      await Transaction.insertMany(transactions);
  
      console.log("Transactions seeded successfully!");
    } catch (error) {
      console.error("Error seeding transactions:", error);
    }
  };
  
export default seedTransactions