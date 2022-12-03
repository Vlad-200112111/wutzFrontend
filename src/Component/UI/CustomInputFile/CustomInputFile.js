import React, {useState} from 'react';
import "./CustomInputFile.css"


function CustomInputFile({name}) {
    const [fileName, setFileName] = useState()

    const handleChange = (event) => {
        setFileName(event.target.files[0].name)
    }

    // encType="multipart/form-data"
    return (
        <label className="input-file">
            <span className="input-file-text">{fileName}</span>
            <input onChange={handleChange} type="file" name={name}/>
            <span className="input-file-btn">Выберите файл</span>
        </label>
    );
}

export default CustomInputFile;