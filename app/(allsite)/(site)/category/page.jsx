const Category = () => {


    const categories = [
        {
            title: "Momento Play Deck",
            description: "Classic playing cards with personalized faces and themes",
            image: "https://i0.wp.com/momentocardgames.com/wp-content/uploads/2025/06/traditional-deck-group.png?w=800&ssl=1",
            href: "/",
        },
        {
            title: "Momento Game Deck",
            description: "Tailor-made for unique gameplay, strategy, and storytelling",
            image: "https://i0.wp.com/momentocardgames.com/wp-content/uploads/2025/06/game-deck-group-1.png?w=800&ssl=1",
            href: "/",
        },
        {
            title: "Momento Trading Cards",
            description: "Custom collectibles designed for creators, fans, and collectors.",
            image: "https://i0.wp.com/momentocardgames.com/wp-content/uploads/2025/06/trading.png?w=800&ssl=1",
            href: "/",
        },
    ];

    return (

        <section className="py-16 w-screen">
            <div className="text-center text-[#333333] font-bold mb-12">
                <h2 className="text-5xl mb-3">
                    Turn Meaningful Moments <br />into Stunning Cards
                </h2>
                <span className="text-gray-500 text-lg">
                    Explore the three types of Momento Cards
                </span>
            </div>
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="text-center bg-white rounded-xl shadow-lg overflow-hidden hover:scale-102 transform transition duration-300"
                    >
                        <div className="relative w-full h-64">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-[#333333]">{cat.title}</h3>
                            <p className="text-gray-600">{cat.description}</p>
                        </div>
                        <div className="p-6">
                            <a
                                href={cat.href}
                                className="inline-block bg-[#3CA9FF] hover:bg-[#FF6F3C] text-white py-3 px-5 rounded-lg"
                            >
                                Explore Cards
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Category;