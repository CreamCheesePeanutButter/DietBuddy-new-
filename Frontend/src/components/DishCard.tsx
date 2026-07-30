import type { Dish } from "../types/Dish";
import { AxiosImage } from "../api/axiosImage";
import { useNavigate } from "react-router-dom";

interface Props {
    dish: Dish;
}

export default function DishCard({ dish }: Props) {
    const navigate = useNavigate();

    return (
        <div
            className="cursor-pointer group"
            onClick={() => navigate(`/dishes/${dish.id}`)}
        >
            <div
                className="
                    h-56
                    w-full
                    overflow-hidden
                    rounded-2xl
                    bg-gray-200
                    shadow
                "
            >
                <AxiosImage
                    dishId={dish.id}
                    alt={dish.name}
                    className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />
            </div>

            <div className="flex gap-3 mt-4">
                <div
                    className="
                        w-10
                        h-10
                        rounded-full
                        bg-green-600
                        text-white
                        flex
                        items-center
                        justify-center
                        font-bold
                        shrink-0
                    "
                >
                    {dish.name[0]}
                </div>

                <div>
                    <h2 className="font-semibold line-clamp-2">
                        {dish.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        DietBuddy Kitchen
                    </p>

                    <p className="text-sm text-gray-500">
                        {dish.viewCount} views
                    </p>

                    <p className="text-sm text-gray-500">
                        {dish.calories} kcal
                    </p>
                </div>
            </div>
        </div>
    );
}