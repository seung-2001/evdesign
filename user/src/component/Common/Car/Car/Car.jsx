import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  
  // 상태 관리
  const [cars, setCars] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const pageFromUrl = searchParams.get('page');
    return pageFromUrl ? parseInt(pageFromUrl) : 1;
  }); // 1부터 시작 (화면 표시용)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 필터 상태
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  // 브랜드 목록
  const allBrands = ['테슬라', '현대', '기아', '벤츠', 'BMW', 'VOLVO'];

  // 차량 목록 조회
  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  const fetchCars = async (page) => {
    try {
      setLoading(true);
      setError(null);

      // ✅ 백엔드는 0부터 시작하므로 -1
      const response = await axios.get(`http://localhost:8081/cars?pageNo=${page - 1}`);
      
      console.log('API 응답:', response.data); // 디버깅용
      
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
    const brandMatch = selectedBrands.length === 0 || 
                       selectedBrands.includes(car.carBrand);
    
    const searchMatch = searchText === '' ||
                       car.carName?.toLowerCase().includes(searchText.toLowerCase()) ||
                       car.carBrand?.toLowerCase().includes(searchText.toLowerCase()) ||
                       car.carPlate?.toLowerCase().includes(searchText.toLowerCase());
    
    return brandMatch && searchMatch;
  });

  // ✅ 페이지 이동 - 화면 페이지 번호(1부터)를 받음
  const handlePageChange = (page) => {
    console.log('페이지 변경:', page); // 디버깅용
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 차량 상세 페이지로 이동
  const handleCardClick = (carNo) => {
    navigate(`/car/${carNo}?page=${currentPage}`);
  };

  // 차량 등록 페이지로 이동
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

    navigate('/cars/register');
  };

  // ✅ 페이지 번호 생성
  const renderPageNumbers = () => {
    if (!pageInfo) return null;

    const pages = [];
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          $active={i === currentPage}  // ✅ 현재 상태와 비교
          onClick={() => handlePageChange(i)}  // ✅ 화면 번호 그대로 전달
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="차량 이름, 브랜드, 번호판 검색"
              value={searchText}
              onChange={handleSearch}
            />
            <SearchIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </SearchIcon>
          </SearchBar>

          {(localStorage.getItem('role') === 'ROLE_OPERATOR' || 
            localStorage.getItem('role') === 'ROLE_ADMIN') && (
            <RegisterButton onClick={handleRegister}>
              + 차량 등록
            </RegisterButton>
          )}
        </div>

        {loading && <LoadingMessage>차량 목록을 불러오는 중...</LoadingMessage>}

        {error && <EmptyMessage>{error}</EmptyMessage>}

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
                    <CardCategory>{(car.carBrand || '').trim() || '브랜드 미지정'}</CardCategory>
                    <CardTitle>{car.carName}</CardTitle>
                    <div style={{ 
                      padding: '0 16px 16px', 
                      fontSize: '13px', 
                      color: '#666' 
                    }}>
                      {(car.carPlate || '').trim() || '번호판 미등록'} · {car.maxPassenger}인승
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

            {/* ✅ 페이지네이션 */}
            {pageInfo && pageInfo.maxPage > 1 && (
              <PaginationWrapper>
                {/* 이전 버튼 */}
                {currentPage > 1 && (
                  <PageButton 
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    이전
                  </PageButton>
                )}

                {/* 페이지 번호들 */}
                {renderPageNumbers()}

                {/* 다음 버튼 */}
                {currentPage < pageInfo.maxPage && (
                  <PageButton 
                    onClick={() => handlePageChange(currentPage + 1)}
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