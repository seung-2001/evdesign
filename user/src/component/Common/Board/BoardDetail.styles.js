import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 60px 20px 20px;
`;

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
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

export const ContentWrapper = styled.div`
  max-width: 780px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  padding: 50px 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const PostHeader = styled.div`
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 20px;
  margin-bottom: 30px;
`;

export const PostTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 15px 0;
  color: #1a1a1a;
`;

export const PostMeta = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #665;

    @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  min-height: 300px;
  margin-bottom: 40px;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
`;

export const PostImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  background-color: #f5f5f5;
  
  @media (max-width: 600px) {
    max-height: 300px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

export const TitleLabel = styled.label`
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  min-width: 50px;
`;

export const TitleValue = styled.input`
  flex: 1;
  padding: 12px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fafafa;
  color: #666;
  cursor: default;

  &:focus {
    outline: none;
  }
`;

export const ContentSection = styled.div`
  margin-bottom: 30px;
`;

export const ContentLabel = styled.label`
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 10px;
  text-align: center;
`;

export const ContentBox = styled.div`
  width: 100%;
  min-height: 250px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: white;
`;

export const ContentText = styled.p`
  font-size: 14px;
  color: #ccc;
  margin: 0;
  line-height: 1.6;
`;

export const CommentSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  align-items: flex-start;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 12px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    outline: none;
    border-color: #4285f4;
  }
`;

export const CommentButton = styled.button`
  padding: 12px 24px;
  background-color: #2b2b2b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #1a1a1a;
  }
`;

export const CommentListSection = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 30px;
`;

export const CommentListTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
`;

export const CommentListDesc = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;

    @media (max-width: 600px) {
    flex-wrap: wrap;
    
    button {
      flex: 1;
      min-width: calc(50% - 6px);
    }
  }
`;

export const BackButton = styled.button`
  padding: 12px 24px;
  background-color: #6b6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

export const EditButton = styled.button`
  padding: 12px 24px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3367d6;
  }
`;

export const DeleteButton = styled.button`
  padding: 12px 24px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c82333;
  }
`;

export const ReportButton = styled.button`
  padding: 12px 24px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f57c00;
  }
`;

export const WarningIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 2px solid #2b2b2b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #2b2b2b;
  font-weight: bold;
`;

export const ListButton = styled.button`
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

export const TopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 14px 24px;
  background-color: #2b2b2b;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 80px;

  &:hover {
    background-color: #1a1a1a;
  }
`;

export const TopIcon = styled.span`
  font-size: 12px;
`;

export const CommentSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #4CAF50;
`;