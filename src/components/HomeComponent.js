import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import Articles from './Articles'
import { Container } from 'react-bootstrap';

const HomeComponent = () => {
  return (  
    <Container>
        <h1>HOME PAGE</h1>
        <Articles />
    </Container>
      
  )
};

export default HomeComponent;
