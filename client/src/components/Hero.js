import React from 'react';
import { Jumbotron, Container, } from 'react-bootstrap';

function Hero(props){
    const { color, title, URL, height } = props

    return(
        <Container fluid>
        <Jumbotron 
        style={{
            color:color || 'white',
            backgroundImage:'url('+URL+')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            height: height || '75vh',
            padding: "0"
        }} 
        >
                <h1 style= {{
                    fontSize: "52px",
                    position: "relative",
                    top: "0",
                    left: "0",
                    background: "rgba(0,0,0,0.5)",
                    color: "#f1f1f1",
                    width: "100%",
                    padding: "20px",
                    textAlign: "center"
                }}> 
                    {title} 
                </h1>
        </Jumbotron>
        </Container>
    )
}

export default Hero;