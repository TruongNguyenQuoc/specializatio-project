import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'

import { ACTION_REMOVE_CLOSE, ACTION_REMOVE_CONFIRM } from 'ultil/constants'

export default function ConfirmRemoveColumn(props) {
    const { title, content, show, onAction } = props

    return (
        <Modal
            show={show}
            onHide={() => onAction(ACTION_REMOVE_CLOSE)}
            backdrop="static"
            keyboard={false}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className="h5">
                    <strong>{title}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => onAction(ACTION_REMOVE_CLOSE)}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => onAction(ACTION_REMOVE_CONFIRM)}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
