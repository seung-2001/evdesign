// src/pages/CarDetails.jsx
import React from "react";
import {
  Container,
  Inner,
  TitleArea,
  MainTitle,
  SubTitle,
  ContentArea,
  LeftSection,
  RightSection,
  Card,
  CardTitle,
  CardImagePlaceholder,
  CardLabel,
  CardValue,
  StatusButton,
  Form,
  CarName,
  Tag,
  InfoText,
  SelectRow,
  SelectLabel,
  SelectBox,
  TextAreaRow,
  TextAreaLabel,
  TextArea,
  ButtonRow,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
} from "./CarDetails.styles";

const CarDetails = () => {
  return (
    <Container>
      <Inner>
        <TitleArea>
          <MainTitle>공유차량 상세보기</MainTitle>
          <SubTitle>Car Details</SubTitle>
        </TitleArea>

        <ContentArea>
          <LeftSection>
            <Card>
              <CardTitle>테슬라 모델 X 상세보기</CardTitle>
              <CardImagePlaceholder>첨부파일</CardImagePlaceholder>
              <CardLabel>첨부파일</CardLabel>
              <CardValue>파일명</CardValue>
            </Card>

            <Card>
              <CardTitle>지도</CardTitle>
              <CardImagePlaceholder>지도</CardImagePlaceholder>
              <CardLabel>장소이름</CardLabel>
              <CardValue>전체주소</CardValue>
            </Card>

            <StatusButton type="button">대여 상태 (예약 가능)</StatusButton>
          </LeftSection>

          <RightSection>
            <Form>
              <CarName>테슬라 모델 X</CarName>
              <Tag>테슬라</Tag>

              <InfoText>번호판 : 75하 1234</InfoText>
              <InfoText>최대 탑승 인원 : 7인승</InfoText>

              <SelectRow>
                <SelectLabel>색상</SelectLabel>
                <SelectBox>
                  <option>블랙</option>
                  <option>화이트</option>
                  <option>그레이</option>
                </SelectBox>
              </SelectRow>

              <TextAreaRow>
                <TextAreaLabel>차량설명</TextAreaLabel>
                <TextArea
                  placeholder="학생 가고 싶으면 이쪽부터 탑셀"
                  rows={4}
                />
              </TextAreaRow>

              <ButtonRow>
                <PrimaryButton type="button">예약하기</PrimaryButton>
                <SecondaryButton type="button">수정하기</SecondaryButton>
                <DangerButton type="button">삭제하기</DangerButton>
              </ButtonRow>
            </Form>
          </RightSection>
        </ContentArea>
      </Inner>
    </Container>
  );
};

export default CarDetails;
