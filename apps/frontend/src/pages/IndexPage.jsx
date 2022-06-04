import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useFetch from '../hooks/useFetch'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'

const MySwal = withReactContent(Swal)

const IndexPage = () => {
    const [orders, setOrders] = useFetch(`${process.env.REACT_APP_URL_API}/orders`)

    const notifySuccess = (description) => toast.success(description, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

    const deleteOrder = (orderId) => {
        MySwal.fire({
            title: `¿Estas seguro de eliminar el pedido N° ${orderId}?`,
            text: "Una vez realizado ya no se podra revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_URL_API}/orders/${orderId}`, {
                    method: 'DELETE'
                })
                .then(()=>{
                    notifySuccess(`Pedido N° ${orderId} eliminado correctamente`)
                    const ordersFiltered = orders.filter(order=>order.id!==orderId)
                    setOrders(ordersFiltered)
                })
            }
        })
    }

    return (
        <Container>
            <ToastContainer />
            <Row className="justify-content-md-center my-5">
                <Col md={10}>
                    <h2>Pedidos</h2>
                </Col>
                <Col md={2}>
                    <Link to="/register">
                        <div className="d-grid gap-2">
                            <Button variant="success" size='sm' >REGISTRAR PEDIDO</Button>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Table responsive bordered>
                        <thead className='well'>
                            <tr>
                                <th>#</th>
                                <th>Nro Mesa</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th className='text-center'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.length > 0 ? (
                                    orders.map(order=>(
                                        <tr key={ order.id }>
                                            <td>{ order.id }</td>
                                            <td>{ order.table_number }</td>
                                            <td>{ order.client }</td>
                                            <td>{ moment(order.created_at).format('DD/MM/YYYY hh:mm a') }</td>
                                            <td className='text-center' width={'200px'}>
                                                <Link to={`/edit/${order.id}`} className='btn btn-warning btn-sm'>EDITAR</Link>
                                                {' '}
                                                <Button variant="danger" size='sm' onClick={ () => deleteOrder(order.id) }>ELIMINAR</Button>
                                            </td>
                                        </tr>
                                    )) 
                                ) : (
                                <tr>
                                    <td colSpan={5}>No se encontraron pedidos</td>
                                </tr> 
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default IndexPage