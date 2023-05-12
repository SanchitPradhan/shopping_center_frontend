import { Card, Col, Container, Row, Spinner, Form, FloatingLabel } from 'react-bootstrap';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Laptops = () => {

    const [laptop, setLaptop] = useState([]);
    const [laptopBrand, setLaptopBrand] = useState([]);
    const [brand, setBrand] = useState("All");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        laptopData();
        brandData();

    }, [])

    useEffect(() => {

        laptopWithBrand();

    }, [brand])

    const laptopData = async () => {

        setLoader(true)
        await fetch("/v1/laptops/getalllaptop")
            .then((response) => response.json())
            .then((data) => {
                console.log("brand------------------------->", brand)
                if (data.data.length > 0 && brand === "All") {
                    setLaptop(data.data);
                    setLoader(false)
                    console.log("laptopData", data.data.length)
                }
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const brandData = async () => {

        setLoader(true)
        await fetch("/v1/laptops/getallbrands")
            .then((response) => response.json())
            .then((data) => {
                setLaptopBrand(data.data);
                setLoader(false)
                console.log(data)
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const laptopWithBrand = async () => {

        setLoader(true)
        await fetch("/v1/laptops/getlaptopswithbrand",
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
                    setLaptop(data.data);
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

    console.log("lappy", laptop);

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
                                    laptopBrand.map((row) => {
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
                        laptop !== undefined && laptop !== null ? laptop.sort((a, b) => a.brand.localeCompare(b.brand))
                            .map((row) => {
                                return (
                                    <Col md={3}>
                                        <Card className='card-style-laptop'>
                                            <img
                                                src={row.image}
                                                alt={"Laptop"}
                                                className="card-img-top p-2"
                                                style={{ width: "100%", height: "300px" }}
                                                onClick={() => navigate(`/User/LaptopDetails/${row._id}`, { state: row })}
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
                </Row>
                }
            </Container>
        </div>
    )

}

export default Laptops;