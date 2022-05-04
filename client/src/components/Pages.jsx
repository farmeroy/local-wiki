import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import wikiLinkPlugin from "remark-wiki-link";

const Pages = (props) => {
  const [pagesData, setPagesData] = useState({});
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:5000${location.pathname}`, {})
      .then((resp) => {
        if (resp.data[0]) {
          const data = resp.data[0];
          setPagesData((state) => data);
        } else {
          setPagesData({
            title: location.pathname,
            text: "this page does not exist",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>{pagesData.title}</h1>
        </Col>
        <Col>
          <Link to={`${location.pathname}/edit`}>Edit</Link>
        </Col>
      </Row>
      <Row>
        <ReactMarkdown
          remarkPlugins={[
            [
              wikiLinkPlugin,
              { hrefTemplate: (permalink) => `/page/${permalink}` },
            ],
          ]}
        >
          {pagesData.text}
        </ReactMarkdown>
      </Row>
    </Container>
  );
};

export default Pages;
