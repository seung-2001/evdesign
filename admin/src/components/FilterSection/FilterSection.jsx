import React from 'react';
import styled from 'styled-components';

const FilterSectionContainer = styled.div`
  margin-bottom: 2rem;
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const FilterInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #2563eb;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const FilterSection = () => {
  return (
    <FilterSectionContainer>
      <FilterRow>
        <FilterItem>
          <FilterLabel>Customer</FilterLabel>
          <FilterInput
            type="text"
            placeholder="Enter Costumer Name"
          />
        </FilterItem>
        <FilterItem>
          <FilterLabel>Invoice ID</FilterLabel>
          <FilterInput
            type="text"
            placeholder="Enter Invoice ID"
          />
        </FilterItem>
      </FilterRow>
      <FilterRow>
        <FilterItem>
          <FilterLabel>Start Date</FilterLabel>
          <FilterInput
            type="date"
            placeholder="Start Date"
          />
        </FilterItem>
        <FilterItem>
          <FilterLabel>End Date</FilterLabel>
          <FilterInput
            type="date"
            placeholder="End Date"
          />
        </FilterItem>
      </FilterRow>
    </FilterSectionContainer>
  );
};

export default FilterSection;
