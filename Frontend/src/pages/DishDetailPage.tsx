import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { AxiosImage } from "../api/axiosImage";
import RelatedDish from "../components/RelatedDish";

export default function DishDetailsPage() {
    const { id } = useParams();

    const [dish, setDish] = useState<any>();
    const [related, setRelated] = useState([]);

    useEffect(() => {
        api.get(`/dishes/${id}`).then((res) => {
            setDish(res.data);
        });

        api.get("/dishes/top-dishes").then((res) => {
            setRelated(res.data);
        });
    }, [id]);

    if (!dish) return <div>Loading...</div>;

    return (
        <div className="p-8">
            <div className="grid grid-cols-12 gap-10">

                <div className="col-span-8">

                    <div className="aspect-video rounded-3xl overflow-hidden">
                        <AxiosImage
                            dishId={dish.id}
                            alt={dish.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h1 className="text-4xl font-bold mt-5">
                        {dish.name}
                    </h1>

                    <div className="flex gap-6 mt-3">
                        <p>{dish.viewCount} views</p>
                        <p>{dish.calories} kcal</p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-5 mt-5">
                        {dish.description}
                    </div>

                    <h2 className="font-bold text-2xl mt-8">
                        Ingredients
                    </h2>

                    <ul className="list-disc ml-6 mt-3">
                        {dish.ingredients.map((x: any) => (
                            <li key={x.id}>
                                {x.name} - {x.amount}{" "}
                                {x.measurementUnit}
                            </li>
                        ))}
                    </ul>

                    <h2 className="font-bold text-2xl mt-8">
                        Instructions
                    </h2>

                    <p className="whitespace-pre-line mt-4">
                        {dish.instruction}
                    </p>
                </div>

                <div className="col-span-4 space-y-5">
                    {related.map((x: any) => (
                        <RelatedDish
                            key={x.id}
                            dish={x}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}