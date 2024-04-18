import { Router } from "express";
import { CreateUserController } from "./src/controllers/User/CreateUserController";
import { LoginUserController } from "./src/controllers/User/LoginUserController";
import { Auth } from "./src/middleware/auth";
import { CreatePostController } from "./src/controllers/Post/CreatePostController";
import { UpdatePostController } from "./src/controllers/Post/UpdatePostController";
import { FindAllPostByUserIdController } from "./src/controllers/Post/FindAllPostByUserIdController";
import { FindOnePostByUserIdPostIdController } from "./src/controllers/Post/FindOnePostByUserIdPostIdController";
import { DeletePostByIdController } from "./src/controllers/Post/DeletePostByIdController";

const router = Router();

router.post("/register", new CreateUserController().handle); // feito
router.post("/login", new LoginUserController().handle); // feito
router.post("/posts", Auth, new CreatePostController().handle); // feito
router.put("/posts/:id", Auth, new UpdatePostController().handle); // feito
router.get("/posts", Auth, new FindAllPostByUserIdController().handle); // feito
router.get("/posts/:id", Auth, new FindOnePostByUserIdPostIdController().handle); // feito
router.delete("/posts/:id", Auth, new DeletePostByIdController().handle); // feito

export default router;