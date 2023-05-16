import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Logo from "../../img/trello-logo.png"

export default function Login() {
    return (
        <div className="login-page">
            <Form.Group className="login-logo">
                <img src={Logo} alt="" style={{ width: "70px" }} />
                <span>Trello</span>
            </Form.Group>
            <div className="login-box">
                <Card>
                    <Card.Body className="login-card-body">
                        <p className="login-box-msg">Đăng Nhập</p>
                        <Form method="post">
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="input"
                                    placeholder="name@example.com"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>
                            <Form.Group
                                as={Row}
                                className="card-body-bottom mb-3"
                            >
                                <Col md={7}>
                                    <a href="forgot-password.html">
                                        Quên mật khẩu
                                    </a>
                                </Col>
                                <Col md={5}>
                                    <Button
                                        variant="primary"
                                        className="btn-block"
                                    >
                                        Đăng Nhập
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="card-body-bottom mb-3"
                            >
                                <Col md={7}>
                                    <a
                                        href="register.html"
                                        className="text-center"
                                    >
                                        Đăng ký
                                    </a>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
