import styled from 'styled-components';

export const FormWrapper = styled.div`
    max-width: 500px;
    margin: 50px auto;
    padding: 40px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
`;

export const Subtitle = styled.p`
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-bottom: 40px;
`;

export const InfoGroup = styled.div`
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e0e0e0;
`;

export const Label = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
`;

export const Input = styled.p`
    font-size: 16px;
    color: #555;
    margin: 0;
    padding: 8px 0;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 32px;
`;

export const UpdateButton = styled.button`
    flex: 1;
    padding: 14px;
    background-color: #93c5fd;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3e90eeff;
    }
`;

export const CancelButton = styled.button`
    flex: 1;
    padding: 14px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #c82333;
    }
`;

export const DeleteButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 8px;

    &:hover {
        background-color: #c82333;
    }
`;

export const FullWidthButton = styled.button`
    width: 100%;
    padding: 14px;
    background-color: ${props => props.$primary ? "#93c5fd" : props.disabled ? "#bbb" : "#93c5fd"};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.$primary ? "#60a5fa" : props.disabled ? "#bbb" : "#60a5fa"};
    }
`;
export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    min-width: 400px;
    max-width: 90%;
`;

export const ModalTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
`;

export const ModalInput = styled.input`
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 20px;

    &:focus {
        outline: none;
        border-color: #333;
    }
`;

export const ModalButtonGroup = styled.div`
    display: flex;
    gap: 12px;
`;

export const ModalButton = styled.button`
    flex: 1;
    padding: 12px;
    background-color: #93c5fd;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #60a5fa;
    }
`;

export const ModalCancelButton = styled.button`
    flex: 1;
    padding: 12px;
    background-color: #999;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #777;
    }
`;

