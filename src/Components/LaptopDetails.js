import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Col, Row, Button } from 'react-bootstrap';
import { IoIosShareAlt } from "react-icons/io";
import { useLocation } from 'react-router-dom'

const LaptopDetails = () => {

  const location = useLocation();
  const productData = location.state;

  const handleShare = () => {

    navigator.clipboard.writeText(window.location.href);
    toast.success('Link Copied Successfully', { autoClose: 2000 });

  }

  const addToCart = () => {

    toast.success(`${productData.brand} ${productData.name} added to cart`, { autoClose: 2000 });

  }

  const buyNow = () => {

    toast.success('Please wait redirecting', { autoClose: 2000 });

  }

  let numFormat = Intl.NumberFormat('en-IN');

  return (
    <div>
      <Row className='m-3'>
        <Col md={3}>
          <img src={productData.image} style={{ width: "400px", height: "350px" }} alt={"product"} />
          <Row className='product-button-box d-flex justify-content-center text-center mt-3'>
            <Col md={6}>
              <Button
                className='product-addtocart'
                onClick={addToCart}
              >
                Add To Cart
              </Button>
            </Col>
            <Col md={6}>
              <Button
                className='product-addtocart'
                onClick={buyNow}
              >
                Buy Now
              </Button>
            </Col>
          </Row>
        </Col>
        <Col md={8} className='column-scroll pp-4 ms-5'>
        <h1>
                        <strong>
                            {productData.brand}{" "}{productData.name}{" "}
                            &nbsp;<Button
                                className='product-share mb-1'
                                onClick={handleShare}
                            >
                                <IoIosShareAlt className='mb-1' size={22}></IoIosShareAlt>
                            </Button>
                        </strong>
                    </h1>
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

export default LaptopDetails
