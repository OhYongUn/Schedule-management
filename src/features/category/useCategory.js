import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/apiData";

export function useCategory() {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery(["categories"], fetchCategories);

  return { categories, isLoadingCategories, categoriesError };
}

