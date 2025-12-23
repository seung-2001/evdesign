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
  ErrorMessage  // 추가
} from './SaveCar.styles.js';

const SaveCar = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [carNo, setCarNo] = useState(null);
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  const [formData, setFormData] = useState({
    carName: '',
    carPlate: '',
    maxPassenger: '',
    color: '',
    carLocation: '',
    carBrand: ''
  });

  // 유효성 검증 에러 상태 추가
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
    
    // 입력 시 해당 필드 에러 초기화
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
      const response = await axios.get(`${apiUrl}/cars/${carNo}`, {
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
        setImagePreview(`${apiUrl}/uploads/${car.img.changeName}`);
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
    
    // 브랜드 선택 시 에러 초기화
    if (errors.carBrand) {
      setErrors(prev => ({
        ...prev,
        carBrand: ''
      }));
    }
  };

  // 입력 검증 함수
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // 차량 이름 검증 (필수)
    if (!formData.carName || formData.carName.trim() === '') {
      newErrors.carName = '차량 이름은 필수 입력 항목입니다.';
      isValid = false;
    }

    // 번호판 검증 (필수)
    if (!formData.carPlate || formData.carPlate.trim() === '') {
      newErrors.carPlate = '번호판은 필수 입력 항목입니다.';
      isValid = false;
    }

    // 최대 탑승 인원 검증 (필수, 숫자, 1 이상)
    if (!formData.maxPassenger || formData.maxPassenger === '') {
      newErrors.maxPassenger = '최대 탑승 인원은 필수 입력 항목입니다.';
      isValid = false;
    } else if (isNaN(formData.maxPassenger) || parseInt(formData.maxPassenger) < 1) {
      newErrors.maxPassenger = '1 이상의 숫자를 입력해주세요.';
      isValid = false;
    }

    // 색상 검증 (필수)
    if (!formData.color || formData.color === '') {
      newErrors.color = '색상을 선택해주세요.';
      isValid = false;
    }

    // 차량 위치 검증 (필수)
    if (!formData.carLocation || formData.carLocation.trim() === '') {
      newErrors.carLocation = '차량 위치는 필수 입력 항목입니다.';
      isValid = false;
    }

    // 브랜드 검증 (필수)
    if (!formData.carBrand || formData.carBrand === '') {
      newErrors.carBrand = '브랜드를 선택해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    try {
      // 유효성 검증 실행
      if (!validateForm()) {
        alert('필수 입력 항목을 모두 입력해주세요.');
        return;
      }

      const token = localStorage.getItem('accessToken');
      const formDataToSend = new FormData();

      if (!isEditMode) {
        const carCreateDTO = {
          carName: formData.carName.trim(),
          carPlate: formData.carPlate.trim(),
          maxPassenger: parseInt(formData.maxPassenger),
          color: formData.color,
          carLocation: formData.carLocation.trim(),
          carBrand: formData.carBrand
        };

        formDataToSend.append('car', new Blob([JSON.stringify(carCreateDTO)], {
          type: 'application/json'
        }));
      } else {
        const carDTO = {
          carNo: carNo,
          carName: formData.carName.trim(),
          carPlate: formData.carPlate.trim(),
          maxPassenger: parseInt(formData.maxPassenger),
          color: formData.color,
          carLocation: formData.carLocation.trim(),
          carBrand: formData.carBrand
        };

        formDataToSend.append('car', new Blob([JSON.stringify(carDTO)], {
          type: 'application/json'
        }));
      }

      if (imageFile) {
        formDataToSend.append('file', imageFile);
      }
      if (attachedFile) {
        formDataToSend.append('file', attachedFile);
      }

      let response;
      if (!isEditMode) {
        response = await axios.post(`${apiUrl}/cars`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('차량이 등록되었습니다.');
      } else {
        response = await axios.put(`${apiUrl}/cars/${carNo}`, formDataToSend, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('차량 정보가 수정되었습니다.');
      }

      window.location.href = '/saveCar';

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

  const handleCancel = () => {
    if (confirm('작성을 취소하시겠습니까?')) {
      window.location.href = '/cars';
    }
  };

  const handleDelete = async () => {
    if (!isEditMode || !carNo) {
      alert('삭제할 수 없습니다.');
      return;
    }

    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      
      await axios.delete(`${apiUrl}/cars/${carNo}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('차량이 삭제되었습니다.');
      window.location.href = '/cars';

    } catch (error) {
      console.error('차량 삭제 실패:', error);
      
      if (error.response?.data?.['error-message']) {
        alert(error.response.data['error-message']);
      } else if (error.response?.status === 409) {
        alert('예약중인 차량은 삭제할 수 없습니다.');
      } else {
        alert('차량 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <Container>
      <PageTitle>{isEditMode ? '공유차량 수정' : '공유차량 등록'}</PageTitle>
      <PageSubtitle>{isEditMode ? 'Edit Car' : 'Save New Car'}</PageSubtitle>

      <ContentWrapper>
        <LeftSection>
          <SectionTitle>{isEditMode ? '공유차량 수정' : '공유차량 등록'}</SectionTitle>
          
          <ImageUploadArea>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none'}}
              id="image-upload"
            />
            {
              imagePreview
              ?
              (
                <label htmlFor="image-upload" style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img src={imagePreview} alt="차량 이미지 미리보기" style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} />
                </label>
              )
              :
              (
              <label 
                htmlFor="image-upload"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  color: '#999'
                }}
              >
                이미지를 선택하세요 (선택사항)
              </label>
              )
            }
          </ImageUploadArea>

          <FormSection>
            <FormTitle>첨부파일 (선택사항)</FormTitle>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none'}}
              id="file-upload"
            />
            <label 
              htmlFor="file-upload" 
              style={{ 
                fontSize: '14px', 
                color: attachedFile ? '#333' : '#666',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {attachedFile ? attachedFile.name : '파일을 선택하세요'}
            </label>
          </FormSection>

          <FormSection>
            <FormTitle>차량 위치 <span style={{color: 'red'}}>*</span></FormTitle>
            <Input 
              type="text" 
              name="carLocation"
              value={formData.carLocation}
              onChange={handleInputChange}
              placeholder="차량 위치 입력 (필수)"
              style={{
                borderColor: errors.carLocation ? 'red' : '#ddd'
              }}
            />
            {errors.carLocation && <ErrorMessage>{errors.carLocation}</ErrorMessage>}
          </FormSection>
        </LeftSection>

        <RightSection>
          <FormTitle>차량 정보 입력</FormTitle>
          
          <FormGroup>
            <Label>차량 이름 <span style={{color: 'red'}}>*</span></Label>
            <Input 
              type="text" 
              name="carName"
              value={formData.carName}
              onChange={handleInputChange}
              placeholder="차량 이름 입력 (필수)"
              style={{
                borderColor: errors.carName ? 'red' : '#ddd'
              }}
            />
            {errors.carName && <ErrorMessage>{errors.carName}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>브랜드 선택 <span style={{color: 'red'}}>*</span></Label>
            <TagSection>
              {availableBrands.map((brand, index) => (
                <Tag 
                  key={index}
                  onClick={() => handleBrandSelect(brand)}
                  style={{
                    cursor: 'pointer',
                    background: selectedBrand === brand ? '#4285f4' : '#d4f4dd',
                    color: selectedBrand === brand ? 'white' : '#2d5f3f',
                    border: errors.carBrand ? '2px solid red' : 'none'
                  }}
                >
                  {brand}
                </Tag>
              ))}
            </TagSection>
            {errors.carBrand && <ErrorMessage>{errors.carBrand}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>번호판 <span style={{color: 'red'}}>*</span></Label>
            <Input 
              type="text" 
              name="carPlate"
              value={formData.carPlate}
              onChange={handleInputChange}
              placeholder="예: 12가 3456 (필수)"
              style={{
                borderColor: errors.carPlate ? 'red' : '#ddd'
              }}
            />
            {errors.carPlate && <ErrorMessage>{errors.carPlate}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>최대 탑승 인원 <span style={{color: 'red'}}>*</span></Label>
            <Input 
              type="number" 
              name="maxPassenger"
              value={formData.maxPassenger}
              onChange={handleInputChange}
              placeholder="숫자만 입력 (필수)"
              min="1"
              style={{
                borderColor: errors.maxPassenger ? 'red' : '#ddd'
              }}
            />
            {errors.maxPassenger && <ErrorMessage>{errors.maxPassenger}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>색상 <span style={{color: 'red'}}>*</span></Label>
            <Select 
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              style={{
                borderColor: errors.color ? 'red' : '#ddd'
              }}
            >
              <option value="">색상 선택 (필수)</option>
              <option value="블랙">블랙</option>
              <option value="화이트">화이트</option>
              <option value="실버">실버</option>
              <option value="레드">레드</option>
              <option value="블루">블루</option>
              <option value="그레이">그레이</option>
            </Select>
            {errors.color && <ErrorMessage>{errors.color}</ErrorMessage>}
          </FormGroup>

          <ButtonGroup>
            <SubmitButton onClick={handleSubmit}>
              {isEditMode ? '수정하기' : '등록하기'}
            </SubmitButton>
            <CancelButton onClick={handleCancel}>취소</CancelButton>
          </ButtonGroup>

          {isEditMode && (
            <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
          )}
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default SaveCar;