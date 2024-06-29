import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const TextEditor = ({ aboutUsData, setAboutUsData }) => {

  const handleChange = (content, delta, source, editor) => {
    setAboutUsData(editor.getHTML()); // can also use editor.getText() or editor.getContents()
  };

  return (
    <div>
      <ReactQuill
        value={aboutUsData}
        onChange={handleChange}
        modules={modules}
        placeholder='Hãy chia sẻ câu chuyện khởi nghiệp của bạn với mọi người nhé!'
        formats={formats}
        style={{ height: '20rem' }}
      />
      {/* <div dangerouslySetInnerHTML={{ __html: value }}></div> */}
    </div>
  );
};

// Optional: Define the modules and formats you want to use
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

export default TextEditor;
