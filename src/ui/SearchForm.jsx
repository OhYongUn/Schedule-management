import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  gap: 10px;
`;

const StyledFormControl = styled(FormControl)`
  width: 100px;
`;

const StyledTextField = styled(TextField)`
  width: 200px;
`;

const StyledButton = styled(Button)`
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  width: 100px;
  height: 45px;
`;

const SearchForm = ({ categories, groups,onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log("data1111->>>", data);
    onSearch(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexContainer>
        <StyledFormControl>
          <InputLabel id="category-select-label">카테고리</InputLabel>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="category-select-label"
                label="카테고리"
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </StyledFormControl>

        <StyledFormControl>
          <InputLabel id="group-select-label">그룹</InputLabel>
          <Controller
            name="group"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} labelId="group-select-label" label="그룹">
                {groups.map((group) => (
                  <MenuItem key={group.group_id} value={group.group_id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </StyledFormControl>

        <StyledTextField
          variant="outlined"
          label="검색어"
          type="text"
          {...register("title")} // useForm의 register 함수를 사용하여 필드 등록
        />

        <StyledButton
          type="submit" // 버튼 타입을 'submit'으로 변경
          variant="contained"
          color="primary"
        >
          검색
        </StyledButton>
      </FlexContainer>
    </form>
  );
};

export default SearchForm;
