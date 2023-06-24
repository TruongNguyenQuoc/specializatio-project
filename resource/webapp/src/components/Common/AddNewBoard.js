import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'

function AddNewBoard(props) {
    const { onSaveBoard } = props
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const initialValues = { name: '' }

    const validation = yup.object().shape({
        name: yup.string().required('Tên Bảng không được để trống'),
    })

    const onSubmit = async (values) => {
        onSaveBoard(values)
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validation,
            onSubmit,
        })

    return (
        <>
            <Button className="btn-create-board" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </Button>

            <Modal show={show} className="create-board-modal">
                <div className="modal-form">
                    <button className="icon-close" onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <Form method="post" onSubmit={handleSubmit}>
                        <span className="modal-header-title">Tạo Bảng Mới</span>
                        <span className="modal-header-description">
                            Tăng năng suất của bạn bằng cách giúp mọi người truy
                            cập bảng ở một vị trí dễ dàng hơn.
                        </span>
                        <Form.Label>Tên Bảng</Form.Label>
                        <InputGroup className="mb-3 mt-2">
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Tên Bảng"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </InputGroup>
                        {errors.name && touched.name && (
                            <p className="text-danger">{errors.name}</p>
                        )}
                        <Form.Group className="card-body-bottom mb-3">
                            <Col>
                                <Button
                                    disabled={values.name.length === 0}
                                    className="btn-block btn-continue"
                                    type="submit"
                                >
                                    Tiếp Tục
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <div className="modal-background"></div>
            </Modal>
        </>
    )
}

export default AddNewBoard
