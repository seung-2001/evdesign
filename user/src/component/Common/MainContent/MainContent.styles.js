import styled, { keyframes } from "styled-components";

// Fade in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Slide animations
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

// Wrapper
export const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #ffffffff, #dbeafe);
`;

// Container
export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
`;

// Grid
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
`;

// Image Section
export const ImageSection = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
  background: linear-gradient(to bottom right, #1e293b, #334155);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (min-width: 1024px) {
    grid-column: 1 / -1;
    height: 500px;
  }
`;

// Carousel Container
export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// Carousel Slide
export const CarouselSlide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 0.8s ease-in-out;
  animation: ${props => props.$active ? fadeIn : 'none'} 0.8s ease-in-out;
  z-index: ${props => props.$active ? 1 : 0};
`;

// Car Image
export const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

// Carousel Navigation
export const CarouselNav = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 10;
`;

// Navigation Button
export const NavButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #1f2937;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Carousel Dots
export const CarouselDots = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 10;
`;

// Dot
export const Dot = styled.button`
  width: ${props => props.$active ? '2.5rem' : '0.75rem'};
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }
`;

// Content Section
export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// Badge
export const Badge = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  border-radius: 9999px;
`;

// Badge Text
export const BadgeText = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

// Title
export const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(to right, #1e293b, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

// Subtitle
export const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// Subtitle Text
export const SubtitleText = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #4b5563;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

// Button
export const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #111;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;



export const AppleSection = styled.div`
  margin-top: 2rem;
`;

export const AppleTitle = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
  color: #111;
`;

export const AppleCard = styled.div`
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(22px);
  border-radius: 18px;
  border: 1px solid rgba(230, 230, 230, 0.8);
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.95);
    border-color: #dcdcdc;
  }
`;

export const AppleCardTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
`;

export const AppleCardMeta = styled.div`
  margin-top: 6px;
  color: #666;
  font-size: 0.9rem;
`;
