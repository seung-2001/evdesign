import styled from "styled-components";

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
`;

export const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
`;

export const MainLayout = styled.div`
  display: flex;
  gap: 1.5rem;
  height: calc(100vh - 250px);
  min-height: 500px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const LeftPanel = styled.div`
  width: 350px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  height: 100%;
  min-height: 500px;
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fce4ec;

  &:focus {
    border-color: #2563eb;
    background-color: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const StationDetailCard = styled.div`
  background: #dbeafe;
  border-radius: 12px;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StationListContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  flex: 1;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
`;

export const StationListItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const StationListInfo = styled.div`
  flex: 1;
`;

export const StationListName = styled.div`
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
`;

export const StationListAddress = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
`;

export const StationListBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  background-color: ${props => props.$fast ? '#dbeafe' : '#f3f4f6'};
  color: ${props => props.$fast ? '#1e40af' : '#374151'};
  margin-left: 0.5rem;
  white-space: nowrap;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 0.5rem;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const StationImage = styled.div`
  width: 100%;
  height: 180px;
  background-color: #bfdbfe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 1rem;
  font-weight: 500;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StationInfoBox = styled.div`
  padding: 1rem;
  background: #dbeafe;
`;

export const StationName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
`;

export const StationAddress = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
`;

export const StationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const TypeBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) => (props.$fast ? "#1e40af" : "#6b7280")};
  color: #ffffff;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${(props) => (props.$available ? "#059669" : "#dc2626")};
  color: #ffffff;
`;

export const ReviewSection = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow-y: auto;
  min-height: 80px;
  max-height: 150px;
`;

export const ReviewItem = styled.div`
  background: #bfdbfe;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #1e3a5f;
`;

export const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

export const ReviewAuthor = styled.span`
  font-weight: 600;
  font-size: 0.75rem;
`;

export const ReviewDate = styled.span`
  font-size: 0.7rem;
  color: #6b7280;
`;

export const ReviewTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0.3rem 0;
`;

export const ReviewContent = styled.p`
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0;
`;

export const ReviewActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const ReviewActionButton = styled.button`
  background: none;
  border: none;
  font-size: 0.7rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #1e40af;
    text-decoration: underline;
  }
`;

export const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem 1rem;
  border-top: 1px solid #93c5fd;
  background: #dbeafe;
  flex-shrink: 0;
`;

export const ReviewTitleInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  font-size: 0.85rem;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 0.5rem;

  &:focus {
    border-color: #2563eb;
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ReviewTextarea = styled.textarea`
  width: 100%;
  min-height: 50px;
  padding: 0.5rem;
  border: 1px solid #93c5fd;
  border-radius: 6px;
  font-size: 0.8rem;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #2563eb;
  }
`;

export const ReviewSubmitButton = styled.button`
  align-self: flex-end;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const NoReviews = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 0.8rem;
  padding: 1rem;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
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

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #dc2626;
  background-color: #fee2e2;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #6b7280;
  font-size: 0.875rem;
  text-align: center;
  padding: 2rem;
`;
