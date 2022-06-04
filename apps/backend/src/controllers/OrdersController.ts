import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Order from "../models/Order";

class OrdersController{
    index = async (req: Request, res: Response) => {
        try {
            const orders = await Order.findAll({
                attributes: ["id", "client", "table_number", "created_at"],
                order: [['id', 'DESC']]
            })
            res.status(StatusCodes.OK).json(orders)
        } catch (error) {
            console.log(error)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Proceso no realizado, intentelo mas tarde"
            })
        }
    }

    store = async (req: Request, res: Response) => {
        try {
            await Order.create(req.body)
            res.status(StatusCodes.CREATED).json({
                message: "Proceso realizado"
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Proceso no realizado, intentelo mas tarde"
            })
        }
    }

    edit = async (req: Request, res: Response) => {
        try {
            const order = await Order.findByPk(req.params.id, {
                attributes: ["id", "client", "table_number", "dishes"]
            })
            if(!order){
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: "Pedido no encontrado"
                })
            }
            res.status(StatusCodes.OK).json(order)
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Proceso no realizado, intentelo mas tarde"
            })
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const order = await Order.findByPk(req.params.id)
            if(!order){
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: "Pedido no encontrado"
                })
            }

            await Order.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

            res.status(StatusCodes.OK).json({
                message: "Proceso realizado"
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Proceso no realizado, intentelo mas tarde"
            })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const order = await Order.findByPk(req.params.id)
            if(!order){
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: "Pedido no encontrado"
                })
            }

            await order.destroy()

            res.status(StatusCodes.OK).json({
                message: "Proceso realizado"
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Proceso no realizado, intentelo mas tarde"
            })
        }
    }
}

export default new OrdersController