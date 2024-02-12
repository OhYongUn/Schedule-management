import { useForm, Controller } from "react-hook-form";

import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import Textarea from "@/ui/Textarea";
import FileInput from "@/ui/FileInput";
import Select from "@/ui/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormRowWithDatePicker from "@/ui/FormRowWithDatePicker";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { useState } from "react";
import { useGroup } from "@/features/group/useGroup.js";
import { useCategory } from "@/features/category/useCategory.js";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

function CreateScheduleForm({ selectedDate, closeModal }) {
  // 커스텀 훅을 사용하여 카테고리와 그룹 데이터를 불러옵니다.
  const { categories, isLoadingCategories, categoriesError } = useCategory();
  const { groups, isLoadingGroups, groupsError } = useGroup();
  console.log("categories", categories);
  console.log("groups", groups);

  const { register, handleSubmit, control, setValue, formState } = useForm();
  const { errors } = formState;
  const onSubmit = (data) => {
    console.log("Form data:", data);
    // 여기에 데이터를 서버로 보내는 로직 추가
    closeModal();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("receipt", file);
    setValue("receipt", file);
  };
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const handleColorClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleColorClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor) => {
    setSelectedColor(newColor.hex);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormRow label="제목" error={errors?.eventName?.message}>
        <Input
          type="text"
          id="title"
          {...register("title", { required: "이벤트 이름이 필요합니다." })}
        />
      </FormRow>

      {isLoadingGroups ? (
        <div>Loading categories...</div>
      ) : (
        <FormRow label="그룹">
          <Select
            {...register("groupId")}
            options={groups?.map((group) => ({
              label: group.name,
              value: group.group_id,
              key: group.group_id, // index를 사용하여 고유한 key 생성
            }))}
          />
        </FormRow>
      )}
      {isLoadingCategories ? (
        <div>Loading categories...</div>
      ) : (
        <FormRow label="카테고리">
          <Select
            {...register("categoryId")}
            options={categories.map((category) => ({
              label: category.name,
              value: category.category_id,
              key: category.category_id,
            }))}
          />
        </FormRow>
      )}

      <FormRowWithDatePicker
        label="시작 날짜"
        error={errors.startDate?.message}
      >
        <Controller
          name="startDate"
          control={control}
          rules={{ required: "시작 날짜가 필요합니다." }}
          render={({ field }) => (
            <StyledDatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy/MM/dd"
            />
          )}
        />
      </FormRowWithDatePicker>

      <FormRowWithDatePicker label="종료 날짜" error={errors.endDate?.message}>
        <Controller
          name="endDate"
          control={control}
          rules={{ required: "종료 날짜가 필요합니다." }}
          render={({ field }) => (
            <StyledDatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy/MM/dd"
            />
          )}
        />
      </FormRowWithDatePicker>

      <FormRow label="설명" error={errors?.description?.message}>
        <Textarea
          id="description"
          {...register("description", { required: "설명이 필요합니다." })}
        />
      </FormRow>

      <FormRow label="색상">
        <div>
          <Input
            type="text"
            id="color"
            {...register("color")}
            onClick={handleColorClick}
            value={selectedColor}
          />
          {displayColorPicker ? (
            <div style={{ position: "absolute", zIndex: "2" }}>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
                onClick={handleColorClose}
              />
              <ChromePicker color={selectedColor} onChange={handleChange} />
            </div>
          ) : null}
        </div>
      </FormRow>

      <FormRow label="영수증 또는 이미지">
        <FileInput id="receipt" accept="image/*" onChange={handleFileChange} />
      </FormRow>

      <FormRow>
        <Button type="submit">생성</Button>
        <Button type="button" onClick={closeModal}>
          취소
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateScheduleForm;
