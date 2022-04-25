import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

const Editor = () => {
  const location = useLocation();
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const pagePath = location.pathname.replace(/edit/, "");
    console.log(pagePath);
    axios
      .get(`http://localhost:5000${pagePath}`)
      .then((resp) => {
        const data = resp.data[0];
        setMarkdown((state) => data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const textChangeHandler = (event) => {
    event.preventDefault();
    setMarkdown(event.target.value);
  };

  return (
    <Form>
      <Container>
        <Row>
          <Col >
            <Form.Group as={Row} controlID="title"> 
              <Form.Label column sm={4} as="h2">Title</Form.Label>
              <Col sm={8}>
                <Form.Control type="text"></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId='change'>
              <Form.Label column sm={4} as="h3">Describe the Change</Form.Label>
              <Col sm={8}>
                <Form.Control type="text"></Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="secondary">Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                as="textarea"
                id="markdown"
                name="markdown"
                rows="20"
                columns="200"
                value={markdown}
                onChange={textChangeHandler}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default Editor;
