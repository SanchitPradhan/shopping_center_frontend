import { Card, Col, Container, Row, Accordion, Spinner } from 'react-bootstrap';
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

    // function handleSingleProduct(e) {
    //     setMobileBrand(e.target.value);
    // }

    useEffect(() => {

        mobileData();

    }, [])

    let sortMobile = mobile.sort((a, b) => a.brand.localeCompare(b.brand));

    let numFormat = Intl.NumberFormat('en-IN');

    return (

        <div>
            <Container>
                <Row className='justify-content-end' style={{ marginRight: "0px" }}>
                    <Col md={1}>
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
                                                <Accordion className='accordion-style text-left' flush>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header><strong>Description</strong></Accordion.Header>
                                                        <Accordion.Body>
                                                            <strong>{row.description}</strong>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
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
                                                <Accordion className='accordion-style text-align-center' flush>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header><strong>Description</strong></Accordion.Header>
                                                        <Accordion.Body>
                                                            <strong>{row.description}</strong>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
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