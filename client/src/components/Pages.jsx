import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'

const Pages = (props) => {

  const [pagesData, setPagesData] = useState({});
  const location = useLocation();
  console.log(location.pathname)

  useEffect(() => {
    axios
      .get(`http://localhost:5000${location.pathname}`, {
      })
      .then((resp) => {
        const data = resp.data[0];
        setPagesData(state => data);
        console.log(data)
        console.log(pagesData)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  return (
    <>
      <h1>{pagesData.title}</h1>
      <ReactMarkdown>{pagesData.text}</ReactMarkdown>
  </> 
  )
}

export default Pages;
