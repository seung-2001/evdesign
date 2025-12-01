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
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 10;
`;

export const OptionLabel = styled.div`
  background: #fef3c7;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #92400e;
  text-align: center;
  border: 1px solid #fbbf24;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
`;

export const OptionButton = styled.button`
  background: ${(props) => (props.$active ? "#fef3c7" : "#ffffff")};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  border: 1px solid ${(props) => (props.$active ? "#fbbf24" : "#e5e7eb")};
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  white-space: nowrap;

  &:hover {
    background: #fef3c7;
    border-color: #fbbf24;
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

