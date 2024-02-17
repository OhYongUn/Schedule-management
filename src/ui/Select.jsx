import styled from 'styled-components';
import React, { forwardRef } from 'react';

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid ${props => props.error ? 'var(--color-red-500)' : (props.type === "white" ? 'var(--color-grey-100)' : 'var(--color-grey-300)')};
    border-radius: var(--border-radius-sm);
    background-color: ${props => props.type === "white" ? 'var(--color-white)' : 'var(--color-grey-0)'};
    font-weight: 500;
    box-shadow: var(--shadow-sm);
    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Select = forwardRef(({ options, ...rest }, ref) => {
    return (
        <SelectWrapper>
            <StyledSelect ref={ref} {...rest}>
                {options.map((option, index) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </StyledSelect>
        </SelectWrapper>
    );
});


export default Select;
