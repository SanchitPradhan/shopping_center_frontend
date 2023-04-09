import { Card, Col, Container, Row, Spinner, Form, FloatingLabel } from 'react-bootstrap';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Mobiles = () => {

    const [mobile, setMobile] = useState([]);
    const [mobileBrand, setMobileBrand] = useState("All");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

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

    function handleMobileBrand(e) {
        setMobileBrand(e.target.value);
    }

    useEffect(() => {

        mobileData();

    }, [])

    let sortMobile = mobile.sort((a, b) => a.brand.localeCompare(b.brand));

    let numFormat = Intl.NumberFormat('en-IN');

    return (

        <div>
            <Container>
                <Row className='d-flex justify-content-end'>
                    {/* <Col md={1}>
                        <select
                            className='select-mobile m-1 mb-3 p-1 text-center'
                            placeholder='Select Brand'
                            name={<strong>Brand</strong>}
                            value={mobileBrand}
                            onChange={handleMobileBrand}
                        >
                            <option selected value={"All"}>All</option>
                            <option value={"Apple"}><b>Apple</b></option>
                            <option value={"Google"}>Google</option>
                            <option value={"OnePlus"}>OnePlus</option>
                            <option value={"Samsung"}>Samsung</option>
                        </select>
                    </Col> */}
                    <Col md={3}>
                        <FloatingLabel label="Brand" className='mb-4'>
                            <Form.Select value={mobileBrand} onChange={handleMobileBrand}>
                                <option selected value={"All"}>All Brands</option>
                                <option value={"Apple"}>Apple</option>
                                <option value={"Google"}>Google</option>
                                <option value={"OnePlus"}>OnePlus</option>
                                <option value={"Samsung"}>Samsung</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>

                </Row>
                {loader ? <center><Spinner /></center> : <Row className='justify-content-center d-flex gy-4'>
                    {
                        sortMobile !== undefined && sortMobile.length > 0 ? mobileBrand !== "All" ? sortMobile.filter((data) => {
                            return data.brand === mobileBrand
                        })
                            .map((row) => {
                                return (
                                    <Col md={3}>
                                        <Card
                                            className='card-style'
                                        >
                                            <img
                                                src={row.images[0]}
                                                alt={"Mobile"}
                                                className="card-img-top p-2"
                                                style={{ width: "100%", height: "400px" }}
                                                onClick={() => navigate(`/User/ProductDetails/${row._id}`, { state: row })}
                                            />
                                            <Card.Body>
                                                <h5><strong>{row.brand}{" "}{row.name}</strong></h5>
                                                <h3>
                                                    <strong style={{ color: 'green' }}>  ₹ {numFormat.format(row.discounted_price.toFixed(0))}</strong>
                                                    <strong style={{ color: 'orange' }}>{" -("}{row.discount}{")"}%</strong>
                                                </h3>
                                                <h5>
                                                    M.R.P. :{" "}
                                                    <strong style={{ color: 'red', textDecoration: 'line-through' }}>₹ {numFormat.format(row.price)}</strong>
                                                </h5>
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                )
                            }) : sortMobile.map((row) => {
                                return (
                                    <Col md={3}>
                                        <Card className='card-style'
                                        >
                                            <img
                                                src={row.images[0]}
                                                alt={"Mobile"}
                                                className="card-img-top p-2"
                                                style={{ width: "100%", height: "400px" }}
                                                onClick={() => navigate(`/User/ProductDetails/${row._id}`, { state: row })}
                                            />
                                            <Card.Body>
                                                <h5><strong>{row.brand}{" "}{row.name}</strong></h5>
                                                <h3>
                                                    <strong style={{ color: 'green' }}>  ₹ {numFormat.format(row.discounted_price.toFixed(0))}</strong>
                                                    <strong style={{ color: 'orange' }}>{" -("}{row.discount}{")"}%</strong>
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