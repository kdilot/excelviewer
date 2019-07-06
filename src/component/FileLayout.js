import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import readXlsxFile from 'read-excel-file';
import styles from './FileLayout.module.scss';

const FileLayout = (props) => {
  const {
    fileChange
  } = props
  const [title, setTitle] = useState('Drag & drop some files here, or click to select files')
  const onDrop = useCallback(acceptedFiles => {
    readXlsxFile(acceptedFiles[0], { getSheets: true }).then((sheets) => {
      const arr = []
      sheets.map((m, i) => {
        return (
          readXlsxFile(acceptedFiles[0], { sheet: m.name }).then((data) => {
            arr.push({ "name": m.name, data })
          })
        )
      })
      fileChange(arr)
    })
    setTitle(acceptedFiles[0]['name'])
  }, [fileChange])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div {...getRootProps()} className={styles.fileLayoutWrapper}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>{title}</p>
      }
    </div>
  );
};

export default FileLayout;