import { Card, Col, Container, Row, Spinner, Form, FloatingLabel } from 'react-bootstrap';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Mobiles = () => {

    const [mobile, setMobile] = useState([]);
    const [mobileBrand, setMobileBrand] = useState([]);
    const [brand, setBrand] = useState("All");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        mobileData();
        brandData();

    }, [])

    useEffect(() => {

        mobileByBrand();

    }, [brand])

    const mobileData = async () => {

        setLoader(true)
        await fetch("/v1/mobiles/getallmobile")
            .then((response) => response.json())
            .then((data) => {
                setMobile(data.data)
                setLoader(false)
                console.log(data)
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const brandData = async () => {

        setLoader(true)
        await fetch("/v1/mobiles/getallbrands")
            .then((response) => response.json())
            .then((data) => {
                setMobileBrand(data.data)
                setLoader(false)
                console.log(data)
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const mobileByBrand = async () => {

        setLoader(true)
        await fetch("/v1/mobiles/getmobileswithbrand",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    brand: brand
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.data.length > 0 && brand !== "All") {
                    setMobile(data.data);
                    setLoader(false)
                    console.log("brand laptop", data.data)
                }
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const handleBrands = (e) => {

        console.log(e.target.value)
        setBrand(e.target.value);

    }

    let numFormat = Intl.NumberFormat('en-IN');

    return (

        <div>
            <Container>
                <Row className='d-flex justify-content-end'>
                    <Col md={3}>
                        <FloatingLabel label="Brands" className='mb-4'>
                            <Form.Select onChange={(e) => { handleBrands(e) }}>
                                Brands
                                <option value="">All</option>
                                {
                                    mobileBrand.map((row) => {
                                        return (
                                            <option value={row}>{row}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                </Row>
                {loader ? <center><Spinner /></center> : <Row className='justify-content-center d-flex gy-4'>
                    {
                        mobile !== undefined && mobile !== null ? mobile.sort((a, b) => a.brand.localeCompare(b.brand))
                            .map((row) => {
                                return (
                                    <Col md={3}>
                                        <Card className='card-style-mobile'>
                                            <img
                                                src={row.images[0]}
                                                alt={"Mobile"}
                                                className="card-img-top p-2"
                                                style={{ width: "100%", height: "400px" }}
                                                onClick={() => navigate(`/User/MobileDetails/${row._id}`, { state: row })}
                                            />
                                            <Card.Body>
                                                <h5>{row.brand} {row.name}</h5>
                                                <h3>
                                                    <strong style={{ color: 'green' }}>  ₹ {numFormat.format(row.discounted_price.toFixed(0))}</strong>
                                                    <strong style={{ color: "orange" }}>{" -("}{row.discount}{")"}%</strong>
                                                </h3>
                                                <h5>
                                                    M.R.P. :{" "}
                                                    <strong style={{ color: 'red', textDecoration: 'line-through' }}>₹ {numFormat.format(row.price)}</strong>
                                                </h5>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            }) : "No Data Found"
                    }
                </Row>}
            </Container>

        </div>
    )
}

export default Mobiles;