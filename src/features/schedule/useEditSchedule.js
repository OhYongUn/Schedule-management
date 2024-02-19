import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditSchedule} from "@/services/apiSchedule.js";
import {toast} from "react-hot-toast";

export function useEditSchedule() {
    const queryClient = useQueryClient();
    const { mutate: editSchedule, isLoading: isEditing } = useMutation({
        mutationFn: (scheduleWithId) => createEditSchedule(scheduleWithId.data, scheduleWithId.id),
        onSuccess: () => {
            toast.success("스케줄이 수정되었습니다.");
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError: (err) => toast.error(err.message),
    });
    return { editSchedule, isEditing };
}