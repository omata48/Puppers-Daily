import React from 'react';
import { Jumbotron, Container, } from 'react-bootstrap';

function Hero(props){
    const { title, subtitle, URL } = props

    return(
        <Jumbotron 
        style={{
            color:'blue',
            backgroundImage:'url('+URL+')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            height:'50vh'
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