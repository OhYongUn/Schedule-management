import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditSchedule } from "@/services/apiSchedule.js";

export function useCreateSchedule(){
    const queryClient = useQueryClient();
    const { mutate: createSchedule, isLoading: isCreating } = useMutation({
        mutationFn:createEditSchedule,
        onSuccess:()=>{
            toast.success("스케쥴이 생성되엇습니다")
            queryClient.invalidateQueries({ queryKey: ["schedules"] });
        },
        onError:(err)=>toast.error(err.message),

    });
    return{createSchedule,isCreating};
}
