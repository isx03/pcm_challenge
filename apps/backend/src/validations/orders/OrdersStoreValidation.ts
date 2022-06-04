import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { StatusCodes } from "http-status-codes";

const OrdersStoreValidation = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        client: Joi.string().regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑüÜ'-\s]+$/).required().messages({
            "string.base": `El nombre del cliente solo debe tener letras`,
            "string.empty": `Ingrese el nombre del cliente`,
            "string.pattern.base": `El nombre del cliente solo debe tener letras`,
            "any.required": `"" is a required field`
        }),
        table_number: Joi.number().required().messages({
            "number.base": `El nro de mesa debe ser un número`,
            "any.required": `El nro de mesa debe ser un número`
        }),
        dishes: Joi.array().required().messages({
            "array.base": `Seleccione los platos a ordenar`,
            "any.required": `Seleccione los platos a ordenar`
        })
    })

    const validation = schema.validate(req.body)
    if( validation.error ){
        const errors = validation.error.details.map(detail=>detail.message)
        const errorStr = errors.join("")
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: errorStr
        })
    }
    next()
}

export default OrdersStoreValidation