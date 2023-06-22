import { Link } from 'react-router-dom'

export default function FooterNav(props) {
    const { title, link, description } = props

    return (
        <li className="col-lg-3">
            <Link className="link-item" to={`${link}`}>
                <div className="link-title">
                    <p>{title}</p>
                </div>
                <div className="link-description">{description}</div>
            </Link>
        </li>
    )
}
