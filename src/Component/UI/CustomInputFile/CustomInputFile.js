import React from 'react';

function CustomInputFile(props) {
    return (
        <form method="post" encType="multipart/form-data">
            <label className="input-file">
                <span className="input-file-text"></span>
                <input type="file" name="file"/>
                <span className="input-file-btn">Выберите файл</span>
            </label>
        </form>
    );
}

export default CustomInputFile;