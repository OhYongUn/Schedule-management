import supabase from "./supabase";

 export async function fetchGroups() {
    const { data, error } = await supabase
        .from('group')
        .select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function fetchCategories() {
    const { data, error } = await supabase
        .from('category')
        .select('*');

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
