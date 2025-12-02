import { showToast } from "@/lib/showToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDeleteMutation = (QueryKey, DeleteEndpoint) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, deleteType }) => {
            const { data: response } = await axios({
                url: DeleteEndpoint,
                method: deleteType === "PD" ? "DELETE" : "PUT",
                data: { id, deleteType }
            })
            if (!response.success) {
                throw new Error(response.message || "Something went wrong")
            }
            return response;
        },
        onSuccess: (data) => {
            showToast("success", data.message || "Deleted successfully");
            queryClient.invalidateQueries({ queryKey: [QueryKey] });
        },
        onError: (error) => {
            showToast("error", error.message || "Something went wrong");

        }
    })

}

export default useDeleteMutation
