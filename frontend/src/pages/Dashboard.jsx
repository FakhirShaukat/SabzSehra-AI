
import React from 'react'
import { assets } from '../assets/assets'
import Sidebar from '../components/Sidebar'
import { Leaf, Sprout } from 'lucide-react'

const featuredPlants = [
    {
        name: 'Aloe Vera',
        scientificName: 'Aloe barbadensis miller',
        category: 'Medicinal Succulent',
        image: assets.aloeVera,
        description: 'Aloe Vera is a well-known succulent recognized for its thick, fleshy leaves and water-storing properties.',
        characteristics: [
            'Thick, fleshy green leaves',
            'Stores water in its leaves',
            'Produces tall flowering stalks',
            'Adapted to dry environments'
        ],
    },
    {
        name: 'Euphorbia',
        scientificName: 'Euphorbia milii',
        category: 'Desert Succulent',
        image: assets.euphorbia,
        description: 'Euphorbia is a diverse plant genus that includes many succulent species. Some have thick stems and unusual shapes that help them store water in dry environments.',
        characteristics: [
            'Many species have fleshy stems',
            'Distinctive architectural growth',
            'Adapted to different dry habitats',
            'Includes a wide range of forms'
        ],
    },
    {
        name: 'Bryophyllum pinnatum',
        scientificName: 'Kalanchoe pinnata',
        category: 'Leaf Succulent',
        image: assets.bryophyllumPinnatum,
        description: 'Bryophyllum pinnatum is a distinctive succulent known for producing small plantlets along the edges of its leaves.',
        characteristics: [
            'Fleshy, compound leaves',
            'Produces plantlets along leaf margins',
            'Can reproduce vegetatively',
            'Grows well in warm conditions'
        ],
    }
]

const Dashboard = () => {
    return (
        <main className="min-h-screen bg-[#f5f7f2] flex flex-col md:flex-row">

            {/* Sidebar */}
            <Sidebar />

            {/* Dashboard Content */}
            <section className="
                flex-1 min-w-0
                w-full
                p-4
                sm:p-6
                lg:p-10
                md:ml-[260px]
                lg:ml-[300px]
            ">

                {/* Header */}
                <div className="mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#20372a]">
                        Welcome!
                    </h1>

                    <p className="text-gray-500 mt-3 text-xs sm:text-base max-w-2xl leading-relaxed">
                        Explore the fascinating world of succulent plants. Learn about their unique characteristics, growing environments, and care requirements.
                    </p>
                </div>

                {/* Featured Plants */}
                <div className="mb-10 sm:mb-12">

                    <div className="mb-5 sm:mb-6">
                        <p className="text-xs sm:text-sm text-green-700 font-semibold tracking-wider">
                            OUR FEATURED PLANTS
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

                        {featuredPlants.map((plant) => (
                            <article
                                key={plant.name}
                                className="
                                    min-w-0
                                    bg-white rounded-2xl
                                    overflow-hidden
                                    border border-gray-100
                                    shadow-sm
                                    hover:shadow-lg
                                    transition-all duration-300
                                "
                            >

                                {/* Plant Image */}
                                <div className="h-48 sm:h-56 overflow-hidden bg-[#eaf0e5]">
                                    <img
                                        src={plant.image}
                                        alt={plant.name}
                                        className="
                                            w-full h-full object-cover
                                            transition-transform duration-500
                                            hover:scale-105
                                        "
                                    />
                                </div>

                                {/* Plant Information */}
                                <div className="p-4 sm:p-6">

                                    <span className="
                                        inline-block
                                        text-xs font-semibold
                                        text-green-700 bg-green-50
                                        px-3 py-1.5 rounded-full
                                        max-w-full
                                    ">
                                        {plant.category}
                                    </span>

                                    <h3 className="text-lg sm:text-xl font-bold text-[#20372a] mt-4 break-words">
                                        {plant.name}
                                    </h3>

                                    <p className="text-xs text-gray-400 italic mt-1 break-words">
                                        {plant.scientificName}
                                    </p>

                                    <p className="text-xs text-gray-600 leading-relaxed mt-4">
                                        {plant.description}
                                    </p>

                                    {/* Characteristics */}
                                    <div className="mt-5">

                                        <h4 className="text-sm font-semibold text-[#20372a] mb-3">
                                            Key Characteristics
                                        </h4>

                                        <ul className="space-y-2">
                                            {plant.characteristics.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex items-start gap-2 text-xs text-gray-500"
                                                >
                                                    <Leaf
                                                        size={15}
                                                        className="text-green-700 shrink-0 mt-0.5"
                                                    />

                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>

                                </div>
                            </article>
                        ))}

                    </div>
                </div>

                {/* Plant Propagation */}
                <div className="
                    bg-white rounded-2xl
                    border border-gray-100
                    shadow-sm overflow-hidden
                    mb-8 sm:mb-10
                ">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Text Content */}
                        <div className="
                            p-5
                            sm:p-8
                            lg:p-10
                            flex flex-col justify-center
                        ">

                            <p className="text-xs sm:text-sm text-green-700 font-semibold tracking-wider mb-2">
                                A UNIQUE PLANT FEATURE
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-[#20372a] leading-snug">
                                Nature's Own Plant Propagation
                            </h2>

                            <p className="text-gray-500 text-xs leading-relaxed mt-4">
                                Bryophyllum pinnatum is particularly interesting because it can produce tiny plantlets along the edges of its leaves. These plantlets can develop roots and grow into new plants.
                            </p>

                            <div className="
                                flex flex-wrap items-center gap-2
                                mt-5 text-green-700
                                text-sm font-medium
                            ">
                                <Sprout size={19} className="shrink-0" />
                                <span>Natural vegetative reproduction</span>
                            </div>

                        </div>

                        {/* Propagation Image */}
                        <div className="h-56 sm:h-72 md:h-full md:min-h-[320px] bg-[#edf3e8]">
                            <img
                                src={assets.bryophyllumPinnatum}
                                alt="Bryophyllum pinnatum foliage showing plantlets"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-8 px-2 leading-relaxed">
                    Sabz Sehra AI • Learn about plants, understand nature, and grow responsibly.
                </p>

            </section>
        </main>
    )
}

export default Dashboard
