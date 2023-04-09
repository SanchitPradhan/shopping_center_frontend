import React from 'react'
import { Col, Row, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

const ProductDetails = () => {
    const location = useLocation();
    const productData = location.state;

    console.log("productData", productData)

    let numFormat = Intl.NumberFormat('en-IN');

    return (
        <div>
            <Row className='m-3'>
                <Col md={3}>
                    <img src={productData.images[0]} style={{ width: "350px", height: "400px" }} alt={"product"} />
                    <Row className='product-button-box d-flex justify-content-center text-center mt-3 w-4'>
                        <Col md={6}>
                            <Button className='product-addtocart'>Add To Cart</Button>
                        </Col>
                        <Col md={6}>
                            <Button className='product-addtocart'>Buy Now</Button>
                        </Col>
                    </Row>
                </Col>
                <Col md={8} className='pp-4 ms-5'>
                    <h1><strong>{productData.brand}{" "}{productData.name}</strong></h1>
                    <hr />
                    <div className='mt-4 mb-4'>
                        <h3>
                            <strong style={{ color: 'green' }}>  ₹ {numFormat.format(productData.discounted_price.toFixed(0))}</strong>
                            <strong style={{ color: 'orange' }}>{" -("}{productData.discount}{")"}%</strong>
                        </h3>
                        <h5>
                            <strong style={{ color: 'red', textDecoration: 'line-through' }}>M.R.P. :{" "}₹ {numFormat.format(productData.price)}</strong>
                        </h5>
                    </div>
                    <hr />
                    <div>
                        <h5>Description: <br /><br />
                            {productData.description}
                        </h5>
                    </div>
                    
                </Col>
            </Row>

        </div>
    )
}

export default ProductDetails
