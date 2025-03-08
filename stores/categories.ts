import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ICategory } from '@/types';

export const useCategoryStore = defineStore('categories', () => {
    const categories = ref<ICategory[]>([]);

    const setCategories = (newCategories: ICategory[]) => {
        categories.value = newCategories;
    };

    return {
        categories,
        setCategories
    };
});