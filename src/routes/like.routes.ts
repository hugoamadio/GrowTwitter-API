import { Router } from "express";
import LikeController from "../controller/like.controller";
import authMiddleware from "../middleware/auth.middleware";

const routes = () => {
  const router = Router();
  const controller = new LikeController();

  router.post("/", authMiddleware, controller.create);
  router.get("/", authMiddleware, controller.list);
  router.get("/:id", authMiddleware, controller.show);
  router.put("/:id", authMiddleware, controller.update);
  router.delete("/:id", authMiddleware, controller.delete);

  return router;
};

export default routes;
