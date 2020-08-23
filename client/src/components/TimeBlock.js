import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

function TimeBlock(props) {
    const {hour} = props
    return (<Card.Body>
            <Row className='text-align-center'>
            <Col sm={1} > {hour} </Col>
            <Col sm={9} >Filler</Col>
            <Col sm={1} as='button' className='btn btn-primary'>
            B
            </Col>
            </Row>
        </Card.Body>
    )
}

export default TimeBlock;