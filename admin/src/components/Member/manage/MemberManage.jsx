import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useSearch } from '../../../context/SearchContext';
import { allMember, assignOperator, deleteMemByAd, responseStatus } from '../../../api/request';
import * as S from './MemberManage.styles';

const MemberManage = () => {
  const { auth } = useContext(AuthContext);
  const { searchKeyword } = useSearch();
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const apiUrl = window.ENV?.API_URL || "http://localhost:8081";

  // 전체 members에서 검색 적용
  const filteredMembers = members.filter((m) =>
    m.memberName?.includes(searchKeyword) ||
    m.memberId?.includes(searchKeyword) ||
    m.memberNo?.toString().includes(searchKeyword)
  );

  // filteredMembers 기반으로 페이지네이션 계산
  useEffect(() => {
    setTotalPages(Math.ceil(filteredMembers.length / itemsPerPage));
    setCurrentPage(1); // 검색어 바뀌면 1페이지로 초기화
  }, [filteredMembers.length]);
  
  useEffect(() => {
    if (auth.isAuthenticated === null) return;

    setLoadingAuth(false);
    
    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
      

    if (!auth.role?.includes("ADMIN") && !auth.role?.includes("OPERATOR")) {
      alert("접근 권한이 없습니다.");
      navigate("/");
      return;
    }

    fetchMembers();
  }, [auth]);
  

  const fetchMembers = async () => {
  setLoading(true);
  try {
    const url = "/member/operator/member-manage";
    const authToken = `Bearer ${auth.accessToken}`;
    const res = await allMember(url, authToken);
    const errMessage = "회원 조회에 실패하였습니다.";
    
    responseStatus(res, errMessage, setMembers);
  } catch (err) {
    console.error("에러 상세:", err);
    alert('회원 목록 조회 실패: ' + (err.response?.data?.message || err.message));
    setMembers([]);
  } finally {
    setLoading(false);
  }
};

  const getCurrentPageMembers = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredMembers.slice(start, end);
  };

  const handleAssignOperator = async (member) => {
    if (window.confirm(`${member.memberName}(${member.memberId})님을 OPERATOR로 지정하시겠습니까?`)) {
      try {
        const url = "/member/admin/change-role/";
        const authToken = `${auth.accessToken}`;
        const errMessage = "관리자 지정에 실패했습니다.";

        const res = await assignOperator(url, authToken, member);
        if(responseStatus(res, errMessage, setMembers)){
          alert('관리자로 지정되었습니다.');
          fetchMembers();

        }
      } catch (err) {
        alert(err.response?.data || '관리자 지정에 실패했습니다.123');
      }
    }
  };

  const handleDeleteMember = async (member) => {
    if (window.confirm(`${member.memberName}(${member.memberId}) 회원을 탈퇴시키겠습니까?`)) {
      try {
        const url = "/member/operator/member-manage/"
        const authToken = `${auth.accessToken}`
        const res = await deleteMemByAd(member, url, authToken);
        const errMessage = "회원 탈퇴에 실패하였습니다.";
        if(responseStatus(res, errMessage, setMembers)){
          alert('회원 탈퇴가 완료되었습니다.');
          fetchMembers();

        }
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.["error-message"] || '회원탈퇴에 실패했습니다.');
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (loadingAuth) {
    return (
      <S.Container>
        <S.Header>
          <S.Title>회원 관리</S.Title>
          <S.Subtitle>memberManage</S.Subtitle>
        </S.Header>
        <S.ContentWrapper>
          <S.LoadingWrapper>
            <S.LoadingText>로딩 중...</S.LoadingText>
          </S.LoadingWrapper>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>회원 관리</S.Title>
        <S.Subtitle>memberManage</S.Subtitle>
      </S.Header>

      <S.ContentWrapper>
        <S.TableWrapper>
          {loading ? (
            <S.LoadingWrapper>
              <S.LoadingText>로딩 중...</S.LoadingText>
            </S.LoadingWrapper>
          ) : (
            <>
              <S.Table>
                <S.TableHead>
                  <S.TableRow>
                    <S.TableHeader>memberNo</S.TableHeader>
                    <S.TableHeader>memberId</S.TableHeader>
                    <S.TableHeader>memberName</S.TableHeader>
                    <S.TableHeader>enrollDate</S.TableHeader>
                    <S.TableHeader>role</S.TableHeader>
                    <S.TableHeader>status</S.TableHeader>
                    <S.TableHeader>액션</S.TableHeader>
                  </S.TableRow>
                </S.TableHead>
                <S.TableBody>
                  {getCurrentPageMembers().length === 0 ? (
                    <S.TableRow>
                      <S.TableCell colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                        조회된 회원이 없습니다.
                      </S.TableCell>
                    </S.TableRow>
                  ) : (
                    getCurrentPageMembers().map((member) => (
                      <S.TableRow key={member.memberNo}>
                        <S.TableCell>{member.memberNo}</S.TableCell>
                        <S.TableCell>{member.memberId}</S.TableCell>
                        <S.TableCell>{member.memberName}</S.TableCell>
                        <S.TableCell $secondary>
                          {new Date(member.enrollDate).toLocaleDateString('ko-KR')}
                        </S.TableCell>
                        <S.TableCell>
                          <S.Badge $variant={member.roleStatus?.toLowerCase().replace('role_', '') || 'user'}>
                            {member.roleStatus || 'ROLE_USER'}
                          </S.Badge>
                        </S.TableCell>
                        <S.TableCell>
                          <S.Badge $variant={member.status === 'Y' ? 'active' : 'inactive'}>
                            {member.status === 'Y' ? '활성' : '비활성'}
                          </S.Badge>
                        </S.TableCell>
                        <S.TableCell>
                          <S.ButtonGroup>
                            {auth.role?.includes('ADMIN') && (
                              <S.AssignButton 
                                $canAssign={member.roleStatus === 'ROLE_USER' && member.status === 'Y'} 
                                disabled={member.roleStatus !== 'ROLE_USER' || member.status !=='Y'}
                                onClick={() => handleAssignOperator(member)}
                              >
                                관리자지정
                              </S.AssignButton>
                            )}
                            <S.DeleteButton 
                              $canDelete={member.status === 'Y'} 
                              disabled={member.status === 'N'}
                              onClick={() => handleDeleteMember(member)}
                            >
                              회원탈퇴
                            </S.DeleteButton>
                          </S.ButtonGroup>
                        </S.TableCell>
                      </S.TableRow>
                    ))
                  )}
                </S.TableBody>
              </S.Table>

              <S.PaginationWrapper>
                <S.PaginationInfo>
                  전체 <S.InfoNumber>{filteredMembers.length}</S.InfoNumber>개 중{' '}
                  <S.InfoNumber>
                    {filteredMembers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                  </S.InfoNumber>
                  -
                  <S.InfoNumber>
                    {Math.min(currentPage * itemsPerPage, filteredMembers.length)}
                  </S.InfoNumber>{' '}
                  표시
                </S.PaginationInfo>
                <S.Pagination>
                  <S.PageButton 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                  >
                    ‹
                  </S.PageButton>
                  {getPageNumbers().map((page) => (
                    <S.PageButton 
                      key={page} 
                      onClick={() => handlePageChange(page)} 
                      $active={currentPage === page}
                    >
                      {page}
                    </S.PageButton>
                  ))}
                  <S.PageButton 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    ›
                  </S.PageButton>
                </S.Pagination>
              </S.PaginationWrapper>
            </>
          )}
        </S.TableWrapper>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default MemberManage;