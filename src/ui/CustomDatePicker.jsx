import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

// StyledFormRow와 같은 스타일을 적용할 수 있는 스타일 컴포넌트
const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 100%;
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
  }
`;

const CustomDatePicker = ({ selectedDate, onChange }) => {
    return (
        <DatePickerWrapper>
            <DatePicker
                selected={selectedDate}
                onChange={onChange}
                dateFormat="yyyy/MM/dd"
                wrapperClassName="datePicker"
            />
        </DatePickerWrapper>
    );
};

export default CustomDatePicker;
