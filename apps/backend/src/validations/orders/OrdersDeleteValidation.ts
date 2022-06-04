import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { StatusCodes } from "http-status-codes";

const OrdersDeleteValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        id: Joi.number().required().min(1).messages({
            "number.base": `Formato incorrecto`,
            "any.required": `Formato incorrecto`,
            "number.min": `Formato incorrecto`
        })
    })

    const validation = schema.validate(req.params)

    if( validation.error ){
        const errors = validation.error.details.map(detail=>detail.message)
        const errorStr = errors.join("")
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: errorStr
        })
    }
    next()
}

export default OrdersDeleteValidation