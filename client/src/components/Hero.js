import React from 'react';
import { Jumbotron, Container, } from 'react-bootstrap';

function Hero(props){
    const { color, title, subtitle, URL, height } = props

    return(
        <Jumbotron 
        style={{
            color:color || 'white',
            backgroundImage:'url('+URL+')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            height: height || '75vh'
        }} 
        >
            <Container>
                <h1> {title} </h1>
                <p> {subtitle} </p>
            </Container>
        </Jumbotron>
    )
}

export default Hero;