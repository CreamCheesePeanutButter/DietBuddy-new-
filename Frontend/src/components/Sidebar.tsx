export default function Sidebar() {
    const categories = [
        "Home",
        "Trending",
        "Healthy",
        "Fast Food",
        "High Protein",
        "Desserts",
        "Asian",
        "Italian",
    ];

    return (
        <aside className="w-64 shrink-0 border-r p-5">
            <h1 className="text-3xl font-bold mb-8">
                DietBuddy
            </h1>

            <div className="space-y-2">
                {categories.map((x) => (
                    <button
                        key={x}
                        className="
                            w-full
                            text-left
                            p-3
                            rounded-xl
                            hover:bg-gray-100
                        "
                    >
                        {x}
                    </button>
                ))}
            </div>
        </aside>
    );
}