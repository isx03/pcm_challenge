import express from "express"
import OrdersController from "../controllers/OrdersController"
import OrdersDeleteValidation from "../validations/orders/OrdersDeleteValidation"
import OrdersEditValidation from "../validations/orders/OrdersEditValidation"
import OrdersStoreValidation from "../validations/orders/OrdersStoreValidation"
import OrdersUpdateValidation from "../validations/orders/OrdersUpdateValidation"

const router = express.Router()

const OrdersRouters = () => {
    router.get("/", OrdersController.index)
    router.post("/", OrdersStoreValidation, OrdersController.store)
    router.get("/:id", OrdersEditValidation, OrdersController.edit)
    router.put("/:id", OrdersUpdateValidation, OrdersController.update)
    router.delete("/:id", OrdersDeleteValidation, OrdersController.delete)
    return router
}

export default OrdersRouters