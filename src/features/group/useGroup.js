import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "@/services/apiData"; // fetchGroups 함수의 정의가 필요

export function useGroup() {
    const {
        data: groups,
        isLoading: isLoadingGroups,
        error: groupsError,
    } = useQuery(["groups"], fetchGroups);

    return { groups, isLoadingGroups, groupsError };
}
