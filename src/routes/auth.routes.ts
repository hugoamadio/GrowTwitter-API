import { Router } from "express"
import AuthController from "../controller/auth.controller"

const routes = () => {
    const router = Router()
    const controller = new AuthController()

    router.post('/', controller.create)

    // router.post('/login', controller.login)

    return router
}

export default routes