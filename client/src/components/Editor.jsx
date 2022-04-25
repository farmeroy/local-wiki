import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import wikiLinkPlugin from 'remark-wiki-link';

const Editor = () => {
  const location = useLocation();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [changeText, setChangeText] = useState("");
  const [pageID, setPageID] = useState(null)

  const saveChangesHandler = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000${location.pathname}`, {
        title: title,
        text: markdown,
        change: changeText.length ? changeText : 'No changelog entry'
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const pagePath = location.pathname.replace(/edit/, "");
    axios
      .get(`http://localhost:5000${pagePath}`)
      .then((resp) => {
        if (resp.data[0]) {
        const data = resp.data[0];
        setMarkdown((state) => data.text);
        setTitle(state => data.title)
        } else {
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const textChangeHandler = (event) => {
    setMarkdown(event.target.value)
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };


  return (
    <Form>
      <Container>
        <Row>
          <Col >
            <Form.Group as={Row} > 
              <Form.Label column sm={4} as="h2">Title</Form.Label>
              <Col sm={8}>
                <Form.Control type="text" onChange={titleChangeHandler} value={title}></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
              <Form.Label column sm={4} as="h3">Describe the Change</Form.Label>
              <Col sm={8}>
                <Form.Control type="text"></Form.Control>
              </Col>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Button variant="primary" type="submit" onClick={saveChangesHandler}>Save</Button>
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
            <ReactMarkdown
              remarkPlugins={[wikiLinkPlugin]}
            >{markdown}</ReactMarkdown>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default Editor;
