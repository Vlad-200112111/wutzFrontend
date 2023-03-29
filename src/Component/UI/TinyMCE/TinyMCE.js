import React, {useRef} from 'react';
import {Editor} from "@tinymce/tinymce-react";
import "../CustomButton/Button.css"
import {Box, Button} from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";

function TinyMce({showButtonForForm, titleButton, setHtml, html = ""}) {
    const editorRef = useRef(null);


    const log = () => {
        if (editorRef.current) {
            setHtml(editorRef.current.getContent());
        }
    };


    return (
        <>
            <Editor
                required
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={html}
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
            <Box style={{margin: 20, float: "right"}}>
                {
                    showButtonForForm &&
                    <CustomButton
                        type="submit"
                        onClick={log}
                        title={titleButton}
                    />
                }
            </Box>

        </>
    );
}

export default TinyMce;