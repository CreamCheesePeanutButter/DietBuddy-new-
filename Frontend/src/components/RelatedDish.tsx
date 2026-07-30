import { AxiosImage } from "../api/axiosImage";
import { useNavigate } from "react-router-dom";

export default function RelatedDish({ dish }: any) {
    const navigate = useNavigate();

    return (
        <div
            className="flex gap-3 cursor-pointer"
            onClick={() => navigate(`/dishes/${dish.id}`)}
        >
            <div className="w-40 aspect-video rounded-xl overflow-hidden">
                <AxiosImage
                    dishId={dish.id}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div>
                <h3 className="font-semibold line-clamp-2">
                    {dish.name}
                </h3>

                <p className="text-sm text-gray-500">
                    {dish.viewCount} views
                </p>

                <p className="text-sm text-gray-500">
                    {dish.calories} kcal
                </p>
            </div>
        </div>
    );
}