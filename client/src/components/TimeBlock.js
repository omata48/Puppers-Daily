import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function TimeBlock(props) {
    const { key, size, food, time} = props
    return (<Card.Body key={key} className='text-align center'>
            <Col xs={9}>Fed {size} of {food} at {time}</Col>
            <Col xs={2} as='button' className='btn btn-danger'>
            <FontAwesomeIcon icon={faTrash} />
            </Col>
        </Card.Body>
    )
}

export default TimeBlock;