import { useEffect, useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import DishCard from "../components/DishCard";

interface Ingredient {
    id: number;
    name: string;
    amount: number;
    measurementUnit: string;
}

interface Dish {
    id: number;
    name: string;
    description: string;
    instruction: string;
    calories: number;
    viewCount: number;
    ingredients: Ingredient[];
}

export default function DishesPage() {
    const [dishes, setDishes] = useState<Dish[]>([]);

    useEffect(() => {
        api.get("/dishes/top-dishes").then((res) => {
            setDishes(res.data);
        });
    }, []);

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />

            <main className="flex-1 p-8">
                <h1 className="text-4xl font-bold mb-10">
                    Popular Dishes
                </h1>

                <div className="grid grid-cols-4 gap-4 p-4">
                    {dishes.map((dish) => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                    />
                    ))}
                </div>
            </main>
        </div>
    );
}