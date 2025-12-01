import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-left: 250px;
  padding: 2rem;
  min-height: calc(100vh - 70px);
  background-color: #f9fafb;
  width: calc(100% - 250px);
`;

const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageItem = styled.div`
  padding: 1.5rem;
  background-color: ${props => props.$unread ? '#eff6ff' : '#ffffff'};
  border: 1px solid ${props => props.$unread ? '#2563eb' : '#e5e7eb'};
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const MessageSender = styled.span`
  font-weight: 600;
  color: #111827;
  font-size: 1rem;
`;

const MessageDate = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const MessageSubject = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const MessageContent = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
`;

const Message = () => {
  const messages = [
    {
      id: 1,
      sender: '김철수',
      subject: '차량 대여 문의',
      content: '차량 대여 가능한 날짜를 확인하고 싶습니다.',
      date: '2024-01-15 10:30',
      read: false,
    },
    {
      id: 2,
      sender: '이영희',
      subject: '충전소 이용 문의',
      content: '충전소 운영 시간을 알려주세요.',
      date: '2024-01-14 15:20',
      read: true,
    },
    {
      id: 3,
      sender: '박민수',
      subject: '예약 취소 요청',
      content: '예약을 취소하고 싶습니다.',
      date: '2024-01-13 09:15',
      read: false,
    },
  ];

  return (
    <Container>
      <PageTitle>메시지</PageTitle>
      
      <MessageList>
        {messages.map((message) => (
          <MessageItem key={message.id} $unread={!message.read}>
            <MessageHeader>
              <MessageSender>{message.sender}</MessageSender>
              <MessageDate>{message.date}</MessageDate>
            </MessageHeader>
            <MessageSubject>{message.subject}</MessageSubject>
            <MessageContent>{message.content}</MessageContent>
          </MessageItem>
        ))}
      </MessageList>
    </Container>
  );
};

export default Message;
