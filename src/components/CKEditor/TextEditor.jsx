import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      '|',
      'imageUpload',
      'insertImage',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'CKBox',
      'indent',
      'outdent'
    ]
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  language: 'en'
};


const TextEditor = ({ setAboutUsDate }) => {


  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data="<h1>Chia sẻ câu chuyện của bạn tại đây!</h1>"
        config={editorConfig}
        onReady={editor => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              "20rem",
              editor.editing.view.document.getRoot()
            );

          })
          setAboutUsDate(editor.getData());
        }}
        onChange={(event, editor) => {
          // console.log(editor.getData());
          setAboutUsDate(editor.getData());
        }}
      />
    </>
  )
}

export default TextEditor