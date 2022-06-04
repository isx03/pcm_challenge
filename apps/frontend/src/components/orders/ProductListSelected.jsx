import { Button, Table } from "react-bootstrap"
import ClientData from "./ClientData"

const styles = {
    buttonsQty: {
        width: '25px',
        height: '25px',
        padding: '0'
    }
}

const ProductListSelected = ({productsSelected, removeProduct, increaseQty, decreaseQty, type, clientData}) => {
    let total = productsSelected.reduce((previousValue, product) => previousValue + (product.price * product.qty), 0)
    total = total.toFixed(2)

    return (
        <>
            <Table responsive bordered className="mt-4">
                <thead className='well'>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th width={100}>Cant.</th>
                        <th>Sub. Total</th>
                        <th className='text-center'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productsSelected.length > 0 ? (
                            productsSelected.map((product, index)=>(
                                <tr key={index}>
                                    <td>{ index + 1 }</td>
                                    <td>{ product.name }</td>
                                    <td className="text-end">{ product.price }</td>
                                    <td className="text-center">
                                        <Button
                                            variant="success"
                                            size="sm"
                                            style={styles.buttonsQty}
                                            onClick={() => increaseQty(index)}>+</Button>{' '}
                                        { product.qty }  {' '}
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            style={styles.buttonsQty}
                                            onClick={() => decreaseQty(index)}>-</Button>
                                    </td>
                                    <td className="text-end">{ (product.qty * product.price).toFixed(2) }</td>
                                    <td className="text-center">
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={ () => removeProduct(product.id) }>Quitar</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>No hay productos agregados</td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={4} className="text-end">Total S/</th>
                        <th className="text-end">{ total }</th>
                        <th></th>
                    </tr>
                </tfoot>
            </Table>
            <ClientData
                products={productsSelected}
                type={type}
                clientData={clientData}/>
        </>

    )
}

export default ProductListSelected