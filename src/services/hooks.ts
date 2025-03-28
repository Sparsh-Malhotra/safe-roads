import { INCIDENTS_QUERY_KEY, USER_COINS_KEY, USER_INCIDENTS_QUERY_KEY } from "@/constants/query-keys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchIncidents, userLogin, submitIncident, fetchIncidentsByUser, fetchRoutes, fetchCoins } from ".";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function useIncidents(lat,lng) {
    return useQuery({
        queryKey: [INCIDENTS_QUERY_KEY,lat, lng],
        enabled: !!lat && !!lng,
        queryFn: () => fetchIncidents(lat,lng)
    });
}

export function useIncidentsByUser() {
    return useQuery({
        queryKey: [USER_INCIDENTS_QUERY_KEY],
        queryFn: fetchIncidentsByUser,
        staleTime: 30 * 1000, // 30 seconds
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useLogin(redirectTo?: string) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: Record<any, any>) => userLogin(credentials),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });

            queryClient.setQueryData(["user"], data.data.user);

            toast.success(data.message || "Login successful");

            if (redirectTo) {
                navigate(redirectTo);
            }
        },
        onError: (error: Error) => {
            toast.error(error.message || "Login failed");
        },
    });
}

export function useSubmitIncident() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData:FormData) => submitIncident(formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [USER_COINS_KEY] });
            toast.success(data.message || "Issue submit successful");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to submit issue, try again later ");
        },
    });
}

export const useRoutes = () => {
    return useMutation({
      mutationFn: ({
        startLat,
        startLng,
        endLat,
        endLng
      }: {
        startLat: number;
        startLng: number;
        endLat: number;
        endLng: number;
      }) => fetchRoutes(startLat, startLng, endLat, endLng),
    });
};
  
export function useUserCoins() {
    const queryClient = useQueryClient();
    
    const coinsQuery = useQuery({
        queryKey: [USER_COINS_KEY],
        queryFn: fetchCoins,
    });
    
    // Function to refetch coins data
    const refetchCoins = () => {
        return queryClient.invalidateQueries({ queryKey: [USER_COINS_KEY] });
    };
    
    return {
        ...coinsQuery,
        refetchCoins
    };
}
