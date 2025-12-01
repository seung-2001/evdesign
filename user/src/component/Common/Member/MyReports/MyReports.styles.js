import styled from 'styled-components';

export const PageWrapper = styled.div`
    max-width: 900px;
    margin: 50px auto;
    padding: 40px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h1`
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #1a1a2e;
`;

export const Subtitle = styled.p`
    text-align: center;
    font-size: 14px;
    color: #888;
    margin-bottom: 32px;
`;

export const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
`;

export const FilterButton = styled.button`
    padding: 8px 20px;
    border: 1px solid ${props => props.$active ? '#1a1a2e' : '#ddd'};
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: ${props => props.$active ? '#1a1a2e' : '#fff'};
    color: ${props => props.$active ? '#fff' : '#666'};

    &:hover {
        background-color: ${props => props.$active ? '#2d2d4a' : '#f5f5f5'};
    }
`;

export const ReportList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ReportCard = styled.div`
    padding: 20px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    background-color: #fafafa;
    transition: all 0.2s;

    &:hover {
        border-color: #1a1a2e;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }
`;

export const ReportHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

export const ReportTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
    flex: 1;
`;

export const BadgeContainer = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const TypeBadge = styled.span`
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    background-color: ${props => props.$type === '신고' ? '#fee2e2' : '#dbeafe'};
    color: ${props => props.$type === '신고' ? '#991b1b' : '#1e40af'};
`;

export const StatusBadge = styled.span`
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    background-color: ${props => {
        if (props.$status === 'RESOLVED') return '#d1fae5';
        if (props.$status === 'IN_PROGRESS') return '#fef3c7';
        if (props.$status === 'REJECTED') return '#fecaca';
        return '#e5e7eb';
    }};
    color: ${props => {
        if (props.$status === 'RESOLVED') return '#065f46';
        if (props.$status === 'IN_PROGRESS') return '#92400e';
        if (props.$status === 'REJECTED') return '#dc2626';
        return '#4b5563';
    }};
`;

export const ReportContent = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0 0 12px 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const ReportFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ReportDate = styled.span`
    font-size: 12px;
    color: #999;
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
`;

export const ViewButton = styled.button`
    padding: 6px 14px;
    border: 1px solid #1a1a2e;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    background-color: transparent;
    color: #1a1a2e;
    transition: all 0.2s;

    &:hover {
        background-color: #1a1a2e;
        color: #fff;
    }
`;

export const DeleteButton = styled.button`
    padding: 6px 14px;
    border: 1px solid #dc2626;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    background-color: transparent;
    color: #dc2626;
    transition: all 0.2s;

    &:hover {
        background-color: #dc2626;
        color: #fff;
    }
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #888;
    font-size: 15px;
`;

export const LoadingMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #888;
    font-size: 15px;
`;

// 상세보기 모달
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 32px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
`;

export const ModalTitle = styled.h2`
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    padding: 0;
    line-height: 1;

    &:hover {
        color: #333;
    }
`;

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ModalRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ModalLabel = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
`;

export const ModalValue = styled.span`
    font-size: 15px;
    color: #333;
    line-height: 1.6;
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 20px;
    background-color: #1a1a2e;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #2d2d4a;
    }
`;

