import React from "react";
import { styled } from "@mui/system";
import SearchForm from "@/ui/SearchForm.jsx";
import Filter from "@/ui/Filter.jsx";

// StyledDiv 정의
const StyledDiv = styled("div")({
  display: "flex", // Flexbox 레이아웃 사용
  flexDirection: "column", // 항목을 가로로 배치
  alignItems: "", // 항목을 세로 중앙에 배치
  marginBottom: "30px",
});


function Search({categories,groups,onSearch}) {
  return (
    <StyledDiv>
      <SearchForm  categories={categories}  groups={groups} onSearch={onSearch}/> {/* 절반 크기로 설정 */}
{/*
      <Filter style={{ flex: 1 }} />  절반 크기로 설정
*/}
    </StyledDiv>
  );
}

export default Search;
