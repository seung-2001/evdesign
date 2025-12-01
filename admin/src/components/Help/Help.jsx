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

const HelpContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HelpSection = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FaqItem = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const FaqQuestion = styled.div`
  font-size: 1rem;
  color: #111827;
  margin-bottom: 0.75rem;
`;

const FaqAnswer = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0.5rem;
`;

const ContactItem = styled.div`
  font-size: 0.875rem;
  color: #374151;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 6px;

  strong {
    color: #111827;
    margin-right: 0.5rem;
  }
`;

const Help = () => {
  const faqs = [
    {
      id: 1,
      question: '차량 예약은 어떻게 하나요?',
      answer: '사용자가 차량 예약신청을 하면 관리자 페이지에서 승인/반려 처리를 할 수 있습니다.',
    },
    {
      id: 2,
      question: '충전소는 어떻게 등록하나요?',
      answer: '충전소 관리 메뉴에서 "충전소 등록" 버튼을 클릭하여 새로운 충전소를 등록할 수 있습니다.',
    },
    {
      id: 3,
      question: '결제 내역은 어디서 확인하나요?',
      answer: '결제 관리 메뉴에서 모든 결제 내역을 확인할 수 있습니다.',
    },
    {
      id: 4,
      question: '시스템 설정은 어떻게 변경하나요?',
      answer: '설정 메뉴에서 다양한 시스템 설정을 변경할 수 있습니다.',
    },
  ];

  return (
    <Container>
      <PageTitle>도움말</PageTitle>
      
      <HelpContent>
        <HelpSection>
          <SectionTitle>자주 묻는 질문</SectionTitle>
          <FaqList>
            {faqs.map((faq) => (
              <FaqItem key={faq.id}>
                <FaqQuestion>
                  <strong>Q. {faq.question}</strong>
                </FaqQuestion>
                <FaqAnswer>A. {faq.answer}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqList>
        </HelpSection>

        <HelpSection>
          <SectionTitle>문의하기</SectionTitle>
          <ContactInfo>
            <ContactText>관리자 페이지 사용 중 문제가 발생하거나 도움이 필요하신 경우 아래로 연락해주세요.</ContactText>
            <ContactItem>
              <strong>이메일:</strong> support@evision.com
            </ContactItem>
            <ContactItem>
              <strong>전화:</strong> 02-1234-5678
            </ContactItem>
          </ContactInfo>
        </HelpSection>
      </HelpContent>
    </Container>
  );
};

export default Help;
