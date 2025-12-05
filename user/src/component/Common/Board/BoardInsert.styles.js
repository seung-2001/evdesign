import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 60px 20px 20px;
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 10px 0;
  color: #1a1a1a;
`;

export const Subtitle = styled.p`
  font-size: 20px;
  color: #666;
  margin: 0;
  font-weight: 400;
`;

export const FormWrapper = styled.div`
  max-width: 820px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  padding: 60px 80px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 10px;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 14px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

export const ImagePreviewSection = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 40px 0;
`;

export const ImagePreviewBox = styled.div`
  width: 130px;
  height: 130px;
  background-color: #d0d0d0;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0c0c0;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: #999;
  }

  &::before {
    width: 50px;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(-15px);
  }

  &::after {
    width: 2px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateY(-15px);
  }

  /* 이미지가 있을 때 + 버튼 숨기기 */
  &.has-image::before,
  &.has-image::after {
    display: none;
  }

  &.has-image:hover {
    background-color: #d0d0d0;
  }
`;

export const PreviewPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const PreviewText = styled.div`
  font-size: 13px;
  color: #555;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
  margin-top: 45px;
  z-index: 1;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 40px;
`;

export const CancelButton = styled.button`
  padding: 14px 20px;
  background-color: #6b6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 80px;

  &:hover {
    background-color: #555;
  }
`;

export const AttachButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background-color: #2b2b2b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a1a1a;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3367d6;
  }
`;