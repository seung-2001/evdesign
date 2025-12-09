<<<<<<< HEAD
// MemberManage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MemberManage.styles";

const MemberManage = () => {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(null); // 현재 로그인한 사용자의 role
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const itemsPerPage = 10;

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMembers(currentPage);
        }
    }, [currentPage, isAuthenticated]);

    const checkAuth = () => {
        // 실제 구현시:
        // const token = localStorage.getItem('token');
        // const response = await fetch('/api/auth/check', { headers: { Authorization: `Bearer ${token}` }});
        // const data = await response.json();

        // 샘플: 로그인 체크 및 권한 확인
        const userRole = "Admin"; // 또는 'Operator', 'User', null
        const loggedIn = true; // 로그인 여부

        if (!loggedIn || !userRole) {
            alert("로그인이 필요합니다.");
            // navigate('/login');
            return;
        }

        if (userRole !== "Admin" && userRole !== "Operator") {
            alert("접근 권한이 없습니다.");
            // navigate('/');
            return;
        }

        setCurrentUserRole(userRole);
        setIsAuthenticated(true);
    };

    const fetchMembers = async (page) => {
        setLoading(true);
        // 실제 구현시:
        // const response = await fetch(`/api/members?page=${page}&size=${itemsPerPage}`);
        // const data = await response.json();

        // 샘플 데이터
        setTimeout(() => {
            const sampleData = Array.from({ length: 100 }, (_, i) => ({
                memberNo: i + 1,
                memberId: `user${i + 1}`,
                memberName: `홍길동${i + 1}`,
                enroleDate: new Date(
                    2024,
                    Math.floor(Math.random() * 12),
                    Math.floor(Math.random() * 28) + 1
                )
                    .toISOString()
                    .split("T")[0],
                role: ["User", "Admin", "Operator"][
                    Math.floor(Math.random() * 3)
                ],
                status: Math.random() > 0.5 ? "Y" : "N",
            }));

            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setMembers(sampleData.slice(start, end));
            setTotalPages(Math.ceil(sampleData.length / itemsPerPage));
            setLoading(false);
        }, 300);
    };

    const handleAssignOperator = async (member) => {
        // Admin만 관리자 지정 가능
        if (currentUserRole !== "Admin") {
            alert("관리자 지정은 Admin만 가능합니다.");
            return;
        }

        // 이미 Operator나 Admin인 경우
        if (member.role === "Operator" || member.role === "Admin") {
            alert("이미 관리자 권한을 가진 회원입니다.");
            return;
        }

        if (
            window.confirm(
                `${member.memberName}(${member.memberId})님을 관리자(Operator)로 지정하시겠습니까?`
            )
        ) {
            // 실제 구현시:
            // await fetch(`/api/members/${member.memberNo}/role`, {
            //   method: 'PATCH',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ role: 'Operator' })
            // });
            // fetchMembers(currentPage);

            alert("관리자로 지정되었습니다.");
            fetchMembers(currentPage);
        }
    };

    const handleDeleteMember = async (member) => {
        // Operator는 Admin을 삭제할 수 없음
        if (currentUserRole === "Operator" && member.role === "Admin") {
            alert("Operator는 Admin 회원을 탈퇴시킬 수 없습니다.");
            return;
        }

        // Admin도 다른 Admin을 삭제할 수 없음 (본인 계정 보호)
        if (member.role === "Admin") {
            alert("Admin 계정은 탈퇴시킬 수 없습니다.");
            return;
        }

        if (
            window.confirm(
                `${member.memberName}(${member.memberId}) 회원을 탈퇴시키겠습니까?`
            )
        ) {
            // 실제 구현시:
            // await fetch(`/api/members/${member.memberNo}`, { method: 'DELETE' });
            // fetchMembers(currentPage);

            alert("회원 탈퇴가 완료되었습니다.");
            fetchMembers(currentPage);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const canAssignOperator = (member) => {
        // Admin만 관리자 지정 가능하고, User만 지정 가능
        return currentUserRole === "Admin" && member.role === "User";
    };

    const canDeleteMember = (member) => {
        // Admin 계정은 삭제 불가
        if (member.role === "Admin") {
            return false;
        }
        // Operator는 Admin을 삭제할 수 없음
        if (currentUserRole === "Operator" && member.role === "Admin") {
            return false;
        }
        return true;
    };

    if (!isAuthenticated) {
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

=======
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { useSearch } from '../../../context/SearchContext';
import axios from 'axios';
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
  }, [filteredMembers]);

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
      const res = await axios.get('http://localhost:8081/member/operator/member-manage', {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setMembers(data);
    } catch (err) {
      console.error(err);
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
        await axios.put(
          `http://localhost:8081/member/admin/change-role/${member.memberNo}`,
          { newRole: 'ROLE_OPERATOR',
            currentRole: member.roleStatus,
            status: member.status
           },
          { headers: { Authorization: `Bearer ${auth.accessToken}` } }
        );
        alert('관리자로 지정되었습니다.');
        fetchMembers();
      } catch (err) {
        alert(err.response?.data || '관리자 지정에 실패했습니다.');
        
      }
    }
  };

  const handleDeleteMember = async (member) => {
    if (window.confirm(`${member.memberName}(${member.memberId}) 회원을 탈퇴시키겠습니까?`)) {
      try {
        await axios.delete(`http://localhost:8081/member/operator/member-manage/${member.memberNo}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        alert('회원 탈퇴가 완료되었습니다.');
        fetchMembers();
      } catch (err) {
        console.error(err);
        alert(err.response.data["error-message"] || '회원탈퇴에 실패했습니다.');
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
>>>>>>> 78e555127784a4dd4909fa25192ba1e472c49c61
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
                                        <S.TableHeader>
                                            memberName
                                        </S.TableHeader>
                                        <S.TableHeader>
                                            enroleDate
                                        </S.TableHeader>
                                        <S.TableHeader>role</S.TableHeader>
                                        <S.TableHeader>status</S.TableHeader>
                                        <S.TableHeader>액션</S.TableHeader>
                                    </S.TableRow>
                                </S.TableHead>
                                <S.TableBody>
                                    {members.map((member) => (
                                        <S.TableRow key={member.memberNo}>
                                            <S.TableCell>
                                                {member.memberNo}
                                            </S.TableCell>
                                            <S.TableCell>
                                                {member.memberId}
                                            </S.TableCell>
                                            <S.TableCell>
                                                {member.memberName}
                                            </S.TableCell>
                                            <S.TableCell $secondary>
                                                {member.enroleDate}
                                            </S.TableCell>
                                            <S.TableCell>
                                                <S.Badge
                                                    $variant={member.role.toLowerCase()}
                                                >
                                                    {member.role}
                                                </S.Badge>
                                            </S.TableCell>
                                            <S.TableCell>
                                                <S.Badge
                                                    $variant={
                                                        member.status === "Y"
                                                            ? "active"
                                                            : "inactive"
                                                    }
                                                >
                                                    {member.status === "Y"
                                                        ? "활성"
                                                        : "비활성"}
                                                </S.Badge>
                                            </S.TableCell>
                                            <S.TableCell>
                                                <S.ButtonGroup>
                                                    {currentUserRole ===
                                                        "Admin" && (
                                                        <S.AssignButton
                                                            onClick={() =>
                                                                handleAssignOperator(
                                                                    member
                                                                )
                                                            }
                                                            disabled={
                                                                !canAssignOperator(
                                                                    member
                                                                )
                                                            }
                                                            $canAssign={canAssignOperator(
                                                                member
                                                            )}
                                                        >
                                                            관리자지정
                                                        </S.AssignButton>
                                                    )}
                                                    <S.DeleteButton
                                                        onClick={() =>
                                                            handleDeleteMember(
                                                                member
                                                            )
                                                        }
                                                        disabled={
                                                            !canDeleteMember(
                                                                member
                                                            )
                                                        }
                                                        $canDelete={canDeleteMember(
                                                            member
                                                        )}
                                                    >
                                                        회원탈퇴
                                                    </S.DeleteButton>
                                                </S.ButtonGroup>
                                            </S.TableCell>
                                        </S.TableRow>
                                    ))}
                                </S.TableBody>
                            </S.Table>

                            <S.PaginationWrapper>
                                <S.PaginationInfo>
                                    전체{" "}
                                    <S.InfoNumber>
                                        {totalPages * itemsPerPage}
                                    </S.InfoNumber>
                                    개 중{" "}
                                    <S.InfoNumber>
                                        {(currentPage - 1) * itemsPerPage + 1}
                                    </S.InfoNumber>
                                    -
                                    <S.InfoNumber>
                                        {Math.min(
                                            currentPage * itemsPerPage,
                                            totalPages * itemsPerPage
                                        )}
                                    </S.InfoNumber>{" "}
                                    표시
                                </S.PaginationInfo>
                                <S.Pagination>
                                    <S.PageButton
                                        onClick={() =>
                                            handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        ‹
                                    </S.PageButton>
                                    {getPageNumbers().map((page) => (
                                        <S.PageButton
                                            key={page}
                                            onClick={() =>
                                                handlePageChange(page)
                                            }
                                            $active={currentPage === page}
                                        >
                                            {page}
                                        </S.PageButton>
                                    ))}
                                    <S.PageButton
                                        onClick={() =>
                                            handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
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
<<<<<<< HEAD
=======
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
              <S.PaginationInfo>
                전체 <S.InfoNumber>{filteredMembers.length}</S.InfoNumber>개 중{' '}
                <S.InfoNumber>{filteredMembers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</S.InfoNumber>-
                <S.InfoNumber>{Math.min(currentPage * itemsPerPage, filteredMembers.length)}</S.InfoNumber> 표시
              </S.PaginationInfo>

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
                          <S.Badge $variant={member.roleStatus?.toLowerCase() || 'user'}>
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
                            {auth.role.includes('ADMIN') && (
                              <S.AssignButton $canAssign={member.roleStatus == 'ROLE_USER'} 
                                              disabled={member.roleStatus !=='ROLE_USER'}
                                              onClick={() => handleAssignOperator(member)}>
                                관리자지정
                              </S.AssignButton>
                            )}
                            <S.DeleteButton $canDelete={member.status == 'Y'} 
                                            disabled={member.status == 'N'}
                                            onClick={() => handleDeleteMember(member)}>회원탈퇴</S.DeleteButton>
                          </S.ButtonGroup>
                        </S.TableCell>
                      </S.TableRow>
                    ))
                  )}
                </S.TableBody>
              </S.Table>

              <S.PaginationWrapper>
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
              </S.PaginationWrapper>
            </>
          )}
        </S.TableWrapper>
      </S.ContentWrapper>
    </S.Container>
  );
>>>>>>> 78e555127784a4dd4909fa25192ba1e472c49c61
};

export default MemberManage;
