export interface Ingredient {
    id: number;
    name: string;
    amount: number;
    measurementUnit: string;
}

export interface Dish {
    id: number;
    name: string;
    description: string;
    instruction: string;
    calories: number;
    viewCount: number;
    ingredients: Ingredient[];
}