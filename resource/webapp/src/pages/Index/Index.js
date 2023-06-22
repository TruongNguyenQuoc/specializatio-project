import { React, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import ImageTrello from 'images/TrelloUICollage_4x.webp'
import WomenWhoCode from 'images/WomenWhoCode_logo.svg'
import Thoughtworks from 'images/thoughtworks.svg'
import PTClogo from 'images/ptc-logo.svg'
import './Index.scss'

function Index() {
    useEffect(() => {
        document.title = 'Quản lý dự án nhóm của bạn từ mọi nơi | Trello'
    }, [])

    const carousels = [
        {
            id: 0,
            blockquoteP: `[Trello is] great for simplifying complex processes. As a manager, 
            I can chunk [processes] down into bite-sized pieces for my team and then delegate that out, but still keep a bird's-eye view.`,
            captionAuth: 'Joey Rosenberg',
            captionCompany: 'Global Leadership Director at Women Who Code',
            captionLogo: WomenWhoCode,
            captionLink: 'https://blog.trello.com/women-who-code',
            factH3: '75% of organizations report that Trello delivers value to their business within 30 days.',
            factLink: 'https://www.techvalidate.com/tvid/1D4-3E6-170',
        },
        {
            id: 1,
            blockquoteP: `Whether someone is in the office, working from home, or working on-site with a client, everyone can share context and
            information through  Trello.`,
            captionAuth: 'Sumeet Moghe',
            captionCompany: 'Product Manager at ThoughtWorks',
            captionLogo: Thoughtworks,
            captionLink: 'https://www.atlassian.com/customers/thoughtworks',
            factH3: '81% of customers chose Trello for its ease of  use.',
            factLink: 'https://www.techvalidate.com/tvid/270-DFB-21A',
        },
        {
            id: 2,
            blockquoteP: `We used Trello to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep  cultural and language  differences.`,
            captionAuth: 'Jefferson Scomacao',
            captionCompany: 'Development Manager at IKEA/PTC',
            captionLogo: PTClogo,
            captionLink: 'https://www.atlassian.com/customers/ptc',
            factH3: '74% of customers say Trello has improved communication with their co-workers and teams.',
            factLink: 'https://www.techvalidate.com/tvid/CDB-6BC-D03',
        },
    ]

    const carouselItems = carousels.map((carouselItem) => (
        <Carousel.Item key={carouselItem.id}>
            <div className="wrapper">
                <div className="wrapper-social d-flex flex-lg-row justify-content-between">
                    <div className="figure col-lg-8">
                        <div className="blockquote">
                            <p
                                className="mt-0"
                                style={{
                                    fontSize: '1.5rem',
                                    lineHeight: '45px',
                                }}
                            >
                                {carouselItem.blockquoteP}
                            </p>
                        </div>
                        <div className="caption">
                            <p>{carouselItem.captionAuth}</p>
                            <p>{carouselItem.captionCompany}</p>
                            <div class="image-link d-flex flex-lg-row justify-content-between align-items-center">
                                <img
                                    src={carouselItem.captionLogo}
                                    alt="Logo công ty Women Who Code"
                                    className="mt-4"
                                />
                                <a
                                    href={carouselItem.captionLink}
                                    style={{
                                        color: '#0052cc',
                                    }}
                                >
                                    Read the story
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="fact d-flex flex-lg-column">
                        <h3>{carouselItem.factH3}</h3>
                        <div className="fact-link mt-auto pt-4">
                            <a
                                href={carouselItem.factLink}
                                style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                }}
                            >
                                Trello TechValidate Survey
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Carousel.Item>
    ))

    return (
        <div className="app-root">
            <Header></Header>
            <main>
                <section className="ui-section">
                    <Container>
                        <Row>
                            <Col className="col-lg-6 lg-text-left">
                                <div className="text-block">
                                    <div>
                                        <h1>
                                            Trello tập hợp tất cả nhiệm vụ,
                                            thành viên nhóm và công cụ của bạn
                                            lại với nhau
                                        </h1>
                                        <p>
                                            Duy trì mọi thứ ở cùng một nơi—dù
                                            cho nhóm của bạn không ở cùng nhau.
                                        </p>
                                    </div>
                                </div>
                                <div className="link-register">
                                    <Link to={'/register'}>
                                        Đăng ký - hoàn toàn miễn phí!
                                    </Link>
                                </div>
                            </Col>
                            <Col className="col-lg-6 ui-column">
                                <picture>
                                    <source
                                        type="image/webp"
                                        media="(min-width: 1200px)"
                                        srcSet={ImageTrello}
                                    />
                                    <source
                                        media="(min-width: 1200px)"
                                        srcSet={ImageTrello}
                                    ></source>
                                    <source
                                        type="image/webp"
                                        media="(min-width: 992px)"
                                        srcSet={ImageTrello}
                                    ></source>
                                    <source
                                        media="(min-width: 992px)"
                                        srcSet={ImageTrello}
                                    ></source>
                                    <source
                                        type="image/webp"
                                        media="(min-width: 768px)"
                                        srcSet={ImageTrello}
                                    ></source>
                                    <source
                                        media="(min-width: 768px)"
                                        srcSet={ImageTrello}
                                    ></source>
                                    <source
                                        type="image/webp"
                                        media="(min-width: 576px)"
                                        srcSet={ImageTrello}
                                    ></source>
                                    <source
                                        media="(min-width: 576px)"
                                        srcSet={ImageTrello}
                                    ></source>
                                    <img
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                        }}
                                        src={ImageTrello}
                                        alt="logo"
                                    />
                                </picture>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="mt-5 mb-5">
                    <Container>
                        <Row>
                            <Col className="col-lg-12">
                                <div className="gri-column">
                                    <Carousel interval={null}>
                                        {carouselItems}
                                    </Carousel>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Index
