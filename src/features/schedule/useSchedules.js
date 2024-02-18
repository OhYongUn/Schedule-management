import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "@/services/apiSchedule.js";

export function useSchedules() {
  const { isLoading, data: schedules } = useQuery(["schedules"], getSchedules);
  return { isLoading, schedules };
}
