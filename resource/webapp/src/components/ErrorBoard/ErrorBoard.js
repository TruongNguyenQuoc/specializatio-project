import { Alert } from 'react-bootstrap'

export default function ErrorBoard() {
    return (
        <div className="pe-3 ps-3 mt-3">
            <Alert variant="danger" dismissible>
                <Alert.Heading>
                    <b>Board not found!</b>
                </Alert.Heading>
                <p>
                    This <b>Board</b> may be private. You may be able to view it
                    by logging in.
                </p>
            </Alert>
        </div>
    )
}
