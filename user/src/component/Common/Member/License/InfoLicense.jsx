import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Container } from '../../Styles/Styles';
import {
  FormWrapper,
  Title,
  Subtitle,
  FormGroup,
  Label,
  Input,
  Select,
  SubmitButton,
  SkipButton,
  CustomDatePicker
} from './License.styles';

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';

const InfoLicenseCertification = () => {
  const apiUrl = window.ENV?.API_URL || "http://127.0.0.1:8081";
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    licenseNo: '',
    renewDate: null,
    issuingAgency: '',
    licenseClass: '1종 보통',
  });

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const licenseTypes = ['1종 대형', '1종 보통', '1종 특수', '2종 보통'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, renewDate: date }));
  };

  const handleSubmit = () => {
    const { licenseNo, renewDate, issuingAgency, licenseClass } = formData;

    setLoading(true);
    const memberNo = auth?.memberNo;

    if (!memberNo) {
      setErrMsg("회원 정보가 유효하지 않습니다. 다시 로그인해주세요.");
      setLoading(false);
      return;
    }

    axios
      .post(`${apiUrl}/member/infoLicense`, {
        memberNo,
        licenseNo: formData.licenseNo,
        renewDate: formData.renewDate
                    ? new Date(formData.renewDate) // Date 객체로 변환
                    : null,
        issuingAgency: formData.issuingAgency,
        licenseClass: formData.licenseClass,
      },{
        headers:{
            Authorization: `Bearer ${auth.accessToken}`
        }
      })
      .then((result) => {
        if (result.status === 201) {
          alert("운전면허 인증이 완료되었습니다.");

          if (!auth.isAuthenticated) {
            // 회원가입 직후 accessToken 없는 경우 이거 수정해야함
           setTimeout(() => navigate("/info"), 1000);
          } else {
            // 마이페이지에서 인증한 경우
            setTimeout(() => navigate("/info"), 1000);
          }
        }
      })
      .catch((error) => {
        console.error("운전면허 인증 에러:", error.response);
        const errorMessage =
          error.response?.data?.["error-message"] ||
          error.response?.data?.message ||
          "운전면허 인증 중 오류가 발생했습니다!";
        setErrMsg(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const handleSkip = () => {
    alert("차량 예약 시 운전면허 인증을 해야 합니다.");
    setTimeout(() => navigate("/mypage"), 1000);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>운전면허 인증</Title>
        <Subtitle>License Certification</Subtitle>

        <FormGroup>
          <Label>운전면허번호</Label>
          <Input
            type="text"
            name="licenseNo"
            value={formData.licenseNo}
            onChange={handleChange}
            placeholder="Value"
          />
        </FormGroup>

        <FormGroup>
          <Label>갱신기간</Label>
          <CustomDatePicker
            selected={formData.renewDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜 선택하기"
          />
        </FormGroup>

        <FormGroup>
          <Label>발급처</Label>
          <Input
            type="text"
            name="issuingAgency"
            value={formData.issuingAgency}
            onChange={handleChange}
            placeholder="Value"
          />
        </FormGroup>

        <FormGroup>
          <Label>면허종류</Label>
          <Select
            name="licenseClass"
            value={formData.licenseClass}
            onChange={handleChange}
          >
            {licenseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormGroup>

        {errMsg && <p style={{ color: "red", fontSize: "14px" }}>{errMsg}</p>}

        <SubmitButton onClick={handleSubmit} disabled={loading}>
          {loading ? "처리중..." : "인증하기"}
        </SubmitButton>

        <SkipButton onClick={handleSkip}>건너뛰기</SkipButton>
      </FormWrapper>
    </Container>
  );
};

export default InfoLicenseCertification;
