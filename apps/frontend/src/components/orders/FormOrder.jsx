import { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductList from './ProductList'
import ProductListSelected from './ProductListSelected'

const FormOrder = ({ titleAction, type, order }) => {
    useEffect(()=>{
        if( order ){
            setProductListSelected(order.dishes)
        }
    }, [order])

    const [productListSelected, setProductListSelected] = useState([])


    const addProduct = (product) => {
        const productFound = productListSelected.find(productSelected=>product.id === productSelected.id)
        if( !productFound ){
            setProductListSelected([
                ...productListSelected,
                {
                    ...product,
                    qty: 1
                }
            ])
        }else{
            const newList = productListSelected.map(productSelected=>{
                if( productSelected.id === product.id ){
                    productSelected.qty += 1
                }
                return productSelected
            })
            setProductListSelected(newList)
        }
        console.log(productListSelected)
    }

    const removeProduct = (productId) => {
        const newList = productListSelected.filter(product=>product.id !== productId)
        setProductListSelected(newList)
    }

    const increaseQty = (position) => {
        productListSelected[position].qty += 1
        setProductListSelected([...productListSelected])
    }

    const decreaseQty = (position) => {
        if( productListSelected[position].qty === 1 ) return
        productListSelected[position].qty -= 1
        setProductListSelected([...productListSelected])
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center my-5">
                <Col md={10}>
                    <h2>{ titleAction }</h2>
                </Col>
                <Col md={2}>
                    <Link to="/">
                        <div className="d-grid gap-2">
                            <Button variant="danger" size='sm' >ATRAS</Button>
                        </div>
                    </Link>
                </Col>
                <Col md={7} xl={8}>
                    <ProductList
                        addProduct={addProduct}/>
                </Col>
                <Col md={5} xl={4}>
                    <ProductListSelected
                        productsSelected={productListSelected}
                        removeProduct={removeProduct}
                        increaseQty={increaseQty}
                        decreaseQty={decreaseQty}
                        type={type}
                        clientData={order}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default FormOrder