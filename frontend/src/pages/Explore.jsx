
import React, { useMemo, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import Sidebar from '../components/Sidebar'
import {
    Search,
    Leaf,
    X,
    Sun,
    ShieldAlert,
    Flower2,
    BookOpen,
    ChevronRight
} from 'lucide-react'

const getPlantImage = (plantName) => {
    const plantImageMap = {
        'Aloe Vera': assets.aloeVera,
        'Euphorbia': assets.euphorbia,
        'Bryophyllum pinnatum': assets.bryophyllumPinnatum,
        'Echeveria': assets.echeveria,
        'Jade Plant': assets.jadePlant,
        'Haworthia': assets.havorthiaPlant,
        'Sempervivum': assets.sempervivum,
        'Sedum': assets.sedum,
        'Kalanchoe': assets.kalanchoe,
        'Agave': assets.agavePlant,
        'Gasteria': assets.gasteria,
        'String of Pearls': assets.stringOfPearls,
        'Burro’s Tail': assets.burrosTail,
        'Panda Plant': assets.pandaPlant,
        'Lithops': assets.lithops,
        'Aeonium': assets.aeonium,
        'Crassula': assets.crassula,
        'Graptopetalum': assets.graptopetalum,
        'Graptoveria': assets.graptoveria,
        'Pachyphytum': assets.pachyphytum,
        'Cotyledon': assets.cotyledon,
    }

    return plantImageMap[plantName] || assets.hero
}

const plants = [
    {
        name: 'Aloe Vera',
        scientificName: 'Aloe vera',
        category: 'Focus Plant',
        focus: true,
        definition: 'Aloe vera is a perennial succulent plant recognized by its thick, fleshy, green leaves arranged in a rosette. The leaves contain a clear gel-like inner tissue that stores water.',
        usage: [
            'Ornamental plant for gardens and indoor spaces.',
            'Aloe gel is widely used in cosmetic and skincare products.',
            'The plant is commonly cultivated for its gel and other commercial products.'
        ],
        benefits: [
            'Its gel is used in many moisturizing skincare formulations.',
            'Its water-storing leaves help it tolerate periods of limited rainfall.',
            'It is a low-maintenance plant when grown in suitable conditions.'
        ],
        survival: [
            'Stores water inside thick, fleshy leaves.',
            'Has a waxy outer leaf surface that reduces water loss.',
            'Uses CAM photosynthesis, allowing it to take in much of its carbon dioxide at night.',
            'Its shallow roots can quickly absorb water after rainfall.'
        ],
    },
    {
        name: 'Euphorbia',
        scientificName: 'Euphorbia species',
        category: 'Focus Plant',
        focus: true,
        definition: 'Euphorbia is a large and diverse genus of flowering plants. Some species resemble cacti, with thick green stems, ridges, and spines. Despite their appearance, they are not true cacti.',
        usage: [
            'Ornamental landscaping and succulent collections.',
            'Some species are used as architectural plants in dry gardens.',
            'Certain species are cultivated for their unusual shapes and structures.'
        ],
        benefits: [
            'Many species tolerate dry conditions once established.',
            'Their unusual forms add variety to water-conscious gardens.',
            'Some species have adapted to very hot and arid environments.'
        ],
        survival: [
            'Many desert species store water in thick stems.',
            'Some have reduced or short-lived leaves to limit water loss.',
            'Spines and ridges can provide protection and reduce exposure.',
            'A protective outer surface helps reduce evaporation.'
        ],
    },
    {
        name: 'Bryophyllum pinnatum',
        scientificName: 'Kalanchoe pinnata (syn. Bryophyllum pinnatum)',
        category: 'Focus Plant',
        focus: true,
        definition: 'A succulent perennial plant with fleshy leaves. It is especially known for producing small plantlets along the edges of its leaves, which can develop into new plants.',
        usage: [
            'Ornamental gardening and botanical education.',
            'Used in traditional plant practices in different regions.',
            'Useful for demonstrating vegetative reproduction and leaf-borne plantlets.'
        ],
        benefits: [
            'Its leaf margins demonstrate an unusual natural propagation method.',
            'Fleshy leaves store water and help the plant tolerate dry periods.',
            'It can be propagated without relying entirely on seeds.'
        ],
        survival: [
            'Stores water in its succulent leaves and stems.',
            'Can produce plantlets along leaf margins, helping it reproduce efficiently.',
            'Uses CAM photosynthesis, which can reduce water loss.',
            'Can tolerate seasonal dry conditions better than many non-succulent plants.'
        ],
    },
    {
        name: 'Echeveria',
        scientificName: 'Echeveria species',
        category: 'Succulent',
        definition: 'Echeveria is a genus of rosette-forming succulents with thick, fleshy leaves. Many varieties have colorful leaf edges or a powdery coating.',
        usage: [
            'Decorative pots and succulent arrangements.',
            'Rock gardens and container displays.',
            'Botanical collections and landscaping in suitable climates.'
        ],
        benefits: [
            'Stores water in its leaves.',
            'Requires relatively little watering when established.',
            'Its compact growth makes it suitable for small spaces.'
        ],
        survival: [
            'Fleshy leaves store water.',
            'A powdery leaf coating on some species helps protect the surface.',
            'Compact rosettes can reduce exposure of inner leaves.',
            'Many species use CAM photosynthesis.'
        ],
    },
    {
        name: 'Jade Plant',
        scientificName: 'Crassula ovata',
        category: 'Succulent',
        definition: 'The jade plant is a branching succulent shrub with thick oval leaves and woody stems. It is popular as a houseplant and is sometimes called the money plant.',
        usage: [
            'Indoor and outdoor ornamental gardening.',
            'Bonsai-style cultivation.',
            'Decorative office and home plants.'
        ],
        benefits: [
            'Its fleshy leaves store water.',
            'It is relatively easy to maintain in suitable conditions.',
            'It can develop a tree-like appearance over time.'
        ],
        survival: [
            'Stores water in its leaves and stems.',
            'Uses water efficiently during dry periods.',
            'Its waxy leaf surface helps reduce moisture loss.',
            'CAM metabolism helps many Crassula species conserve water.'
        ],
    },
    {
        name: 'Haworthia',
        scientificName: 'Haworthia species',
        category: 'Succulent',
        definition: 'Haworthia is a group of small succulent plants, often forming compact rosettes. Some have striped, raised, or translucent leaf patterns.',
        usage: [
            'Indoor plant collections.',
            'Small decorative containers.',
            'Shaded succulent displays.'
        ],
        benefits: [
            'Stores water in its leaves.',
            'Many species remain compact.',
            'Some varieties tolerate brighter shade better than many other succulents.'
        ],
        survival: [
            'Fleshy leaves store moisture.',
            'Compact growth protects the central growing point.',
            'Some species grow partly sheltered among rocks or vegetation.',
            'Their water-efficient metabolism helps them withstand dry periods.'
        ],
    },
    {
        name: 'Sempervivum',
        scientificName: 'Sempervivum species',
        category: 'Succulent',
        definition: 'Sempervivum is a rosette-forming succulent commonly called hens and chicks. It produces smaller rosettes around the parent plant.',
        usage: [
            'Rock gardens and green roofs.',
            'Outdoor succulent displays.',
            'Ground-cover planting in suitable climates.'
        ],
        benefits: [
            'Produces many offsets.',
            'Stores water in fleshy leaves.',
            'Many species tolerate cold better than tropical succulents.'
        ],
        survival: [
            'Thick leaves store water.',
            'Low rosettes remain close to the ground.',
            'Offsets help the plant spread and establish new growth.',
            'Many species tolerate seasonal temperature changes.'
        ],
    },
    {
        name: 'Sedum',
        scientificName: 'Sedum species',
        category: 'Succulent',
        definition: 'Sedum is a large genus of succulent plants with fleshy leaves and varied growth forms, including upright, trailing, and ground-cover types.',
        usage: [
            'Rock gardens and containers.',
            'Ground cover and green roofs.',
            'Decorative borders and succulent arrangements.'
        ],
        benefits: [
            'Many species tolerate drought once established.',
            'Some provide flowers for pollinating insects.',
            'Different growth forms suit a range of garden designs.'
        ],
        survival: [
            'Fleshy leaves store water.',
            'Some species spread close to the soil surface.',
            'Many tolerate dry, exposed growing sites.',
            'Certain species use CAM photosynthesis.'
        ],
    },
    {
        name: 'Kalanchoe',
        scientificName: 'Kalanchoe species',
        category: 'Succulent',
        definition: 'Kalanchoe is a genus of flowering succulents with thick leaves. Some species are valued for colorful flowers, while others reproduce through leaf plantlets.',
        usage: [
            'Indoor and outdoor ornamental displays.',
            'Flowering container plants.',
            'Botanical study of succulent reproduction.'
        ],
        benefits: [
            'Fleshy leaves store water.',
            'Some species flower for extended periods.',
            'Certain species reproduce through leaf plantlets.'
        ],
        survival: [
            'Stores water in fleshy leaves and stems.',
            'Many species use CAM photosynthesis.',
            'Some species reproduce vegetatively when conditions allow.',
            'Their protective leaf surfaces reduce moisture loss.'
        ],
    },
    {
        name: 'Agave',
        scientificName: 'Agave species',
        category: 'Succulent',
        definition: 'Agave is a genus of rosette-forming succulents with thick, often pointed leaves. Some species grow very large and produce a tall flower stalk when mature.',
        usage: [
            'Xeriscaping and dry-landscape gardening.',
            'Architectural garden features.',
            'Fiber and other commercial uses in certain species.'
        ],
        benefits: [
            'Many species are highly drought tolerant.',
            'Their strong structural shape adds visual interest.',
            'Some species support wildlife when flowering.'
        ],
        survival: [
            'Stores water in thick leaves.',
            'Has a waxy leaf coating that limits evaporation.',
            'Sharp leaf tips and margins deter grazing.',
            'Many agaves use CAM photosynthesis.'
        ],
    },
    {
        name: 'Gasteria',
        scientificName: 'Gasteria species',
        category: 'Succulent',
        definition: 'Gasteria is a genus of compact succulents with thick, tongue-shaped leaves, often marked with spots or rough textures.',
        usage: [
            'Indoor succulent collections.',
            'Shaded patios and container gardens.',
            'Decorative foliage displays.'
        ],
        benefits: [
            'Stores water in its leaves.',
            'Compact varieties suit smaller spaces.',
            'Many species tolerate filtered light.'
        ],
        survival: [
            'Fleshy leaves hold water reserves.',
            'Some grow in sheltered rocky locations.',
            'Their slow growth helps reduce resource requirements.',
            'Water-efficient metabolism supports dry-season survival.'
        ],
    },
    {
        name: 'String of Pearls',
        scientificName: 'Curio rowleyanus',
        category: 'Succulent',
        definition: 'String of Pearls is a trailing succulent with round, bead-like leaves arranged along thin stems. Each leaf has a small translucent window that helps light reach internal tissues.',
        usage: [
            'Hanging baskets and decorative containers.',
            'Indoor plant displays.',
            'Trailing features in succulent arrangements.'
        ],
        benefits: [
            'Its round leaves store water.',
            'The trailing growth habit is suitable for hanging displays.',
            'Its unusual leaf structure makes it interesting for botanical study.'
        ],
        survival: [
            'Spherical leaves reduce exposed surface area relative to volume.',
            'Leaves store water for dry periods.',
            'The translucent leaf window helps light reach inner tissues.',
            'It is adapted to dry environments but is sensitive to overwatering.'
        ],
    },
    {
        name: 'Burro’s Tail',
        scientificName: 'Sedum morganianum',
        category: 'Succulent',
        definition: 'Burro’s Tail is a trailing succulent with long stems covered in tightly arranged, fleshy leaves. Its stems can form attractive hanging clusters.',
        usage: [
            'Hanging baskets.',
            'Decorative succulent collections.',
            'Indoor and sheltered outdoor displays.'
        ],
        benefits: [
            'Fleshy leaves store water.',
            'Trailing growth makes it useful for vertical displays.',
            'It can be propagated from leaves and stems.'
        ],
        survival: [
            'Stores water in densely packed leaves.',
            'A protective leaf coating helps reduce moisture loss.',
            'Its succulent tissues support survival through dry periods.'
        ],
    },
    {
        name: 'Panda Plant',
        scientificName: 'Kalanchoe tomentosa',
        category: 'Succulent',
        definition: 'The Panda Plant is a fuzzy-leaved succulent with soft silvery hairs and brown markings along the edges of its leaves.',
        usage: [
            'Indoor decorative plant collections.',
            'Container gardening.',
            'Botanical displays featuring unusual leaf textures.'
        ],
        benefits: [
            'Fleshy leaves store water.',
            'Fine leaf hairs help protect the plant from intense sunlight.',
            'Its compact form suits small gardens.'
        ],
        survival: [
            'Leaves store water.',
            'Fine hairs help reflect sunlight and reduce exposure.',
            'Its protective leaf surface helps limit moisture loss.'
        ],
    },
    {
        name: 'Lithops',
        scientificName: 'Lithops species',
        category: 'Succulent',
        definition: 'Lithops are small succulents commonly called living stones. Their paired, fleshy leaves resemble stones or pebbles, helping them blend into their surroundings.',
        usage: [
            'Specialist succulent collections.',
            'Rock and mineral-themed displays.',
            'Botanical education about camouflage and water conservation.'
        ],
        benefits: [
            'Stores water in its paired leaves.',
            'Its stone-like appearance reduces visibility to herbivores.',
            'Its small exposed surface helps limit water loss.'
        ],
        survival: [
            'Camouflages itself among stones and soil.',
            'Most of the plant remains close to or partly below the ground.',
            'Stores water in thick leaf tissues.',
            'Uses seasonal growth and leaf replacement to manage water.'
        ],
    },
    {
        name: 'Aeonium',
        scientificName: 'Aeonium species',
        category: 'Succulent',
        definition: 'Aeonium is a genus of succulents with distinctive rosettes growing at the ends of branching stems. Some species form shrub-like structures.',
        usage: [
            'Ornamental containers.',
            'Rock gardens in suitable climates.',
            'Landscape designs and succulent collections.'
        ],
        benefits: [
            'Fleshy leaves store water.',
            'Branching growth provides architectural interest.',
            'Many species can be propagated from cuttings.'
        ],
        survival: [
            'Stores moisture in its leaves and stems.',
            'Some species become less active during hot, dry summers.',
            'Seasonal growth patterns help it cope with dry conditions.'
        ],
    },
    {
        name: 'Crassula',
        scientificName: 'Crassula species',
        category: 'Succulent',
        definition: 'Crassula is a large genus of succulent plants with varied forms, including compact rosettes, shrubs, and small ground-cover plants.',
        usage: [
            'Indoor and outdoor ornamental gardening.',
            'Rock gardens and succulent arrangements.',
            'Container displays and bonsai-style cultivation.'
        ],
        benefits: [
            'Many species store water in their leaves.',
            'Some are compact and easy to propagate.',
            'The genus offers a wide range of shapes and sizes.'
        ],
        survival: [
            'Fleshy leaves or stems store water.',
            'Many species have protective leaf surfaces.',
            'Some use CAM photosynthesis.',
            'Certain species survive seasonal dryness by slowing growth.'
        ],
    },
    {
        name: 'Graptopetalum',
        scientificName: 'Graptopetalum species',
        category: 'Succulent',
        definition: 'Graptopetalum is a genus of rosette-forming succulents with fleshy leaves, often covered in a powdery coating that gives them pale or pastel colors.',
        usage: [
            'Decorative succulent gardens.',
            'Containers and rock gardens.',
            'Propagation and botanical collections.'
        ],
        benefits: [
            'Stores water in leaves.',
            'Can produce offsets and new plants from fallen leaves.',
            'Many species are suitable for small spaces.'
        ],
        survival: [
            'Fleshy leaves act as water reservoirs.',
            'The powdery surface can help protect the leaf.',
            'Compact rosettes help protect developing leaves.',
            'Some species use CAM photosynthesis.'
        ],
    },
    {
        name: 'Graptoveria',
        scientificName: 'Graptoveria hybrids',
        category: 'Succulent',
        definition: 'Graptoveria is a group of cultivated hybrids, generally produced by crossing Graptopetalum and Echeveria. They commonly form colorful, fleshy-leaved rosettes.',
        usage: [
            'Decorative pots and succulent arrangements.',
            'Rock gardens in suitable climates.',
            'Hybrid succulent collections.'
        ],
        benefits: [
            'Stores water in its leaves.',
            'Compact growth suits containers.',
            'Many varieties can be propagated from leaves or offsets.'
        ],
        survival: [
            'Inherits water-storage traits from its succulent parent plants.',
            'Protective leaf surfaces reduce moisture loss.',
            'Some hybrids use CAM photosynthesis.',
            'Compact rosettes help protect inner growth.'
        ],
    },
    {
        name: 'Pachyphytum',
        scientificName: 'Pachyphytum species',
        category: 'Succulent',
        definition: 'Pachyphytum is a genus of succulents with thick, rounded leaves that often have a powdery coating. The leaves may appear plump and pebble-like.',
        usage: [
            'Ornamental succulent collections.',
            'Container displays.',
            'Rock gardens and decorative arrangements.'
        ],
        benefits: [
            'Thick leaves store water.',
            'Compact growth makes it suitable for containers.',
            'Its unusual leaf shape adds visual variety.'
        ],
        survival: [
            'Fleshy leaves store moisture.',
            'A powdery surface can reduce exposure to environmental stress.',
            'Its slow-growing habit helps limit resource demand.'
        ],
    },
    {
        name: 'Cotyledon',
        scientificName: 'Cotyledon species',
        category: 'Succulent',
        definition: 'Cotyledon is a genus of succulent plants, often with thick leaves and sometimes bell-shaped flowers. Some species have fuzzy leaves or red leaf margins.',
        usage: [
            'Ornamental gardens and containers.',
            'Rock gardens in suitable climates.',
            'Decorative succulent collections.'
        ],
        benefits: [
            'Fleshy leaves store water.',
            'Many species tolerate dry conditions once established.',
            'Some produce attractive flowers.'
        ],
        survival: [
            'Stores water in thick leaves and sometimes stems.',
            'Protective leaf coatings can reduce moisture loss.',
            'Many species are adapted to seasonal drought.',
            'Some use CAM photosynthesis.'
        ],
    }
]

const categories = ['All Plants', 'Focus Plants', 'Other Succulents']

const Explore = () => {
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('All Plants')
    const [selectedPlant, setSelectedPlant] = useState(null)

    const filteredPlants = useMemo(() => {
        return plants.filter((plant) => {
            const matchesSearch = `${plant.name} ${plant.scientificName} ${plant.definition}`
                .toLowerCase()
                .includes(search.toLowerCase().trim())

            const matchesCategory =
                activeCategory === 'All Plants' ||
                (activeCategory === 'Focus Plants' ? plant.focus : !plant.focus)

            return matchesSearch && matchesCategory
        })
    }, [search, activeCategory])

    // Close the plant details modal with the Escape key.
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setSelectedPlant(null)
            }
        }

        window.addEventListener('keydown', handleEscape)

        return () => {
            window.removeEventListener('keydown', handleEscape)
        }
    }, [])

    return (
        <main className="min-h-screen min-h-dvh bg-[#f5f7f2] flex flex-col md:flex-row">
            <Sidebar />

            <section className="
                w-full min-w-0 flex-1
                p-4 sm:p-6 lg:p-10
                md:ml-[260px]
                lg:ml-[300px]
            ">
                {/* Page heading */}
                <div className="mb-7 sm:mb-9">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#20372a]">
                        Explore Plant World
                    </h1>

                    <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                        Discover the characteristics, uses, benefits, survival adaptations, and care requirements of succulent plants in your collection.
                    </p>
                </div>

                {/* Search */}
                <div className="mb-5">
                    <div className="relative w-full lg:max-w-md">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={19}
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by plant or scientific name..."
                            className="
                                w-full min-w-0
                                bg-white border border-gray-200
                                rounded-xl py-3 pl-11 pr-4
                                text-sm outline-none
                                focus:ring-2 focus:ring-green-600/20
                                focus:border-green-600
                            "
                        />
                    </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-7">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                px-3 sm:px-5 py-2.5
                                rounded-full text-xs sm:text-sm
                                font-medium whitespace-nowrap
                                transition-all duration-200
                                ${activeCategory === category
                                    ? 'bg-green-700 text-white shadow-sm'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-800'
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Plant count */}
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                    Showing{' '}
                    <span className="font-semibold text-[#20372a]">
                        {filteredPlants.length}
                    </span>{' '}
                    plants
                </p>

                {/* Plant collection */}
                {filteredPlants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                        {filteredPlants.map((plant) => (
                            <button
                                key={plant.name}
                                onClick={() => setSelectedPlant(plant)}
                                className="
                                    w-full min-w-0 text-left
                                    bg-white border border-gray-100
                                    rounded-2xl p-3 sm:p-5
                                    shadow-sm
                                    hover:shadow-md hover:border-green-200
                                    transition-all duration-300
                                    group
                                "
                            >
                                <div className="
                                    overflow-hidden rounded-xl
                                    mb-3 sm:mb-4
                                    bg-[#edf3e8]
                                ">
                                    <img
                                        src={getPlantImage(plant.name)}
                                        alt={plant.name}
                                        loading="lazy"
                                        className="
                                            w-full h-40 sm:h-44
                                            object-cover
                                            transition-transform duration-500
                                            group-hover:scale-105
                                        "
                                    />
                                </div>

                                <div className="min-h-6 mb-2">
                                    {plant.focus && (
                                        <span className="
                                            inline-block
                                            text-[9px] sm:text-[10px]
                                            uppercase tracking-wide font-bold
                                            text-green-800 bg-green-100
                                            px-2.5 sm:px-3 py-1.5
                                            rounded-full
                                        ">
                                            Main focus
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-[#20372a] break-words">
                                    {plant.name}
                                </h3>

                                <p className="text-xs italic text-green-700 mt-1 break-words">
                                    {plant.scientificName}
                                </p>

                                <p className="
                                    text-xs sm:text-sm text-gray-500
                                    leading-relaxed mt-3
                                    line-clamp-3
                                ">
                                    {plant.definition}
                                </p>

                                <div className="
                                    flex items-center justify-between
                                    gap-2 mt-4 sm:mt-5 pt-3 sm:pt-4
                                    border-t border-gray-100
                                ">
                                    <span className="text-[10px] sm:text-xs text-gray-400">
                                        {plant.category}
                                    </span>

                                    <span className="
                                        text-xs sm:text-sm font-semibold
                                        text-green-700
                                        flex items-center gap-1
                                        group-hover:gap-2 transition-all
                                        shrink-0
                                    ">
                                        Explore
                                        <ChevronRight size={15} />
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="
                        bg-white border border-gray-100
                        rounded-2xl p-7 sm:p-10 text-center
                    ">
                        <Search
                            size={32}
                            className="mx-auto text-gray-300 mb-3"
                        />

                        <h3 className="font-semibold text-[#20372a]">
                            No plants found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Try another plant name or change the selected filter.
                        </p>

                        <button
                            onClick={() => {
                                setSearch('')
                                setActiveCategory('All Plants')
                            }}
                            className="
                                mt-4 text-sm font-semibold
                                text-green-700 hover:text-green-900
                            "
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </section>

            {/* Plant details modal */}
            {selectedPlant && (
                <div
                    className="
                        fixed inset-0 z-50
                        bg-black/60
                        flex items-center justify-center
                        p-2 sm:p-4
                    "
                    onClick={() => setSelectedPlant(null)}
                >
                    <div
                        className="
                            bg-[#f8faf6]
                            w-full max-w-4xl
                            max-h-[92vh]
                            max-h-[92dvh]
                            overflow-y-auto
                            overscroll-contain
                            rounded-2xl sm:rounded-3xl
                            shadow-2xl
                        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="
                            sticky top-0 z-10
                            bg-[#20372a] text-white
                            px-4 sm:px-8 py-4 sm:py-5
                            flex items-start justify-between gap-3
                            rounded-t-2xl sm:rounded-t-3xl
                        ">
                            <div className="min-w-0">
                                {selectedPlant.focus && (
                                    <span className="
                                        text-[9px] sm:text-[10px]
                                        uppercase tracking-wider
                                        font-bold text-green-200
                                    ">
                                        Main focus plant
                                    </span>
                                )}

                                <h2 className="
                                    text-xl sm:text-2xl lg:text-3xl
                                    font-bold mt-1 break-words
                                ">
                                    {selectedPlant.name}
                                </h2>

                                <p className="text-green-200 italic text-xs sm:text-sm mt-1 break-words">
                                    {selectedPlant.scientificName}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedPlant(null)}
                                className="
                                    shrink-0 w-9 h-9 sm:w-10 sm:h-10
                                    rounded-full bg-white/10
                                    hover:bg-white/20
                                    flex items-center justify-center
                                    transition
                                "
                                aria-label="Close plant details"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal content */}
                        <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">

                            {/* Plant image */}
                            <div className="
                                overflow-hidden rounded-xl sm:rounded-2xl
                                bg-[#edf3e8] border border-gray-100
                            ">
                                <img
                                    src={getPlantImage(selectedPlant.name)}
                                    alt={selectedPlant.name}
                                    className="
                                        w-full h-48 sm:h-64 lg:h-80
                                        object-cover
                                    "
                                />
                            </div>

                            {/* Definition */}
                            <section className="
                                bg-white rounded-xl sm:rounded-2xl
                                border border-gray-100
                                p-4 sm:p-6
                            ">
                                <div className="flex items-center gap-2 mb-3">
                                    <BookOpen
                                        size={19}
                                        className="text-green-700 shrink-0"
                                    />

                                    <h3 className="font-bold text-[#20372a]">
                                        Plant definition
                                    </h3>
                                </div>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {selectedPlant.definition}
                                </p>

                                <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                                    <span className="font-semibold text-gray-500">
                                        Habitat:
                                    </span>{' '}
                                    {selectedPlant.habitat ||
                                        'Dry to semi-arid environments with bright light and infrequent watering.'}
                                </p>
                            </section>

                            {/* Uses and benefits */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                <section className="
                                    bg-white rounded-xl sm:rounded-2xl
                                    border border-gray-100 p-4 sm:p-5
                                ">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Flower2
                                            size={19}
                                            className="text-green-700 shrink-0"
                                        />

                                        <h3 className="font-bold text-[#20372a]">
                                            Uses
                                        </h3>
                                    </div>

                                    <ul className="space-y-3">
                                        {selectedPlant.usage.map((item, i) => (
                                            <li
                                                key={i}
                                                className="text-sm text-gray-600 leading-relaxed flex gap-2"
                                            >
                                                <span className="text-green-600 shrink-0">
                                                    •
                                                </span>

                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section className="
                                    bg-white rounded-xl sm:rounded-2xl
                                    border border-gray-100 p-4 sm:p-5
                                ">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Leaf
                                            size={19}
                                            className="text-green-700 shrink-0"
                                        />

                                        <h3 className="font-bold text-[#20372a]">
                                            Benefits and characteristics
                                        </h3>
                                    </div>

                                    <ul className="space-y-3">
                                        {selectedPlant.benefits.map((item, i) => (
                                            <li
                                                key={i}
                                                className="text-sm text-gray-600 leading-relaxed flex gap-2"
                                            >
                                                <span className="text-green-600 shrink-0">
                                                    •
                                                </span>

                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            {/* Survival adaptations */}
                            <section className="
                                bg-[#eaf3e8]
                                rounded-xl sm:rounded-2xl
                                p-4 sm:p-6
                            ">
                                <div className="flex items-start gap-2 mb-4">
                                    <Sun
                                        size={20}
                                        className="text-green-800 shrink-0 mt-0.5"
                                    />

                                    <h3 className="font-bold text-[#20372a]">
                                        How does it survive in dry environments?
                                    </h3>
                                </div>

                                <ul className="space-y-3">
                                    {selectedPlant.survival.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-sm text-gray-700 leading-relaxed flex gap-3"
                                        >
                                            <span className="
                                                w-6 h-6 shrink-0
                                                rounded-full bg-white
                                                text-green-800 text-xs font-bold
                                                flex items-center justify-center
                                            ">
                                                {i + 1}
                                            </span>

                                            <span className="flex-1 pt-0.5">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Explore
