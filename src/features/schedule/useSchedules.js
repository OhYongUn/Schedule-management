import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "@/services/apiSchedule.js";

export function useSchedules(searchParams) {
    const { isLoading, data: schedules } = useQuery(
        ["schedules", searchParams],
        () => getSchedules(searchParams),
        {
            keepPreviousData: true, // 이전 데이터를 유지하여 빠른 전환을 가능하게 합니다.
            staleTime: 60 * 1000, // 1분 동안 데이터를 신선하게 유지합니다.
            cacheTime: 5 * 60 * 1000, // 15분 동안 비활성화된 쿼리 데이터를 캐시에 유지합니다.
            refetchOnWindowFocus: false, // 창에 포커스가 돌아왔을 때 자동으로 데이터를 다시 가져오지 않습니다.
        },
    );

    return { isLoading, schedules };
}
