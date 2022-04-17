import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Button, Form, FormControl, Container } from "react-bootstrap";

const TopNav = () => {
  return (
      <Navbar bg='light' sticky="top">
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/pages/Main_Page"}>WikiWiki</Link>
          </Navbar.Brand>
          <Form >
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
  );
};

export default TopNav;
