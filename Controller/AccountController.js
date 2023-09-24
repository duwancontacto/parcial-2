import { Account } from "../Model/AccountModel.js";
import { Transaction } from "../Model/TransactionModel.js";

const CreateAccount = async (req, res) => {
  try {
    const { accountNumber } = req.body;
    const account = await Account.create({ accountNumber, balance: 0 });
    return res.status(201).json({ account });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const ConsultAccount = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const account = await Account.findOne({ where: { accountNumber } });
    if (account) {
      return res.status(200).json({ account });
    }
    return res.status(404).send("Account not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const SendTransaction = async (req, res) => {
  try {
    const { accountNumber, type, amount } = req.body;
    const account = await Account.findOne({ where: { accountNumber } });

    if (type !== "deposit" && type !== "withdraw")
      return res.status(400).send("Invalid transaction type");

    if (account) {
      if (type === "deposit") {
        account.balance = account.balance + amount;
      } else if (type === "withdraw") {
        if (amount > account.balance) {
          return res.status(400).send("Insufficient funds");
        }
        account.balance = account.balance - amount;
      }
      await account.save();
      const transaction = await Transaction.create({
        accountNumberId: accountNumber,
        type,
        amount: amount,
        balance: account.balance,
      });
      return res.status(201).json({ transaction });
    }
    return res.status(404).send("Account not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const ConsultTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await Transaction.findAll({
      where: { id },
    });
    if (transactions) {
      return res.status(200).json({ transactions });
    }
    return res.status(404).send("Transactions not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default {
  CreateAccount,
  ConsultAccount,
  SendTransaction,
  ConsultTransaction,
};
