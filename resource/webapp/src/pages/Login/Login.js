import { React, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import Logo from 'images/trello-logo.png'
import { ACCESS_TOKEN, LOGOUT, USER_DATA } from 'ultil/constants'
import APIService from 'api/ApiService'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.scss'

export default function Login() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [formError, setFormError] = useState({})

    useEffect(() => {
        document.title = 'Đăng Nhập Tài Khoản | Trello'
    }, [])
    const logout = () => {
        dispatch({ type: LOGOUT })
        navigate('/login')
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem(ACCESS_TOKEN))
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
    }, [location])

    const initialValues = { username: '', password: '' }

    const validation = yup.object().shape({
        username: yup
            .string()
            .email('Vui lòng nhập đúng định dạng email')
            .required('Địa Chỉ Email không được để trống'),
        password: yup.string().min(5).required('Mật Khẩu không được để trống'),
    })

    const onSubmit = async (values) => {
        APIService.login(values)
            .then((result) => {
                const { status, data } = result
                if (status === 200) {
                    APIService.getAccountByUsername(values.username).then(
                        (result) => {
                            console.log(result)
                            localStorage.setItem(
                                USER_DATA,
                                JSON.stringify(result.data.data)
                            )
                            navigate(`/user/${result.data.data.id}/boards`)
                            window.location.reload()
                        }
                    )
                    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(data))
                }
            })
            .catch((err) => {
                const error = {}
                error.loginError = 'Địa Chỉ Email hoặc Mật Khẩu không chính xác'
                setFormError(error)
            })
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validation,
            onSubmit,
        })

    return (
        <div className="login-page">
            <Form.Group className="login-logo">
                <img src={Logo} alt="" style={{ width: '70px' }} />
                <span>Trello</span>
            </Form.Group>
            <div className="login-box">
                <Card>
                    <Card.Body className="login-card-body">
                        <p className="login-box-msg"></p>

                        <Form method="post" onSubmit={handleSubmit}>
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="email"
                                    name="username"
                                    placeholder="Địa Chỉ Email"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.username && touched.username
                                            ? 'input-error'
                                            : ''
                                    }
                                />
                                <div className="input-group-append">
                                    <div
                                        className={
                                            errors.username && touched.username
                                                ? 'input-group-text input-error'
                                                : 'input-group-text'
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>
                            {errors.username && touched.username && (
                                <p className="text-danger">{errors.username}</p>
                            )}
                            <InputGroup className="input-group mb-3">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Mật Khẩu"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password
                                            ? 'input-error'
                                            : ''
                                    }
                                />
                                <div className="input-group-append">
                                    <div
                                        className={
                                            errors.password && touched.password
                                                ? 'input-group-text input-error'
                                                : 'input-group-text'
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faLock}
                                        ></FontAwesomeIcon>
                                    </div>
                                </div>
                            </InputGroup>
                            {errors.password && touched.password && (
                                <p className="text-danger">{errors.password}</p>
                            )}
                            {formError.email && (
                                <p className="text-danger">{formError.email}</p>
                            )}
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
                                        type="submit"
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
