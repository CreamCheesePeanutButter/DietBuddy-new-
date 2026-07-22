import { AxiosImage } from "../api/axiosImage";
import api from "../api/api";
import { useEffect, useState } from "react";
interface Ingredient {
  id: number;
  name: string;
  description: string;
  amount: number;
  measurementUnit: string;
  calories: number;
}

interface Dish {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  instruction: string;
  calories: number;
  ingredients: Ingredient[];
  viewCount: number;
}

export function DishesPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    api
      .get("/dishes/top-dishes")
      .then((response) => setDishes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div></div>
    // <div className="grid grid-cols-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //   {dishes.map((dish) => (
    //     <div key={dish.id} className="bg-white rounded-xl shadow-lg p-5 w-80">
    //       <h2 className="text-xl font-bold mb-2">{dish.name}</h2>
    //       <AxiosImage
    //         dishId={dish.id} // Passes the loop's dish.id to the fetch configuration
    //         alt={dish.name}
    //         className="w-full h-48 object-cover rounded-lg mb-3"
    //       />
    //       <p className="text-gray-600 mb-3">{dish.description}</p>

    //       <p>
    //         <strong>Calories:</strong> {dish.calories}
    //       </p>

    //       <p>
    //         <strong>Views:</strong> {dish.viewCount}
    //       </p>

    //       <p>
    //         <strong>Ingredients:</strong> {dish.ingredients.length}
    //       </p>

    //       <div className="mt-4">
    //         <h3 className="font-semibold mb-2">Ingredients</h3>

    //         <ul className="list-disc ml-5 text-sm">
    //           {dish.ingredients.map((ingredient) => (
    //             <li key={ingredient.id}>
    //               {ingredient.name} - {ingredient.amount}{" "}
    //               {ingredient.measurementUnit}
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       <div className="mt-4">
    //         <h3 className="font-semibold">Instructions</h3>

    //         <p className="text-sm text-gray-700 mt-1">{dish.instruction}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}
