import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  PageTitle,
  PageSubtitle,
  ContentWrapper,
  LeftSection,
  RightSection,
  SectionTitle,
  ImageUploadArea,
  FormSection,
  FormTitle,
  TagSection,
  Tag,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  DeleteButton,
  ErrorMessage
} from './SaveCar.styles.js';

const SaveCar = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [carNo, setCarNo] = useState(null);

  const [formData, setFormData] = useState({
    carName: '',
    carPlate: '',
    maxPassenger: '',
    color: '',
    carLocation: '',
    carBrand: ''
  });

  const [errors, setErrors] = useState({
    carName: '',
    carPlate: '',
    maxPassenger: '',
    color: '',
    carLocation: '',
    carBrand: ''
  });

  const availableBrands = ['테슬라', '현대', '기아', '벤츠', 'BMW', 'VOLVO'];
  const [selectedBrand, setSelectedBrand] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const carNoParam = urlParams.get('carNo');
    
    if (carNoParam) {
      setIsEditMode(true);
      setCarNo(carNoParam);
      fetchCarData(carNoParam);
    }
  }, []);

  const fetchCarData = async (carNo) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8081/cars/${carNo}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const car = response.data;
      
      setFormData({
        carName: car.carName || '',
        carPlate: car.carPlate || '',
        maxPassenger: car.maxPassenger || '',
        color: car.color || '',
        carLocation: car.carLocation || '',
        carBrand: car.carBrand || ''
      });

      setSelectedBrand(car.carBrand || '');

      if (car.img && car.img.changeName) {
        setImagePreview(`http://localhost:8081/uploads/${car.img.changeName}`);
      }

    } catch (error) {
      console.error('차량 정보 조회 실패:', error);
      alert('차량 정보를 불러오는데 실패했습니다.');
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const maxSize = 100 * 1024 * 1024;

    if (!imageFile) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }

    if (imageFile.size > maxSize) {
      alert("파일 크기는 100MB를 초과할 수 없습니다.");
      e.target.value = '';
      return;
    }

    setImageFile(imageFile);

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 100 * 1024 * 1024;

    if (!file) {
      setAttachedFile(null);
      return;
    }

    if (file.size > maxSize) {
      alert("파일 크기는 100MB를 초과할 수 없습니다.");
      e.target.value = '';
      return;
    }

    setAttachedFile(file);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setFormData(prev => ({
      ...prev,
      carBrand: brand
    }));
    
    if (errors.carBrand) {
      setErrors(prev => ({
        ...prev,
        carBrand: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.carName || formData.carName.trim() === '') {
      newErrors.carName = '차량 이름은 필수 입력 항목입니다.';
      isValid = false;
    }

    if (!formData.carPlate || formData.carPlate.trim() === '') {
      newErrors.carPlate = '번호판은 필수 입력 항목입니다.';
      isValid = false;
    }

    if (!formData.maxPassenger || formData.maxPassenger === '') {
      newErrors.maxPassenger = '최대 탑승 인원은 필수 입력 항목입니다.';
      isValid = false;
    } else if (isNaN(formData.maxPassenger) || parseInt(formData.maxPassenger) < 1) {
      newErrors.maxPassenger = '1 이상의 숫자를 입력해주세요.';
      isValid = false;
    }

    if (!formData.color || formData.color === '') {
      newErrors.color = '색상을 선택해주세요.';
      isValid = false;
    }

    if (!formData.carLocation || formData.carLocation.trim() === '') {
      newErrors.carLocation = '차량 위치는 필수 입력 항목입니다.';
      isValid = false;
    }

    if (!formData.carBrand || formData.carBrand === '') {
      newErrors.carBrand = '브랜드를 선택해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        alert('필수 입력 항목을 모두 입력해주세요.');
        return;
      }

      const token = localStorage.getItem('accessToken');
      const formDataToSend = new FormData();

      // 각 필드를 개별적으로 추가 (백엔드와 매핑)
      if (!isEditMode) {
        // 등록 모드 - CarCreateDTO
        formDataToSend.append('carName', formData.carName.trim());
        formDataToSend.append('carPlate', formData.carPlate.trim());
        formDataToSend.append('maxPassenger', parseInt(formData.maxPassenger));
        formDataToSend.append('color', formData.color);
        formDataToSend.append('carLocation', formData.carLocation.trim());
        formDataToSend.append('carBrand', formData.carBrand);
      } else {
        // 수정 모드 - CarDTO
        formDataToSend.append('carNo', carNo);
        formDataToSend.append('carName', formData.carName.trim());
        formDataToSend.append('carPlate', formData.carPlate.trim());
        formDataToSend.append('maxPassenger', parseInt(formData.maxPassenger));
        formDataToSend.append('color', formData.color);
        formDataToSend.append('carLocation', formData.carLocation.trim());
        formDataToSend.append('carBrand', formData.carBrand);
      }

      // 파일 추가
      if (imageFile) {
        formDataToSend.append('file', imageFile);
      }
      if (attachedFile) {
        formDataToSend.append('file', attachedFile);
      }

      console.log('전송할 데이터:', Object.fromEntries(formDataToSend));

      let response;
      if (!isEditMode) {
        response = await axios.post('http://localhost:8081/cars', formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('차량이 등록되었습니다.');
      } else {
        response = await axios.put(`http://localhost:8081/cars/${carNo}`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('차량 정보가 수정되었습니다.');
      }

      window.location.href = '/cars';

    } catch (error) {
      console.error('차량 등록/수정 실패:', error);
      
      if (error.response?.data?.['error-message']) {
        alert(error.response.data['error-message']);
      } else if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        alert('권한이 없습니다. 관리자/운영자만 접근 가능합니다.');
      } else {
        alert('차량 등록/수정에 실패했습니다.');
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 이 차량을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8081/cars/${carNo}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('차량이 삭제되었습니다.');
      window.location.href = '/cars';

    } catch (error) {
      console.error('차량 삭제 실패:', error);
      
      if (error.response?.status === 401) {
        alert('로그인이 필요합니다.');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        alert('권한이 없습니다. 관리자/운영자만 접근 가능합니다.');
      } else {
        alert('차량 삭제에 실패했습니다.');
      }
    }
  };

  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 저장되지 않습니다. 취소하시겠습니까?')) {
      window.location.href = '/cars';
    }
  };

  return (
    <Container>
      <PageTitle>{isEditMode ? '차량 정보 수정' : '차량 등록'}</PageTitle>
      <PageSubtitle>
        {isEditMode ? '차량 정보를 수정합니다' : '새로운 차량 정보를 등록합니다'}
      </PageSubtitle>

      <ContentWrapper>
        <LeftSection>
          <SectionTitle>차량 이미지</SectionTitle>
          <ImageUploadArea>
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="차량 이미지" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div>이미지를 업로드하세요</div>
            )}
          </ImageUploadArea>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <ButtonGroup>
            <SubmitButton 
              type="button" 
              onClick={() => document.getElementById('image-upload').click()}
            >
              이미지 업로드
            </SubmitButton>
          </ButtonGroup>

          <SectionTitle style={{ marginTop: '30px' }}>첨부 파일</SectionTitle>
          <FormGroup>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
            {attachedFile && (
              <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                선택된 파일: {attachedFile.name}
              </div>
            )}
          </FormGroup>
        </LeftSection>

        <RightSection>
          <FormSection>
            <FormTitle>차량 기본 정보</FormTitle>

            <FormGroup>
              <Label>차량명 *</Label>
              <Input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleInputChange}
                placeholder="예: 테슬라 모델 Y"
              />
              {errors.carName && <ErrorMessage>{errors.carName}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>차량 번호판 *</Label>
              <Input
                type="text"
                name="carPlate"
                value={formData.carPlate}
                onChange={handleInputChange}
                placeholder="예: 12가 3456"
              />
              {errors.carPlate && <ErrorMessage>{errors.carPlate}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>최대 탑승 인원 *</Label>
              <Input
                type="number"
                name="maxPassenger"
                value={formData.maxPassenger}
                onChange={handleInputChange}
                placeholder="예: 4"
                min="1"
              />
              {errors.maxPassenger && <ErrorMessage>{errors.maxPassenger}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>색상 *</Label>
              <Select
                name="color"
                value={formData.color}
                onChange={handleInputChange}
              >
                <option value="">색상을 선택하세요</option>
                <option value="흰색">흰색</option>
                <option value="검정">검정</option>
                <option value="은색">은색</option>
                <option value="회색">회색</option>
                <option value="빨강">빨강</option>
                <option value="파랑">파랑</option>
                <option value="기타">기타</option>
              </Select>
              {errors.color && <ErrorMessage>{errors.color}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>차량 위치 *</Label>
              <Input
                type="text"
                name="carLocation"
                value={formData.carLocation}
                onChange={handleInputChange}
                placeholder="예: KH 종로점"
              />
              {errors.carLocation && <ErrorMessage>{errors.carLocation}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>브랜드 *</Label>
              <TagSection>
                {availableBrands.map((brand) => (
                  <Tag
                    key={brand}
                    onClick={() => handleBrandSelect(brand)}
                    style={{
                      cursor: 'pointer',
                      background: selectedBrand === brand ? '#2d5f3f' : '#d4f4dd',
                      color: selectedBrand === brand ? '#fff' : '#2d5f3f'
                    }}
                  >
                    {brand}
                  </Tag>
                ))}
              </TagSection>
              {errors.carBrand && <ErrorMessage>{errors.carBrand}</ErrorMessage>}
            </FormGroup>
          </FormSection>

          <ButtonGroup>
            <SubmitButton type="button" onClick={handleSubmit}>
              {isEditMode ? '수정하기' : '등록하기'}
            </SubmitButton>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
          </ButtonGroup>

          {isEditMode && (
            <DeleteButton type="button" onClick={handleDelete}>
              차량 삭제
            </DeleteButton>
          )}
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default SaveCar;