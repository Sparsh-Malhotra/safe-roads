import { INCIDENTS_QUERY_KEY } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchIncidents } from ".";

export function useIncidents() {
  return useQuery({
    queryKey: [INCIDENTS_QUERY_KEY],
    queryFn: fetchIncidents,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}