import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import "./Register.scss"

import { Card, Col, Form, InputGroup, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Logo from "../../img/trello-logo.png"

export default function Register() {
    return (
        <div className="register-page">
            <Form.Group className="register-logo">
                <img src={Logo} alt="" style={{ width: "70px" }} />
                <span>Trello</span>
            </Form.Group>
            <div className="register-box">
                <Card>
                    <Card.Body className="register-card-body">
                        <p className="register-box-msg">Đăng Ký</p>
                        <Form method="post">
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="input"
                                    placeholder="Họ & Tên"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Địa chỉ Email"
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
                                    placeholder="Mật khẩu"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
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
                                    <a href="forgot-password.html">Đăng Nhập</a>
                                </Col>
                                <Col md={5}>
                                    <Button
                                        variant="primary"
                                        className="btn-block"
                                    >
                                        Đăng Ký
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
