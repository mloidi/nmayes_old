import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import Icon from './Icon';
import { Button } from '../../css/Common.Style';

const DropzoneSection = styled.section`
  border: 0.1rem dashed rgb(161, 207, 90);
  margin-top: 1rem;
`;
const DropzoneInput = styled.input``;

const DropzoneText = styled.div`
  color: gray;
  padding: 2rem;
  text-align: center;
`;

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const blobToFile = (theBlob, fileName) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};

const FileDropzone = props => {
  const [files, setFiles] = useState([]);
  // let blobA = [];
  console.log(props.fileURL);
  fetch(props.fileURL).then(async res => {
    const blob = await res.blob();
    const blobA = [blobToFile(blob, props.fileURL)];
    if (files.length === 0) {
      setFiles(blobA);
    } else {
      console.log('not');
    }
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setFiles(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
        acceptedFiles.map(file => {
          props.uploadFile(file);
          return true;
        });
      } else {
        console.log('no files');
      }
    }
  });

  const thumbs = files.map(file => {
    console.log(file);

    return (
      <div key={file}>
        <div>
          <Image src={file.preview} alt={file.name} />
        </div>
      </div>
    );
  });

  useEffect(
    () => () => {
      files.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    },
    [files]
  );

  return (
    <React.Fragment>
      <aside>{thumbs}</aside>
      {files.length === 0 ? (
        <DropzoneSection>
          <div {...getRootProps({ className: 'dropzone' })}>
            <DropzoneInput {...getInputProps()} />
            <DropzoneText>Drag 'n' drop cover image</DropzoneText>
          </div>
        </DropzoneSection>
      ) : (
        <div>
          <Button onClick={() => setFiles([])} fontSize="1.5rem">
            <Icon icon="faTimes" />
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default FileDropzone;
