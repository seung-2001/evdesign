import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  ContentWrapper,
  LeftSection,
  ImageSection,
  HeartButton,
  ImagePlaceholder,
  ReserveButton,
  RightSection,
  Title,
  CategoryTag,
  InfoSection,
  InfoText,
  ColorSection,
  ColorLabel,
  ColorDropdown,
  ReserveButtonTop,
  DetailsSection,
  DetailsHeader,
  DetailsTitle,
  ToggleIcon,
  DetailsContent,
  LoadingMessage,
  ErrorMessage,
  BackButton
} from './CarDetails.styles';

const CarDetails = () => {
  const { carNo } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  // 차량 상세 정보 조회
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:8081/cars/${carNo}`);
        const carData = response.data;
        
        setCar(carData);
        setSelectedColor(carData.color || '블랙');

      } catch (error) {
        console.error('차량 상세 정보 조회 실패:', error);
        
        if (error.response?.status === 404) {
          setError('차량을 찾을 수 없습니다.');
        } else if (error.response?.status === 400) {
          setError('잘못된 요청입니다.');
        } else {
          setError('차량 정보를 불러오는데 실패했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (carNo) {
      fetchCarDetails();
    }
  }, [carNo]);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const toggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  const handleReserve = () => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 예약 페이지로 이동 (예약 기능 구현 시)
    navigate(`/reserve/${carNo}`);
  };

  const handleBack = () => {
    const page = searchParams.get('page');
    navigate(page ? `/car?page=${page}` : '/car');
  };

  // 로딩 중
  if (loading) {
    return (
      <Container>
        <LoadingMessage>차량 정보를 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <Container>
        <ErrorMessage>
          {error}
          <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
        </ErrorMessage>
      </Container>
    );
  }

  // 차량 정보 없음
  if (!car) {
    return (
      <Container>
        <ErrorMessage>
          차량 정보를 찾을 수 없습니다.
          <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
        </ErrorMessage>
      </Container>
    );
  }

  // 예약 상태 확인
  const isReserved = car.status === 'N' || car.rentalStatus === 'Y';

  return (
    <Container>
      <BackButton onClick={handleBack} style={{ marginBottom: '20px' }}>
        ← 목록으로
      </BackButton>

      <ContentWrapper>
        <LeftSection>
          <ImageSection>
            <HeartButton onClick={handleLikeToggle} isLiked={isLiked}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </HeartButton>
            
            {car.img && car.img.changeName ? (
              <img 
                src={`http://localhost:8081/uploads/${car.img.changeName}`}
                alt={car.carName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <ImagePlaceholder>
                <span style={{ color: '#999', fontSize: '16px' }}>
                  이미지 없음
                </span>
              </ImagePlaceholder>
            )}
          </ImageSection>
          
          <ReserveButton 
            onClick={handleReserve}
            disabled={isReserved}
            style={{
              backgroundColor: isReserved ? '#ccc' : '#2a2a2a',
              cursor: isReserved ? 'not-allowed' : 'pointer'
            }}
          >
            {isReserved ? '예약 불가' : '예약하기'}
          </ReserveButton>
        </LeftSection>

        <RightSection>
          <Title>{car.carName || '차량명 없음'}</Title>
          <CategoryTag>{car.carBrand || '브랜드 미지정'}</CategoryTag>
          
          <InfoSection>
            <InfoText>
              번호판 : {car.carPlate || '번호판 미등록'}
            </InfoText>
            <InfoText>
              최대 탑승 인원 : {car.maxPassenger || 0}인승
            </InfoText>
            <InfoText>
              위치 : {car.carLocation || '위치 미지정'}
            </InfoText>
            <InfoText>
              등록일 : {car.registerDate ? new Date(car.registerDate).toLocaleDateString() : '-'}
            </InfoText>
          </InfoSection>

          <ColorSection>
            <ColorLabel>색상</ColorLabel>
            <ColorDropdown value={selectedColor} onChange={handleColorChange} disabled>
              <option value={car.color}>{car.color || '색상 정보 없음'}</option>
            </ColorDropdown>
          </ColorSection>

          <ReserveButtonTop
            style={{
              backgroundColor: isReserved ? '#ccc' : '#4a90e2',
              cursor: isReserved ? 'default' : 'pointer'
            }}
          >
            {isReserved ? '예약중' : '예약 가능'}
          </ReserveButtonTop>

          <DetailsSection>
            <DetailsHeader onClick={toggleDetails}>
              <DetailsTitle>차량 상세 정보</DetailsTitle>
              <ToggleIcon isOpen={isDetailsOpen}>^</ToggleIcon>
            </DetailsHeader>
            {isDetailsOpen && (
              <DetailsContent>
                <p><strong>차량 번호:</strong> {car.carNo}</p>
                <p><strong>브랜드:</strong> {car.carBrand || '미지정'}</p>
                <p><strong>색상:</strong> {car.color || '미지정'}</p>
                <p><strong>상태:</strong> {car.status === 'Y' ? '정상' : '사용 불가'}</p>
                
                {car.file && car.file.originName && (
                  <div style={{ marginTop: '16px' }}>
                    <strong>첨부 파일:</strong>
                    <a 
                      href={`http://localhost:8081/uploads/${car.file.changeName}`}
                      download={car.file.originName}
                      style={{ 
                        marginLeft: '8px',
                        color: '#4a90e2',
                        textDecoration: 'underline'
                      }}
                    >
                      {car.file.originName}
                    </a>
                  </div>
                )}
              </DetailsContent>
            )}
          </DetailsSection>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default CarDetails;