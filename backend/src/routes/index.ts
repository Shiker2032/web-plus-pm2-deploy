import { Router, Request, Response, NextFunction } from "express";
import userRouter from "./users";
import cardRouter from "./cards";
import auth from "../middlewares/auth";
import NotFoundError from "../errors/not-found-error";
import { createUser, login } from "../controllers/users";
import {
  validateUserBody,
  validateAuthentication,
} from "../middlewares/validatons";

const router = Router();
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

// все роуты, кроме /signin и /signup, защищены авторизацией;
router.use(auth);
router.use("/users", userRouter);
router.use("/cards", cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Маршрут не найден"));
});

export default router;
