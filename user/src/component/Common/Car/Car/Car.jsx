import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Sidebar,
  KeywordsSection,
  KeywordsTitle,
  SelectedTags,
  Tag,
  RemoveButton,
  CheckboxList,
  CheckboxItem,
  Checkbox,
  CheckboxLabel,
  MainContent,
  SearchBar,
  SearchInput,
  SearchIcon,
  CardGrid,
  Card,
  CardImage,
  CardCategory,
  CardTitle,
  PaginationWrapper,
  PageButton,
  LoadingMessage,
  EmptyMessage,
  RegisterButton
} from './Car.styles';

const Car = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [cars, setCars] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // 백엔드는 0부터 시작
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 필터 상태
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  // 브랜드 목록 (백엔드 데이터 기반으로 동적 생성 가능)
  const allBrands = ['테슬라', '현대', '기아', '벤츠', 'BMW', 'VOLVO'];

  // 차량 목록 조회
  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  const fetchCars = async (page) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`http://localhost:8081/cars?pageNo=${page}`);
      
      setCars(response.data.cars || []);
      setPageInfo(response.data.pi);

    } catch (error) {
      console.error('차량 목록 조회 실패:', error);
      setError('차량 목록을 불러오는데 실패했습니다.');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // 브랜드 필터 토글
  const handleToggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // 브랜드 필터 제거
  const handleRemoveBrand = (brand) => {
    setSelectedBrands(selectedBrands.filter(b => b !== brand));
  };

  // 검색 필터링
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // 필터링된 차량 목록
  const filteredCars = cars.filter(car => {
    // 브랜드 필터
    const brandMatch = selectedBrands.length === 0 || 
                       selectedBrands.includes(car.carBrand);
    
    // 검색어 필터 (차량 이름, 브랜드, 번호판으로 검색)
    const searchMatch = searchText === '' ||
                       car.carName?.toLowerCase().includes(searchText.toLowerCase()) ||
                       car.carBrand?.toLowerCase().includes(searchText.toLowerCase()) ||
                       car.carPlate?.toLowerCase().includes(searchText.toLowerCase());
    
    return brandMatch && searchMatch;
  });

  // 페이지 이동
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 차량 상세 페이지로 이동
  const handleCardClick = (carNo) => {
    navigate(`/cars/${carNo}`);
  };

  // 차량 등록 페이지로 이동 (관리자/운영자만)
  const handleRegister = () => {
    const token = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (role !== 'ROLE_OPERATOR' && role !== 'ROLE_ADMIN') {
      alert('차량 등록 권한이 없습니다.');
      return;
    }

    navigate('/cars');
  };

  // 페이지 번호 생성
  const renderPageNumbers = () => {
    if (!pageInfo) return null;

    const pages = [];
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          active={i === pageInfo.currentPage}
          onClick={() => handlePageChange(i - 1)} // 화면은 1부터, API는 0부터
        >
          {i}
        </PageButton>
      );
    }
    return pages;
  };

  return (
    <Container>
      <Sidebar>
        <KeywordsSection>
          <KeywordsTitle>브랜드 필터</KeywordsTitle>
          
          {/* 선택된 브랜드 태그 */}
          {selectedBrands.length > 0 && (
            <SelectedTags>
              {selectedBrands.map(brand => (
                <Tag key={brand}>
                  {brand}
                  <RemoveButton onClick={() => handleRemoveBrand(brand)}>
                    ×
                  </RemoveButton>
                </Tag>
              ))}
            </SelectedTags>
          )}

          {/* 브랜드 체크박스 */}
          <CheckboxList>
            {allBrands.map(brand => (
              <CheckboxItem key={brand}>
                <Checkbox
                  type="checkbox"
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleToggleBrand(brand)}
                />
                <CheckboxLabel htmlFor={brand}>
                  {brand}
                </CheckboxLabel>
              </CheckboxItem>
            ))}
          </CheckboxList>
        </KeywordsSection>
      </Sidebar>

      <MainContent>
        {/* 검색바와 등록 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="차량 이름, 브랜드, 번호판 검색"
              value={searchText}
              onChange={handleSearch}
            />
            <SearchIcon>🔍</SearchIcon>
          </SearchBar>

          {/* 관리자/운영자만 보이는 등록 버튼 */}
          {(localStorage.getItem('role') === 'ROLE_OPERATOR' || 
            localStorage.getItem('role') === 'ROLE_ADMIN') && (
            <RegisterButton onClick={handleRegister}>
              + 차량 등록
            </RegisterButton>
          )}
        </div>

        {/* 로딩 상태 */}
        {loading && <LoadingMessage>차량 목록을 불러오는 중...</LoadingMessage>}

        {/* 에러 상태 */}
        {error && <EmptyMessage>{error}</EmptyMessage>}

        {/* 차량 목록 */}
        {!loading && !error && (
          <>
            {filteredCars.length === 0 ? (
              <EmptyMessage>
                {searchText || selectedBrands.length > 0 
                  ? '검색 조건에 맞는 차량이 없습니다.'
                  : '등록된 차량이 없습니다.'}
              </EmptyMessage>
            ) : (
              <CardGrid>
                {filteredCars.map(car => (
                  <Card
                    key={car.carNo}
                    onClick={() => handleCardClick(car.carNo)}
                  >
                    <CardImage>
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
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#999',
                          fontSize: '14px'
                        }}>
                          이미지 없음
                        </div>
                      )}
                    </CardImage>
                    <CardCategory>{ (car.carBrand || '').trim() || '브랜드 미지정' }</CardCategory>
                    <CardTitle>{car.carName}</CardTitle>
                    <div style={{ 
                      padding: '0 16px 16px', 
                      fontSize: '13px', 
                      color: '#666' 
                    }}>
                      { (car.carPlate || '').trim() || '번호판 미등록' } · {car.maxPassenger}인승
                      {car.rentalStatus === 'Y' && (
                        <span style={{ 
                          marginLeft: '8px',
                          color: '#dc3545',
                          fontWeight: '600'
                        }}>
                          (예약중)
                        </span>
                      )}
                    </div>
                  </Card>
                ))}
              </CardGrid>
            )}

            {/* 페이지네이션 */}
            {pageInfo && pageInfo.maxPage > 1 && (
              <PaginationWrapper>
                {/* 이전 버튼 */}
                {pageInfo.currentPage > 1 && (
                  <PageButton 
                    onClick={() => handlePageChange(pageInfo.currentPage - 2)}
                  >
                    이전
                  </PageButton>
                )}

                {/* 페이지 번호 */}
                {renderPageNumbers()}

                {/* 다음 버튼 */}
                {pageInfo.currentPage < pageInfo.maxPage && (
                  <PageButton 
                    onClick={() => handlePageChange(pageInfo.currentPage)}
                  >
                    다음
                  </PageButton>
                )}
              </PaginationWrapper>
            )}
          </>
        )}
      </MainContent>
    </Container>
  );
};

export default Car;