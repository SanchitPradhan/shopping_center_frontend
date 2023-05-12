import { Card, Col, Container, Row, Spinner, Form, FloatingLabel } from 'react-bootstrap';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Books = () => {

    const [book, setBook] = useState([]);
    const [bookGenre, setBookGenre] = useState([]);
    const [bookAuthor, setBookAuthor] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const [books, setBooks] = useState({
        author: "",
        genre: ""
    })

    useEffect(() => {

        bookData();

    }, [])

    useEffect(() => {

        bookByAuthorAndGenre();
        genreData();
        authorData();

    }, [books])

    const bookData = async () => {

        setLoader(true);
        await fetch("/v1/books/getallbooks")
            .then((response) => response.json())
            .then((data) => {
                setBook(data.data)
                setLoader(false)
                console.log(data)
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const genreData = async () => {

        setLoader(true)
        await fetch("/v1/books/getallgenres",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    author: books.author,
                })
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setBookGenre(data.data)
                setLoader(false)
                console.log(data)
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const authorData = async () => {

        setLoader(true)
        await fetch("/v1/books/getallauthors",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    genre: books.genre
                })
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setBookAuthor(data.data)
                setLoader(false)
                console.log(data)
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const bookByAuthorAndGenre = async () => {

        setLoader(true)
        await fetch("/v1/books/getbookswithauthorandgenre",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    author: books.author,
                    genre: books.genre
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("author book", data.data)
                if (data.data.length > 0) {
                    setBook(data.data);
                    console.log("author--->", books.author)
                    setLoader(false)
                }
            }).catch((error) => {
                console.log(error);
                setLoader(false);
            })

    }

    const handleAuthorsAndGenres = (e) => {

        setBooks({ ...books, [e.target.name]: e.target.value });

    }

    let numFormat = Intl.NumberFormat('en-IN');

    return (

        <div>
            <Container>
                <Row className='d-flex justify-content-end'>
                    <Col md={3}>
                        <FloatingLabel label="Genres" className='mb-4'>
                            <Form.Select name="genre" onChange={(e) => { handleAuthorsAndGenres(e) }}>
                                Genres
                                <option value="">All</option>
                                {
                                    bookGenre.map((row) => {
                                        return (
                                            <option value={row}>{row}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md={3}>
                        <FloatingLabel label="Authors" className='mb-4'>
                            <Form.Select name="author" onChange={(e) => { handleAuthorsAndGenres(e) }}>
                                Authors
                                <option value="">All</option>
                                {
                                    bookAuthor.map((row) => {
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
                        book !== undefined && book !== null ? book.sort((a, b) => a.genre.localeCompare(b.genre))
                            .map((row) => {
                                return (
                                    <Col md={3}>
                                        <Card className='card-style-book'>
                                            <img
                                                src={row.image}
                                                alt={"Book"}
                                                className="card-img-top card-image-book p-2"
                                                style={{ width: "100%", height: "400px" }}
                                                onClick={() => navigate(`/User/BookDetails/${row._id}`, { state: row })}
                                            />
                                            <Card.Body>
                                                <h5>{row.author}{"'s"} {row.name}</h5>
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

export default Books;