import React from 'react';
import styled from 'styled-components';
import FilterSection from '../FilterSection/FilterSection';
import DataTable from '../DataTable/DataTable';

const StyledMainContent = styled.main`
  margin-left: 250px;
  padding: 2rem;
  min-height: calc(100vh - 70px);
  background-color: #f9fafb;
`;

const MainTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 2rem;
`;

const Dashboard = () => {
  return (
    <StyledMainContent>
      <MainTitle>Evision Information</MainTitle>
      <FilterSection />
      <DataTable />
    </StyledMainContent>
  );
};

export default Dashboard;

