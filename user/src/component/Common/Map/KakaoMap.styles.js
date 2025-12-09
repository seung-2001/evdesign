import styled from "styled-components";

export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: ${props => props.$minHeight || '500px'};
  border-radius: ${props => props.$borderRadius || '12px'};
  overflow: hidden;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${props => props.$minHeight || '500px'};
  background-color: #e5e7eb;
`;

export const MapOptions = styled.div`
  position: absolute;
  top: 1rem;
  right: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.75rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
`;

export const OptionLabel = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  color: #6b7280;
  text-align: center;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 0.25rem;
`;

export const OptionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  background: ${(props) => (props.$active ? "#2563eb" : "#f3f4f6")};
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => (props.$active ? "#ffffff" : "#374151")};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${(props) => (props.$active ? "#1d4ed8" : "#e5e7eb")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MarkerList = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 1rem;
  z-index: 10;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.9));

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
`;

export const MarkerListItem = styled.div`
  background: ${(props) => (props.$selected ? "#dbeafe" : "#ffffff")};
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid ${(props) => (props.$selected ? "#2563eb" : "transparent")};
  transition: all 0.2s;

  &:hover {
    background: #eff6ff;
  }
`;

export const RadiusFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 0.25rem;
`;

export const RadiusLabel = styled.div`
  font-size: 0.65rem;
  color: #9ca3af;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const RadiusSelect = styled.select`
  background: #f3f4f6;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
  border: none;
  cursor: pointer;
  outline: none;
  text-align: center;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-right: 1.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FilterInfo = styled.div`
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.3;
`;

