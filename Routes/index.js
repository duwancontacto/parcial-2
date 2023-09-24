import AccountRoutes from "./AccountRoutes.js";

const routes = (app) => {
  app.use("/api/account", AccountRoutes);
};

export default routes;
