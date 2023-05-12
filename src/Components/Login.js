import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, FloatingLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import * as Icon from 'react-bootstrap-icons';

import Logo from '../Images/SuperShoppy.svg';
import { TextField } from '@mui/material';


const Login = () => {

    const mobileErr = () => toast.error("Please enter valid mobile No");
    const PassError = () => toast.error("Please enter valid password");
    const NoUserFound = () => toast.warning("Invalid credentials, No user found");
    const ApiError = () => toast.error("Something went wrong, Try again");

    const navigate = useNavigate();

    const [mobile, setMobile] = useState('');
    const [pass, setPass] = useState('');

    const [loader, setLoader] = useState(false);
    const [showPassword, setshowPassword] = useState(false);

    // useEffect( () => {

    //   let details = JSON.parse(sessionStorage.getItem("User"));
    //   console.log("User",details)
    //   if(details?.userType === 'user'){
    //     navigate("/user/book-your-seat");
    //   }else if(details?.userType === "driver"){
    //     navigate("/driver/scanner");
    //   }
    // },[] )

    console.log("Mobile==>", mobile);
    console.log("Pass==>", pass);

    const validate = () => {
        let FormValid = true;

        if (!mobile) {
            FormValid = false;
            mobileErr();
        }
        else if (!pass) {
            FormValid = false;
            PassError()
        }
        return FormValid;
    }

    // console.log("first", process.env.REACT_APP_BASE_URL + '/user/login');

    const SendAdmin = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (validate()) {

            await fetch('/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contactNo: mobile,
                    password: pass,
                })
            }).then(res => res.json()).then(response => {
                console.log("API", response);
                if (response.errors === 'No user found') {
                    NoUserFound();
                    setLoader(false);
                }
                else if (response.errors === "Wrong password") {
                    PassError();
                    setLoader(false);
                }
                else if (response.usertype_keyname[0] === "admin") {
                    sessionStorage.setItem("User", JSON.stringify(response));
                    setLoader(false);
                    navigate('/dashboard');
                }
                else if (response.usertype_keyname[0] === "supervisor") {
                    sessionStorage.setItem("User", JSON.stringify(response));
                    setLoader(false);
                    navigate('/dashboard');
                }
                else if (response.usertype_keyname[0] === "zonalofficer") {
                    sessionStorage.setItem("User", JSON.stringify(response));
                    setLoader(false);
                    navigate('/dashboard');
                }
            }).catch((error) => {
                console.error('Error:', error);
                ApiError();
                setLoader(false);
            });
        } else {
            setLoader(false);
        }
    }

    return (
        <>
            <ToastContainer />

            <div className='loginNew'>
                <Container fluid className='h-100'>
                    <Row className='h-100'>
                        <Col md={6} className='text-center text-white align-items-center justify-content-center left d-none d-md-flex'>
                        </Col>
                        <Col md={6} className='d-flex text-center align-items-center justify-content-center right px-2 px-md-5'>
                            <Card className="card p-3">
                                <h4 className='mb-1 noselect mt-2'><Icon.BoxArrowInRight className="me-2" />Log in</h4>

                                <Form className="px-4 justify-content-center">
                                    <br />
                                    <TextField id="standard-basic" label="Mobile" variant="standard" style={{ width: "100%" }} />
                                    <br />
                                    <br />
                                    <TextField id="standard-basic" label="Password" variant="standard" style={{ width: "100%" }} />
                                    <br />
                                    <br />
                                    <br />
                                    <Button className="btn-login" type="submit" onClick={(e) => SendAdmin(e)} data-aos="fade-up" data-aos-delay="300" >{loader ? <Spinner animation="border" variant="light" /> : <><Icon.BoxArrowRight className='me-2' />Login</>}</Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    )
}

export default Login;