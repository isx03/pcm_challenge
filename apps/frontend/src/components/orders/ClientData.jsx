import { useEffect, useRef, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom"
import tables from "../../data/tables.json"

const MySwal = withReactContent(Swal)

const ClientData = ({products, type, clientData}) => {

    const navigate = useNavigate()

    const notifyError = (error) => toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const client = useRef()
    const [tableId, setTableId] = useState("")

    useEffect(()=>{
        if( clientData ){
            setTableId(clientData.table_number)
        }
    },[clientData])

    const changeTable = (e) => {
        setTableId(e.target.value)
    }

    const saveOrder = () => {
        if( products.length === 0 ){
            return notifyError('No hay productos agregados para la orden')
        }

        let url = `${process.env.REACT_APP_URL_API}/orders`
        if( type === 'edit' ){
            url += `/${clientData.id}`
        }

        const body = JSON.stringify({
            table_number: tableId,
            client: client.current.value,
            dishes: products
        })

        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const requestOptions = {
            method: type === 'store' ? 'POST' : 'PUT',
            headers: myHeaders,
            body,
            redirect: 'follow'
        }

        fetch(url, requestOptions)
        .then(async response => {
            if( response.status === 201 || response.status === 200 ){
                MySwal.fire({
                    title: `Proceso realizado exitosamente`,
                    icon: 'success',
                    timer: 2000,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    willClose: () => {
                        navigate("/")
                    }
                })
            }else{
                const { error } = await response.json()
                notifyError(error)
            }
        })
    }

    const titleButton = type === 'store' ? 'GUARDAR' : 'EDITAR'

    return (
        <>
            <Row>
                <Col xl={6}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>MESA</Form.Label>
                        <Form.Select
                            type="select"
                            value={tableId}
                            onChange={changeTable}
                            >
                            { tables.map(table=>(
                                <option
                                    key={table.id}
                                    value={table.id}>{table.name}</option>
                            )) }
                        </Form.Select>
                    </Form.Group>

                </Col>

                <Col xl={12} className="my-4">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>CLIENTE</Form.Label>
                        <Form.Control
                            ref={client}
                            defaultValue={clientData?.client}
                            type="text"
                            placeholder="Ingrese el nombre del cliente" />
                    </Form.Group>
                </Col>

                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="success" onClick={()=>saveOrder()}>{ titleButton }</Button>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </>
    )
}

export default ClientData