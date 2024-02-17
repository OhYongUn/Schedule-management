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
import { useEffect, useState } from "react";
import { useGroup } from "@/features/group/useGroup.js";
import { useCategory } from "@/features/category/useCategory.js";
import { useCreateSchedule } from "@/features/schedule/useCreateSchedule.js";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

function CreateScheduleForm({ selectedDate, closeModal }) {
  // 커스텀 훅을 사용하여 카테고리와 그룹 데이터를 불러옵니다.
  const { categories, isLoadingCategories } = useCategory();
  const { groups, isLoadingGroups } = useGroup();

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState,
    getValues,
  } = useForm();
  const { errors } = formState;

  const { isCreating, createSchedule } = useCreateSchedule();
  const isWorking = isCreating;

  useEffect(() => {
    setValue("startDate", selectedDate);
  }, [selectedDate, setValue]);
  const onSubmit = (data) => {
    console.log("Form data:", data);
      const image = typeof data.image === "string" ? data.image : data.image[0];

      const { group_id, category_id, ...details } = getValues();
    const eventData = {
      group_id,
      category_id,
      details: JSON.stringify(details),
    };
    createSchedule(
      { ...eventData,image },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
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
      {isLoadingGroups ? (
        <div>Loading categories...</div>
      ) : (
        <FormRow label="그룹">
          <Select
            disabled={isWorking}
            {...register("group_id")}
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
            disabled={isWorking}
            {...register("category_id")}
            options={categories.map((category) => ({
              label: category.name,
              value: category.category_id,
              key: category.category_id,
            }))}
          />
        </FormRow>
      )}
      <FormRow label="제목" error={errors?.eventName?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="title"
          {...register("title", { required: "이벤트 이름이 필요합니다." })}
        />
      </FormRow>
      <FormRow label="금액" error={errors?.eventName?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="amount"
          {...register("amount", { required: "금액이 필요합니다." })}
        />
      </FormRow>
      <FormRowWithDatePicker
        label="시작 날짜"
        error={errors.startDate?.message}
      >
        <Controller
          disabled={isWorking}
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
          render={({ field }) => (
            <StyledDatePicker
              disabled={isWorking}
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy/MM/dd"
            />
          )}
        />
      </FormRowWithDatePicker>
      <FormRow label="설명">
        <Textarea
          disabled={isWorking}
          id="description"
          {...register("description")}
        />
      </FormRow>
      <FormRow label="색상">
        <div>
          <Input
            disabled={isWorking}
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
              <ChromePicker
                disabled={isWorking}
                color={selectedColor}
                onChange={handleChange}
              />
            </div>
          ) : null}
        </div>
      </FormRow>

      <FormRow label="영수증 또는 이미지">
        <FileInput
          disabled={isWorking}
          id="image"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={isWorking}>
          생성
        </Button>
        <Button type="button" onClick={closeModal} disabled={isWorking}>
          취소
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateScheduleForm;
