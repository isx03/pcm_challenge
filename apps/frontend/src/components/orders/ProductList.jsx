import { Button, Card, Col, Row } from "react-bootstrap"
import products from "../../data/products.json"

const ProductList = ({ addProduct }) => {
    return (
        <Row>
            { products.map(product=>(
                <Col
                    xs={6}
                    md={4}
                    xl={3}
                    key={product.id} className="py-4">
                    <Card>
                        <Card.Img
                            variant="top"
                            src={product.img} 
                            alt={product.name} />
                        <Card.Body>
                            <h6>{ product.name }</h6>
                            <Card.Text>Precio: S/ { product.price }</Card.Text>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => addProduct(product)}>AGREGAR</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            )) }
        </Row>
    )
}

export default ProductList