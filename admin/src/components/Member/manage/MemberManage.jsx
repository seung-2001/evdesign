import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import * as S from './MemberManage.styles';

const MemberManage = () => {
  const { auth } = useContext(AuthContext); // AuthContext에서 auth 가져오기
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // auth 로딩 상태
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
  if (auth.isAuthenticated === null) return; // auth 초기화 대기

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

  // 회원 목록 조회
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/operator/member-manage', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setMembers(res.data);
      setTotalPages(Math.ceil(res.data.length / itemsPerPage));
    } catch (err) {
      console.error(err);
      alert('회원 목록 조회 실패');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPageMembers = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return members.slice(start, end);
  };

  const handleAssignOperator = async (member) => {
    if (!auth.role.includes('ADMIN')) {
      alert('관리자 지정은 ADMIN만 가능합니다.');
      return;
    }

    if (member.roleStatus === 'OPERATOR' || member.roleStatus === 'ADMIN') {
      alert('이미 관리자 권한을 가진 회원입니다.');
      return;
    }

    if (window.confirm(`${member.memberName}(${member.memberId})님을 OPERATOR로 지정하시겠습니까?`)) {
      try {
        await axios.patch(
          `/api/operator/member/${member.memberNo}/role`,
          { roleStatus: 'OPERATOR' },
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        alert('관리자로 지정되었습니다.');
        fetchMembers();
      } catch (err) {
        console.error(err);
        alert('관리자 지정에 실패했습니다.');
      }
    }
  };

  const handleDeleteMember = async (member) => {
    if (auth.role.includes('OPERATOR') && member.roleStatus === 'ADMIN') {
      alert('OPERATOR는 ADMIN 회원을 탈퇴시킬 수 없습니다.');
      return;
    }
    if (member.roleStatus === 'ADMIN') {
      alert('ADMIN 계정은 탈퇴시킬 수 없습니다.');
      return;
    }

    if (window.confirm(`${member.memberName}(${member.memberId}) 회원을 탈퇴시키겠습니까?`)) {
      try {
        await axios.delete(`/api/operator/member/${member.memberNo}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        alert('회원 탈퇴가 완료되었습니다.');
        fetchMembers();
      } catch (err) {
        console.error(err);
        alert('회원 탈퇴에 실패했습니다.');
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

  // auth 로딩 중이면 로딩 화면
  if (loadingAuth) {
    return (
      <S.Container>
        <S.ContentWrapper>
          <S.LoadingWrapper>
            <S.LoadingText>권한을 확인하는 중...</S.LoadingText>
          </S.LoadingWrapper>
        </S.ContentWrapper>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Header>
          <S.Title>회원 관리</S.Title>
        </S.Header>

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
                  {getCurrentPageMembers().map((member) => (
                    <S.TableRow key={member.memberNo}>
                      <S.TableCell>{member.memberNo}</S.TableCell>
                      <S.TableCell>{member.memberId}</S.TableCell>
                      <S.TableCell>{member.memberName}</S.TableCell>
                      <S.TableCell $secondary>
                        {new Date(member.enrollDate).toLocaleDateString('ko-KR')}
                      </S.TableCell>
                      <S.TableCell>
                        <S.Badge $variant={member.roleStatus?.toLowerCase() || 'user'}>
                          {member.roleStatus || 'USER'}
                        </S.Badge>
                      </S.TableCell>
                      <S.TableCell>
                        <S.Badge $variant={member.status === 'Y' ? 'active' : 'inactive'}>
                          {member.status === 'Y' ? '활성' : '비활성'}
                        </S.Badge>
                      </S.TableCell>
                      <S.TableCell>
                        <S.ButtonGroup>
                          {auth.role.includes('ADMIN') && (
                            <S.AssignButton onClick={() => handleAssignOperator(member)}>
                              관리자지정
                            </S.AssignButton>
                          )}
                          <S.DeleteButton onClick={() => handleDeleteMember(member)}>회원탈퇴</S.DeleteButton>
                        </S.ButtonGroup>
                      </S.TableCell>
                    </S.TableRow>
                  ))}
                </S.TableBody>
              </S.Table>

              <S.PaginationWrapper>
                <S.PaginationInfo>
                  전체 <S.InfoNumber>{members.length}</S.InfoNumber>개 중{' '}
                  <S.InfoNumber>{(currentPage - 1) * itemsPerPage + 1}</S.InfoNumber>-
                  <S.InfoNumber>{Math.min(currentPage * itemsPerPage, members.length)}</S.InfoNumber>{' '}
                  표시
                </S.PaginationInfo>
                <S.Pagination>
                  <S.PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ‹
                  </S.PageButton>
                  {getPageNumbers().map((page) => (
                    <S.PageButton key={page} onClick={() => handlePageChange(page)} $active={currentPage === page}>
                      {page}
                    </S.PageButton>
                  ))}
                  <S.PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
