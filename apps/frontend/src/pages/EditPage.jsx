import { useParams } from "react-router-dom"
import FormOrder from "../components/orders/FormOrder"
import useFetch from "../hooks/useFetch"

const EditPage = () => {
    const { id } = useParams()
    const [order] = useFetch(`${process.env.REACT_APP_URL_API}/orders/${id}`)
    return (
        <FormOrder
            titleAction={'Editar pedido'}
            type={'edit'}
            order={order}
            />
    )
}

export default EditPage