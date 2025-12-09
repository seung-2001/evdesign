import styled from "styled-components";

export const StyledHeader = styled.header`
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  border-radius: 20px;

  

`;

export const Nav = styled.nav`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 2rem; 
  transition: none;  /* hover 시 변경 없게 */

  /* 기존 hover 패딩 제거 */
  /* ${StyledHeader}:hover & {
       padding: 1rem 2rem;
     } */
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }
`;

export const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MenuItem = styled.li`
  position: relative;
  padding-bottom: 0.5rem; /* hover 유지 안정화 */
`;

export const MenuButton = styled.button`
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  border-radius: 8px;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #000000ff, #000000ff);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #3a3a3aff;
    background: rgba(99, 102, 241, 0.1);
    
    &::before {
      width: 80%;
    }
  }

  ${MenuItem}:hover & {
    color: #b3b3b3ff;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.3rem); /* 더 가까이 붙여서 hover 끊김 방지 */
  left: 50%;
  transform: translateX(-50%) translateY(0);
  width: 14rem;

  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: black;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease; 

  padding: 0.5rem 0;
  margin: 0;

  /* 메뉴가 자연스럽게 안 사라지도록 hover 유지 */
  ${MenuItem}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const DropdownItem = styled.li`
  display: block;
  padding: 0;
  margin: 0;
  
  a {
    display: block;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    color: #374151;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(180deg, #b3b3b3ff, #b3b3b3ff);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    &:hover {
      background: linear-gradient(90deg, rgba(79, 70, 229, 0.1) 0%, transparent 100%);
      color: #b3b3b3ff;
      padding-left: 2rem;

      &::before {
        transform: translateX(0);
      }
    }
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    &::before {
      width: 300px;
      height: 300px;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;