import { Router } from "express";
import validate from "../middleware/validateFields.js";
import { check } from "express-validator";
import AccountController from "../Controller/AccountController.js";
const routes = Router();

routes.post(
  "/create-account",
  [check("accountNumber", "Account number is required").not().isEmpty()],
  validate,
  AccountController.CreateAccount
);
routes.get("/consult-account/:accountNumber", AccountController.ConsultAccount);

routes.post(
  "/send-transaction",
  [
    check("accountNumber", "Account number is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
    check("amount", "amount is required").not().isEmpty(),
  ],
  validate,
  AccountController.SendTransaction
);
routes.get("/consult-transaction/:id", AccountController.ConsultTransaction);

export default routes;
