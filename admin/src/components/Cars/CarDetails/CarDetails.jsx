import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
  LoadingMessage,
  ErrorMessage
} from "./CarDetails.styles.js";

const CarDetails = () => {
  const { carNo } = useParams(); // URL에서 차량 번호 가져오기
  const navigate = useNavigate();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 차량 상세 정보 조회
  useEffect(() => {
    fetchCarDetails();
  }, [carNo]);

  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      
      const response = await axios.get(`http://localhost:8081/cars/${carNo}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setCar(response.data);
      setError(null);

    } catch (error) {
      console.error('차량 조회 실패:', error);
      
      if (error.response?.status === 404) {
        setError('차량 정보를 찾을 수 없습니다.');
      } else if (error.response?.status === 400) {
        setError('삭제되었거나 사용할 수 없는 차량입니다.');
      } else {
        setError('차량 정보를 불러오는데 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 예약하기
  const handleReserve = () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 예약 상태 확인
    if (car.rentalStatus === 'Y') {
      alert('이미 예약된 차량입니다.');
      return;
    }

    // 예약 페이지로 이동 (차량 정보 전달)
    navigate(`/reserve?carNo=${carNo}`);
  };

  // 수정하기
  const handleEdit = () => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 권한 확인 (OPERATOR, ADMIN만 수정 가능)
    if (role !== 'ROLE_OPERATOR' && role !== 'ROLE_ADMIN') {
      alert('수정 권한이 없습니다.');
      return;
    }

    navigate(`/cars/edit?carNo=${carNo}`);
  };

  // 삭제하기
  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 권한 확인
    if (role !== 'ROLE_OPERATOR' && role !== 'ROLE_ADMIN') {
      alert('삭제 권한이 없습니다.');
      return;
    }

    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8081/cars/${carNo}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('차량이 삭제되었습니다.');
      navigate('/cars');

    } catch (error) {
      console.error('차량 삭제 실패:', error);
      
      if (error.response?.data?.['error-message']) {
        alert(error.response.data['error-message']);
      } else if (error.response?.status === 409) {
        alert('예약중인 차량은 삭제할 수 없습니다.');
      } else if (error.response?.status === 403) {
        alert('삭제 권한이 없습니다.');
      } else {
        alert('차량 삭제에 실패했습니다.');
      }
    }
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate('/cars');
  };

  // 로딩 중
  if (loading) {
    return (
      <Container>
        <Inner>
          <LoadingMessage>차량 정보를 불러오는 중...</LoadingMessage>
        </Inner>
      </Container>
    );
  }

  // 에러 발생
  if (error || !car) {
    return (
      <Container>
        <Inner>
          <ErrorMessage>{error || '차량 정보를 찾을 수 없습니다.'}</ErrorMessage>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <SecondaryButton onClick={handleBackToList}>목록으로</SecondaryButton>
          </div>
        </Inner>
      </Container>
    );
  }

  return (
    <Container>
      <Inner>
        <TitleArea>
          <MainTitle>공유차량 상세보기</MainTitle>
          <SubTitle>Car Details</SubTitle>
        </TitleArea>

        <ContentArea>
          <LeftSection>
            {/* 차량 이미지 카드 */}
            <Card>
              <CardTitle>{car.carName} 상세보기</CardTitle>
              <CardImagePlaceholder>
                {car.img && car.img.changeName ? (
                  <img 
                    src={`http://localhost:8081/uploads/${car.img.changeName}`}
                    alt={car.carName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                ) : (
                  <span>등록된 이미지가 없습니다</span>
                )}
              </CardImagePlaceholder>
              
              {car.file && car.file.originName && (
                <>
                  <CardLabel>첨부파일</CardLabel>
                  <CardValue>
                    <a 
                      href={`http://localhost:8081/uploads/${car.file.changeName}`}
                      download={car.file.originName}
                      style={{ color: '#276ef1', textDecoration: 'underline' }}
                    >
                      {car.file.originName}
                    </a>
                  </CardValue>
                </>
              )}
            </Card>

            {/* 차량 위치 카드 */}
            <Card>
              <CardTitle>차량 위치</CardTitle>
              <CardImagePlaceholder>
                지도 (추후 구현)
              </CardImagePlaceholder>
              <CardLabel>위치</CardLabel>
              <CardValue>{car.carLocation || '위치 정보 없음'}</CardValue>
            </Card>

            {/* 예약 상태 버튼 */}
            <StatusButton 
              type="button"
              onClick={handleReserve}
              disabled={car.rentalStatus === 'Y'}
              style={{
                backgroundColor: car.rentalStatus === 'Y' ? '#999' : '#276ef1',
                cursor: car.rentalStatus === 'Y' ? 'not-allowed' : 'pointer'
              }}
            >
              {car.rentalStatus === 'Y' ? '예약 불가 (예약중)' : '예약 가능'}
            </StatusButton>
          </LeftSection>

          <RightSection>
            <Form>
              <CarName>{car.carName}</CarName>
              <Tag>{car.carBrand || '브랜드 미지정'}</Tag>

              <InfoText>번호판 : {car.carPlate || '미등록'}</InfoText>
              <InfoText>최대 탑승 인원 : {car.maxPassenger}인승</InfoText>
              <InfoText>색상 : {car.color || '미지정'}</InfoText>
              <InfoText>등록일 : {car.registerDate ? new Date(car.registerDate).toLocaleDateString() : '-'}</InfoText>

              <SelectRow style={{ marginTop: '20px' }}>
                <SelectLabel>차량 상태</SelectLabel>
                <SelectBox disabled value={car.status}>
                  <option value="Y">사용 가능</option>
                  <option value="N">사용 불가</option>
                </SelectBox>
              </SelectRow>

              <TextAreaRow>
                <TextAreaLabel>차량 설명</TextAreaLabel>
                <TextArea
                  placeholder="차량 설명이 없습니다."
                  rows={4}
                  disabled
                  value={car.description || ''}
                />
              </TextAreaRow>

              <ButtonRow>
                <PrimaryButton type="button" onClick={handleReserve}>
                  예약하기
                </PrimaryButton>
                <SecondaryButton type="button" onClick={handleEdit}>
                  수정하기
                </SecondaryButton>
                <DangerButton type="button" onClick={handleDelete}>
                  삭제하기
                </DangerButton>
              </ButtonRow>

              <div style={{ marginTop: '12px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={handleBackToList}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  목록으로 돌아가기
                </button>
              </div>
            </Form>
          </RightSection>
        </ContentArea>
      </Inner>
    </Container>
  );
};

export default CarDetails;