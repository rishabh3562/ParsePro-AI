import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileAccepted }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => onFileAccepted(acceptedFiles),
        accept: '.pdf, .xlsx, .xls, .csv, .png, .jpg, .jpeg',
    });

    return (
        <div {...getRootProps()} className="border-dashed border-2 p-4 text-center">
            <input {...getInputProps()} />
            <p>Drag and drop files here, or click to select files</p>
        </div>
    );
};

export default FileUpload;
