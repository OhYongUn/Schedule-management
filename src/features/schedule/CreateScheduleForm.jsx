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
import { useQueryClient } from "@tanstack/react-query";
import {useEditSchedule} from "@/features/schedule/useEditSchedule.js";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

function CreateScheduleForm({
  isEdit,
  selectedSchedule,
  selectedDate,
  closeModal,
}) {
  // 커스텀 훅을 사용하여 카테고리와 그룹 데이터를 불러옵니다.
  const { categories, isLoadingCategories } = useCategory();
  const { groups, isLoadingGroups } = useGroup();

  useEffect(() => {
    if (!isLoadingCategories && !isLoadingGroups) {
      if (isEdit && selectedSchedule) {
        console.log("selectedSchedule", selectedSchedule);

        // startDate, endDate 데이터 타입 확인
        console.log(
          "startDate type:",
          typeof selectedSchedule.details.startDate,
        );
        console.log("endDate type:", typeof selectedSchedule.details.endDate);

        // 데이터 타입에 맞게 처리
        const parsedStartDate =
          typeof selectedSchedule.details.startDate === "string"
            ? new Date(selectedSchedule.details.startDate)
            : selectedSchedule.details.startDate;
        const parsedEndDate =
          typeof selectedSchedule.details.endDate === "string"
            ? new Date(selectedSchedule.details.endDate)
            : selectedSchedule.details.endDate;
        setValue("startDate", parsedStartDate);
        setValue("endDate", parsedEndDate);
        setValue("title", selectedSchedule.details.title);
        setValue("description", selectedSchedule.details.description);
        setValue("color", selectedSchedule.details.color);
        setValue("amount", selectedSchedule.details.amount);
        setSelectedColor(selectedSchedule.details.color);
        setValue("group_id", selectedSchedule.group_id); // typo 수정
        setValue("category_id", selectedSchedule.category_id);
      } else if (selectedDate) {
        setValue("startDate", selectedDate);
      }
    }
  }, [isEdit]);
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
   const {editSchedule, isEditing}=useEditSchedule()
  const isWorking = isCreating;

  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user"]);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const { group_id, category_id, ...details } = getValues();

    const eventData = {
      group_id,
      category_id,
      user_id: user.id,
      details: JSON.stringify(details),
    };
    if (isEdit) {
      editSchedule({
        id: selectedSchedule.event_id,
        data: { ...eventData, image }
      })
    } else {
      createSchedule(
          { ...eventData, image },
          {
            onSuccess: () => {
              reset();
            },
          },
      );
    }
  };

  const getRandomColor = () => {
    // 16진수 색상 코드에서 가능한 문자열
    const letters = "0123456789ABCDEF";
    let color = "#";
    // 6자리 16진수 색상 코드 생성
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(getRandomColor());

  const handleColorClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleColorClose = () => {
    setDisplayColorPicker(false);
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor.hex);
    setValue("color", newColor.hex);
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
          type="text"
          id="amount"
          {...register("amount", { required: "금액이 필요합니다." })}
        />
      </FormRow>
      <FormRowWithDatePicker
        label="시작 날짜 및 시간"
        error={errors.startDate?.message}
      >
        <Controller
          disabled={isWorking}
          name="startDate"
          control={control}
          rules={{ required: "시작 날짜 및 시간이 필요합니다." }}
          render={({ field }) => (
            <StyledDatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy/MM/dd HH:mm" // 날짜와 시간 포맷
              showTimeSelect // 시간 선택 활성화
              timeFormat="HH:mm" // 시간 포맷
              timeIntervals={30} // 분 선택 간격 (예: 15분 간격)
            />
          )}
        />
      </FormRowWithDatePicker>

      <FormRowWithDatePicker
        label="종료 날짜 및 시간"
        error={errors.endDate?.message}
      >
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <StyledDatePicker
              disabled={isWorking}
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy/MM/dd HH:mm" // 날짜와 시간 포맷
              showTimeSelect // 시간 선택 활성화
              timeFormat="HH:mm" // 시간 포맷
              timeIntervals={30} // 분 선택 간격 (예: 15분 간격)
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
                onChange={handleColorChange}
              />
            </div>
          ) : null}
        </div>
      </FormRow>

      <FormRow label="영수증 또는 이미지">
        <FileInput disabled={isWorking} id="image" {...register("image")} />
      </FormRow>

      <FormRow>
        <Button type="submit" disabled={isWorking}>
          {isEdit ? "수정" : "생성"}
        </Button>
        <Button type="button" onClick={closeModal} disabled={isWorking}>
          취소
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateScheduleForm;
