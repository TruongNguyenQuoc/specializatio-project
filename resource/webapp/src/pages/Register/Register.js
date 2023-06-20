import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import './Register.scss'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { Navigate } from 'react-router-dom'
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Logo from '../../images/trello-logo.png'

import APIService from 'api/ApiService'

export default function Register() {
    const [error, setError] = useState({})
    const [isSuccess, setIsSuccess] = useState(false)
    const initialValues = {
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
    }

    const validation = yup.object().shape({
        fullName: yup.string().required('Họ & Tên không được để trống'),
        username: yup
            .string()
            .email('Vui lòng nhập đúng định dạng email')
            .required('Địa Chỉ Email không được để trống'),
        password: yup.string().min(5).required('Mật Khẩu không được để trống'),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref('password'), null],
                'Mật Khẩu Xác Nhận không trùng khớp '
            )
            .required('Mật Khẩu Xác Nhận không được để trống'),
    })

    const onSubmit = async (values) => {
        APIService.register(values)
            .then((result) => {
                const { status, data } = result
                if (status === 200) {
                    localStorage.setItem('userData', JSON.stringify(data.data))
                    setIsSuccess(true)
                }
            })
            .catch((err) => {
                setError(err.response.data.messages)
            })
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validation,
            onSubmit,
        })

    // if (isSuccess) {
    //     return <Navigate to="/login" />
    // }

    console.log(localStorage.userData.fullName)

    return (
        <div className="register-page">
            <Form.Group className="register-logo">
                <img src={Logo} alt="" style={{ width: '70px' }} />
                <span>Trello</span>
            </Form.Group>
            {isSuccess && (
                <div className="register-card-body">
                    <p class="mb-1 text-center" style={{ lineHeight: '2rem' }}>
                        Chúc mừng
                        <b> {JSON.parse(localStorage.userData).fullName}</b>
                        đã đăng ký tài khoản thành công!
                        <br /> Vui lòng nhấn vào đường dẫn bên dưới để đăng
                        nhập.
                    </p>
                    <p class="mb-0 text-center">
                        <a href="/login" class="text-center">
                            Đăng nhập tại đây!
                        </a>
                    </p>
                </div>
            )}
            {!isSuccess && (
                <div className="register-box">
                    <Card>
                        <Card.Body className="register-card-body">
                            <p className="register-box-msg"></p>
                            {error.email && (
                                <p className="text-danger fw-bold text-center">
                                    {error.email}
                                </p>
                            )}
                            <Form method="post" onSubmit={handleSubmit}>
                                <InputGroup className="input-group mb-3">
                                    <Form.Control
                                        type="input"
                                        placeholder="Họ & Tên"
                                        name="fullName"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.fullName && touched.fullName
                                                ? 'input-error'
                                                : ''
                                        }
                                    />
                                    <div className="input-group-append">
                                        <div
                                            className={
                                                errors.fullName &&
                                                touched.fullName
                                                    ? 'input-group-text input-error'
                                                    : 'input-group-text'
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faUser}
                                            ></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </InputGroup>
                                {errors.fullName && touched.fullName && (
                                    <p className="text-danger">
                                        {errors.fullName}
                                    </p>
                                )}
                                <InputGroup className="input-group mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Địa Chỉ Email"
                                        name="username"
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
                                                errors.username &&
                                                touched.username
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
                                    <p className="text-danger">
                                        {errors.username}
                                    </p>
                                )}
                                <InputGroup className="input-group mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Mật Khẩu"
                                        name="password"
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
                                                errors.password &&
                                                touched.password
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
                                    <p className="text-danger">
                                        {errors.password}
                                    </p>
                                )}
                                <InputGroup className="input-group mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Mật Khẩu Xác Nhận"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                                ? 'input-error'
                                                : ''
                                        }
                                    />
                                    <div className="input-group-append">
                                        <div
                                            className={
                                                errors.confirmPassword &&
                                                touched.confirmPassword
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
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <p className="text-danger">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                <Form.Group
                                    as={Row}
                                    className="card-body-bottom mb-3"
                                >
                                    <Col md={7}>
                                        <a href="forgot-password.html">
                                            Đăng Nhập
                                        </a>
                                    </Col>
                                    <Col md={5}>
                                        <Button
                                            variant="primary"
                                            className="btn-block"
                                            // onClick={handleSubmit}
                                            type="submit"
                                        >
                                            Đăng Ký
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    )
}
