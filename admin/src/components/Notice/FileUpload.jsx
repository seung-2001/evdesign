import {
    AddButton,
    DeleteButton,
    FileItem,
    FileList,
    FileName,
    FileSize,
    FileUploadContainer,
    HiddenInput
} from './FileUpload.styles';

const FileUpload = ({ files, setFiles, maxFiles = 15, maxSize = 50 }) => {
  const maxSizeBytes = maxSize * 1024 * 1024;

  const handleFileAdd = (e) => {
    const newFiles = Array.from(e.target.files);
    
    const oversizedFiles = newFiles.filter(file => file.size > maxSizeBytes);
    if (oversizedFiles.length > 0) {
      alert(`파일 하나당 ${maxSize}MB 이하만 업로드 가능합니다.`);
      return;
    }
    
    if (files.length + newFiles.length > maxFiles) {
      alert(`파일은 최대 ${maxFiles}개까지 첨부 가능합니다.`);
      return;
    }
    
    setFiles([...files, ...newFiles]);
    e.target.value = '';
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <FileUploadContainer>
      {files.length > 0 && (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              <FileName>
                {file.name}
                <FileSize> ({(file.size / 1024 / 1024).toFixed(2)}MB)</FileSize>
              </FileName>
              <DeleteButton
                type="button"
                onClick={() => handleFileRemove(index)}
              >
                삭제
              </DeleteButton>
            </FileItem>
          ))}
        </FileList>
      )}

      <HiddenInput
        id="fileUploadInput"
        type="file"
        multiple
        onChange={handleFileAdd}
        disabled={files.length >= maxFiles}
      />
      <AddButton
        type="button"
        onClick={() => document.getElementById('fileUploadInput').click()}
        disabled={files.length >= maxFiles}
      >
        + 파일 추가 ({files.length}/{maxFiles})
      </AddButton>
    </FileUploadContainer>
  );
};

export default FileUpload;