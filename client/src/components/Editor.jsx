import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import {useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react';

const Editor = () => {

  useEffect(() => {
    axios
    .get()
  })

  return (
    <>
    <ReactMarkdown>
      # This works
    </ReactMarkdown>
  </>
  )
}

export default Editor;
