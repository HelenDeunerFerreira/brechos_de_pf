import { React, Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import '../css/styles.css'

class Footer extends Component {
    render() {
        return (
            <Row style={{ width: '100%', paddingTop: 200, height: 100 }}>
                <Col>
                    <Card> Desenvolvedora: Helen Deuner Ferreira</Card>
                </Col>
                <Col>
                    <Card> Graduação: Ciência da Computação, 2º semestre - IMED</Card>
                </Col>
                <Col>
                    <Card> E-mail para contato: helendeunerferreira@gmail.com</Card>
                </Col>
            </Row>
        );
    }
}

export default Footer;
