import React, {useRef} from 'react';
import {Editor} from "@tinymce/tinymce-react";

function TinyMce({showButtonForForm, titleButton, setHtml}) {
    const editorRef = useRef(null);


    const log = () => {
        if (editorRef.current) {
            setHtml(editorRef.current.getContent());
        }
    };


    return (
        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={''}
                init={{
                    language: 'ru',
                    height: 500,
                    menubar: true,
                    image_title: true,
                    automatic_uploads: true,
                    plugins: 'advlist autolink lists link image charmap print preview anchor ' +
                        'searchreplace visualblocks code fullscreen insertdatetime media table ' +
                        'paste code help wordcount',
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help | table | link image',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            {
                showButtonForForm &&
                <button
                    type="submit"
                    onClick={log}>
                    {
                        titleButton
                    }
                </button>
            }
        </>
    );
}

export default TinyMce;