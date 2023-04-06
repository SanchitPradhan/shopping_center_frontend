import React from 'react'
import { Col, Row } from 'react-bootstrap';
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
                </Col>
                <Col md={8} className='ms-5'>
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

                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default ProductDetails
