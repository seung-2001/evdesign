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

const SettingsContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const SettingsItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const TextInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2563eb;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;

  input[type="checkbox"] {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    accent-color: #2563eb;
  }
`;

const ChangePasswordButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const SettingsActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #2563eb;
  color: #ffffff;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: #f3f4f6;
  color: #374151;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const Settings = () => {
  return (
    <Container>
      <PageTitle>설정</PageTitle>
      
      <SettingsContainer>
        <SettingsSection>
          <SectionTitle>일반 설정</SectionTitle>
          <SettingsItem>
            <Label>사이트 이름</Label>
            <TextInput type="text" defaultValue="Evision" />
          </SettingsItem>
          <SettingsItem>
            <Label>관리자 이메일</Label>
            <TextInput type="email" defaultValue="admin@evision.com" />
          </SettingsItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>알림 설정</SectionTitle>
          <SettingsItem>
            <CheckboxLabel>
              <input type="checkbox" defaultChecked />
              이메일 알림 받기
            </CheckboxLabel>
          </SettingsItem>
          <SettingsItem>
            <CheckboxLabel>
              <input type="checkbox" defaultChecked />
              예약 신청 알림
            </CheckboxLabel>
          </SettingsItem>
          <SettingsItem>
            <CheckboxLabel>
              <input type="checkbox" />
              결제 완료 알림
            </CheckboxLabel>
          </SettingsItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>보안 설정</SectionTitle>
          <SettingsItem>
            <Label>비밀번호 변경</Label>
            <ChangePasswordButton>비밀번호 변경</ChangePasswordButton>
          </SettingsItem>
        </SettingsSection>

        <SettingsActions>
          <SaveButton>저장</SaveButton>
          <CancelButton>취소</CancelButton>
        </SettingsActions>
      </SettingsContainer>
    </Container>
  );
};

export default Settings;
