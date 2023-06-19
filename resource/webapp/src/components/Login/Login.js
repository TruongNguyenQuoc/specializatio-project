import { React, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.scss'

import { Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Logo from '../../images/trello-logo.png'
import APIService from 'api/ApiService'

const initialValues = { username: '', password: '' }

const Login = () => {
    const [form, setForm] = useState(initialValues)
    const [formError, setFormError] = useState({})
    const [login, setLogin] = useState(false)

    const onchangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // if (login) {
    //     return <Navigate to="/" />
    // }

    const handleLogin = (e) => {
        e.preventDefault()
        if (JSON.stringify(validate(form)) !== JSON.stringify({})) {
            setFormError(validate(form))
            return
        }
        APIService.login(form)
            .then((result) => {
                const { status, data } = result
                if (status === 200) {
                    localStorage.setItem('userData', JSON.stringify(data))
                    setLogin(true)
                }
            })
            .catch((err) => {
                const errors = {}
                errors.loginError =
                    'Tên Đăng Nhập hoặc Mật Khẩu không chính xác'
                setFormError(errors)
            })
    }

    const validate = (values) => {
        const errors = {}
        const regexEmail =
            /^([_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z]{1,6}))?$/

        if (!values.username) {
            errors.username = 'Tên Đăng Nhập không được để trống!'
        } else if (!regexEmail.test(values.username)) {
            errors.username = 'Tên Đăng Nhập không đúng định dạng email!'
        }
        if (!values.password) {
            errors.password = 'Mật Khẩu không được để trống!'
        }
        return errors
    }

    return (
        <div className="login-page">
            <Form.Group className="login-logo">
                <img src={Logo} alt="" style={{ width: '70px' }} />
                <span>Trello</span>
            </Form.Group>
            <div className="login-box">
                <Card>
                    <Card.Body className="login-card-body">
                        <p className="login-box-msg">Đăng Nhập</p>

                        <Form method="post" onSubmit={handleLogin}>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="email"
                                    name="username"
                                    placeholder="Tên Đăng Nhập"
                                    onChange={onchangeForm}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>
                            <p className="text-danger">{formError.username}</p>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Mật Khẩu"
                                    onChange={onchangeForm}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <FontAwesomeIcon
                                            icon={faLock}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>{' '}
                            <p className="text-danger">
                                {formError.loginError}
                            </p>
                            <p className="text-danger">{formError.password}</p>
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
                                        onClick={handleLogin}
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

export default Login
