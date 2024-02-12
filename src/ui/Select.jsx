import styled from 'styled-components';

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
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Error = styled.span`
  font-size: 1.2rem;
  color: var(--color-red-500);
  margin-top: -0.5rem;
`;

const Select = ({ label, options, error, id, ...rest }) => {
    return (
        <SelectWrapper>
            {label && <Label htmlFor={id}>{label}</Label>}
            <StyledSelect id={id} error={error} {...rest}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </StyledSelect>
            {error && <Error>{error}</Error>}
        </SelectWrapper>
    );
};

export default Select;
