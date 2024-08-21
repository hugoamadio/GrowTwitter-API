import { Router } from "express"
import LikeController from "../controller/like.controller"

const routes = () => {
    const router = Router()
    const controller = new LikeController()

    router.post('/', controller.create)
    router.get('/', controller.list)
    router.get('/:id', controller.show)
    router.put('/:id', controller.update)
    router.delete('/:id', controller.delete)

    return router
}

export default routes