import React from 'react'
import { Link } from 'react-router-dom'
import {
    faEye,
    faChalkboard,
    faCodeBranch,
    faClipboard,
    faGlobe,
    faLightbulb,
    faStar,
    faBuilding,
    faBolt,
} from '@fortawesome/free-solid-svg-icons'

import NavBarCustom from './NavBarCustom'
import Logo from 'images/index-trello-logo.svg'
import './Header.scss'

const navbars = [
    {
        id: 0,
        title: 'Tính Năng',
        navDescription: 'Khám phá các tính năng giúp bạn thành công',
        navItem: [
            {
                id: 0,
                icon: faEye,
                title: 'Xem',
                description: 'Theo dõi dự án của bạn ở mọi nơi',
            },
            {
                id: 1,
                icon: faChalkboard,
                title: 'Mẫu',
                description:
                    'Cung cấp cho bạn một kế hoạch chi tiết để thành công với các mẫu dễ sử dụng.',
            },
            {
                id: 2,
                icon: faCodeBranch,
                title: 'Tích Hợp',
                description:
                    'Tìm hoặc khám phá những cách mới để hoàn thành công việc.',
            },
        ],
    },
    {
        id: 1,
        title: 'Giải Pháp',
        navDescription: 'Tạo một trang thiết kế cho tất cả các nhóm',
        navItem: [
            {
                id: 0,
                icon: faClipboard,
                title: 'Quản Lý Sản Phẩm',
                description:
                    'Sử dụng các Bảng trong Trello để đơn giản hóa các dự án, quy trình.',
            },
            {
                id: 1,
                icon: faGlobe,
                title: 'Nhóm Từ Xa',
                description:
                    'Giữ cho nhóm của bạn được kết nối và có động lực, bất kể họ ở đâu trên thế giới.',
            },
        ],
    },
    {
        id: 2,
        title: 'Kế Hoạch',
        navItem: [
            {
                id: 0,
                icon: faLightbulb,
                title: 'Tiêu chuẩn',
                description:
                    'Dành cho các nhóm cần quản lý nhiều công việc hơn và mở rộng quy mô.',
            },
            {
                id: 1,
                icon: faStar,
                title: 'Cao Cấp',
                description:
                    'Theo dõi nhiều dự án và trực quan hóa công việc theo nhiều cách khác nhau.',
            },
            {
                id: 2,
                icon: faBuilding,
                title: 'Công Ty',
                description:
                    'Tất cả mọi thứ mà công ty và các quản lý của bạn cần để quản lý dự án.',
            },
            {
                id: 3,
                icon: faBolt,
                title: 'Kế Hoạch Miến Phí',
                description:
                    'Dành cho các cá nhân hoặc nhóm nhỏ muốn sắp xếp công việc có tổ chức.',
            },
        ],
    },
]

function Header() {
    const listNavbar = navbars.map((navbar) => (
        <NavBarCustom
            key={navbar.id}
            title={navbar.title}
            navDescription={navbar.navDescription}
            navItem={navbar.navItem}
        ></NavBarCustom>
    ))

    return (
        <header className="header-area">
            <div className="inner-header">
                <div className="navbar">
                    <Link
                        to={'/'}
                        className="header-logo"
                        style={{ height: '60px' }}
                    >
                        <img src={Logo} alt="logo" />
                    </Link>
                    <div className="tab-group">{listNavbar}</div>
                    <div className="button-group">
                        <Link className="button-item" to={'/login'}>
                            Đăng Nhập
                        </Link>
                        <Link
                            className="button-item button-register"
                            to={'/register'}
                        >
                            Đăng Ký Tài Khoản
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
