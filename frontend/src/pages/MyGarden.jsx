
import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import Sidebar from '../components/Sidebar'
import {
    Sprout, ArrowRight, Camera, Upload,
    X, ChevronRight, ScanSearch, Search
} from 'lucide-react'

const plants = [
    {
        name: 'Aloe Vera',
        scientificName: 'Aloe barbadensis Miller',
        category: 'Medicinal',
        image: assets.aloeVera,
        description: 'Aloe Vera is a popular succulent known for its thick, fleshy leaves containing a soothing gel. It is commonly used in skincare and can thrive in dry conditions.'
    },
    {
        name: 'Echeveria',
        scientificName: 'Echeveria species',
        category: 'Rosette',
        image: assets.echeveria,
        description: 'Echeveria is a beautiful rosette-shaped succulent with colorful, fleshy leaves. It comes in shades of green, pink, purple and blue.'
    },
    {
        name: 'Jade Plant',
        scientificName: 'Crassula ovata',
        category: 'Indoor Succulent',
        image: assets.jadePlant,
        description: 'The Jade Plant is a popular houseplant with thick woody stems and oval-shaped green leaves. It is easy to maintain and is often associated with good fortune.'
    },
    {
        name: 'Haworthia',
        scientificName: 'Haworthia species',
        category: 'Small Succulent',
        image: assets.havorthiaPlant,
        description: 'Haworthia is a compact succulent with pointed leaves and distinctive white stripes or patterns. It grows well indoors with indirect sunlight.'
    },
    {
        name: 'Sempervivum',
        scientificName: 'Sempervivum species',
        category: 'Hardy Succulent',
        image: assets.sempervivum,
        description: 'Also known as Hens and Chicks, Sempervivum forms attractive clusters of rosette-shaped leaves.'
    },
    {
        name: 'Sedum',
        scientificName: 'Sedum species',
        category: 'Ground Cover',
        image: assets.sedum,
        description: 'Sedum is a diverse group of succulents with fleshy leaves. Many varieties grow close to the ground and are excellent for rock gardens.'
    },
    {
        name: 'Kalanchoe',
        scientificName: 'Kalanchoe species',
        category: 'Flowering Succulent',
        image: assets.kalanchoe,
        description: 'Kalanchoe is a flowering succulent with thick leaves and clusters of colorful flowers. It is popular for indoor decoration.'
    },
    {
        name: 'Agave',
        scientificName: 'Agave species',
        category: 'Desert Succulent',
        image: assets.agavePlant,
        description: 'Agave features large, thick leaves arranged in striking rosettes, often with sharp edges. It is well adapted to hot and dry environments.'
    },
    {
        name: 'Gasteria',
        scientificName: 'Gasteria species',
        category: 'Indoor Succulent',
        image: assets.gasteria,
        description: 'Gasteria is recognized by its thick, tongue-shaped leaves, often covered in attractive spots. It prefers bright indirect light.'
    },
    {
        name: 'String of Pearls',
        scientificName: 'Curio rowleyanus',
        category: 'Trailing Succulent',
        image: assets.stringOfPearls,
        description: 'This unique trailing succulent has small, round, bead-like leaves that resemble a string of pearls. It looks beautiful in hanging pots.'
    },
    {
        name: 'Burro’s Tail',
        scientificName: 'Sedum morganianum',
        category: 'Trailing Succulent',
        image: assets.burrosTail,
        description: 'Burro’s Tail has long trailing stems covered with plump, overlapping leaves. It is a beautiful hanging plant that needs careful handling.'
    },
    {
        name: 'Panda Plant',
        scientificName: 'Kalanchoe tomentosa',
        category: 'Fuzzy Succulent',
        image: assets.pandaPlant,
        description: 'The Panda Plant has soft, fuzzy leaves with brown markings around the edges. It is a distinctive succulent that enjoys bright light.'
    },
    {
        name: 'Lithops',
        scientificName: 'Lithops species',
        category: 'Living Stones',
        image: assets.lithops,
        description: 'Lithops are tiny succulents that resemble small stones. Their unusual appearance helps them blend into their natural desert surroundings.'
    },
    {
        name: 'Aeonium',
        scientificName: 'Aeonium species',
        category: 'Rosette',
        image: assets.aeonium,
        description: 'Aeonium develops attractive rosettes of leaves at the ends of branching stems. Some varieties have dark purple or burgundy foliage.'
    },
    {
        name: 'Crassula',
        scientificName: 'Crassula species',
        category: 'Indoor Succulent',
        image: assets.crassula,
        description: 'Crassula is a large succulent genus that includes the popular Jade Plant. Its varieties feature interesting leaf shapes and growth patterns.'
    },
    {
        name: 'Graptopetalum',
        scientificName: 'Graptopetalum species',
        category: 'Rosette',
        image: assets.graptopetalum,
        description: 'Graptopetalum is known for its powdery, pastel-colored leaves arranged in loose rosettes.'
    },
    {
        name: 'Graptoveria',
        scientificName: 'Graptoveria hybrids',
        category: 'Hybrid Succulent',
        image: assets.graptoveria,
        description: 'Graptoveria is a hybrid succulent combining features of Graptopetalum and Echeveria. It produces beautiful compact rosettes.'
    },
    {
        name: 'Pachyphytum',
        scientificName: 'Pachyphytum species',
        category: 'Fleshy Leaves',
        image: assets.pachyphytum,
        description: 'Pachyphytum has thick, rounded leaves with a powdery coating. Its unusual appearance makes it a favorite among succulent collectors.'
    },
    {
        name: 'Euphorbia',
        scientificName: 'Euphorbia species',
        category: 'Desert Succulent',
        image: assets.euphorbia,
        description: 'Some Euphorbia species have thick, water-storing stems and unusual architectural shapes. Many are adapted to dry climates.'
    },
    {
        name: 'Cotyledon',
        scientificName: 'Cotyledon species',
        category: 'Fleshy Leaves',
        image: assets.cotyledon,
        description: 'Cotyledon plants feature thick, often rounded leaves and sometimes bell-shaped flowers. They are suitable for sunny succulent gardens.'
    }
]

const MyGarden = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const [identification, setIdentification] = useState(null)
    const [identifying, setIdentifying] = useState(false)
    const [identificationError, setIdentificationError] = useState('')

    const uploadRef = useRef(null)
    const cameraRef = useRef(null)

    const filteredPlants = plants.filter((plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setSelectedPlant(null)
        }

        window.addEventListener('keydown', handleEscape)

        return () => window.removeEventListener('keydown', handleEscape)
    }, [])

    // Clean up temporary image preview URL.
    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview)
        }
    }, [imagePreview])

    const handleImage = (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            setIdentificationError('Please select a JPG or PNG image.')
            e.target.value = ''
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            setIdentificationError('Image must be smaller than 10 MB.')
            e.target.value = ''
            return
        }

        const previewUrl = URL.createObjectURL(file)

        setImagePreview(previewUrl)
        setSelectedImage(file)
        setIdentification(null)
        setIdentificationError('')

        e.target.value = ''
    }

    const removeImage = () => {
        setImagePreview(null)
        setSelectedImage(null)
        setIdentification(null)
        setIdentificationError('')
    }

    const normalizeName = (value = '') => {
        return value.toLowerCase().replace(/[^a-z0-9]/g, '')
    }

    const findGardenPlant = (result) => {
        const aliases = {
            'Aloe officinalis': 'Aloe Vera',
            'Aloe vera': 'Aloe Vera',
            'Crassula ovata': 'Jade Plant',
            'Curio rowleyanus': 'String of Pearls',
            'Sedum morganianum': 'Burro’s Tail',
            'Kalanchoe tomentosa': 'Panda Plant'
        }

        const scientificName = result.scientificName || ''

        const directMatch = plants.find(
            (plant) =>
                normalizeName(plant.scientificName) === normalizeName(scientificName)
        )

        if (directMatch) return directMatch

        const alias = aliases[scientificName]

        if (alias) {
            return plants.find((plant) => plant.name === alias) || null
        }

        const commonNames = result.commonNames || []

        return plants.find((plant) =>
            commonNames.some(
                (name) => normalizeName(name) === normalizeName(plant.name)
            )
        ) || null
    }

    const identifyPlant = async () => {
        if (!selectedImage) {
            setIdentificationError('Please select a plant image first.')
            return
        }

        setIdentifying(true)
        setIdentification(null)
        setIdentificationError('')

        try {
            const formData = new FormData()
            formData.append('image', selectedImage)

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/identify`, {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Plant identification failed.')
            }

            setIdentification(data)

        } catch (error) {
            console.error('Identification error:', error)

            setIdentificationError(
                error.message || 'Unable to identify the plant. Please try again.'
            )
        } finally {
            setIdentifying(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#f5f7f2] flex flex-col md:flex-row">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <section className="
                w-full min-w-0 flex-1
                p-4 sm:p-6 lg:p-10
                md:ml-[260px]
                lg:ml-[300px]
            ">

                {/* Page Header */}
                <div className="flex flex-col gap-5 mb-8 lg:flex-row lg:items-center lg:justify-between">

                    <div className="min-w-0">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#20372a]">
                            My Garden
                        </h1>

                        <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-xl">
                            Explore succulent varieties or identify a plant using its picture.
                        </p>
                    </div>

                    {/* Upload Actions */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full lg:w-auto">

                        <button
                            onClick={() => cameraRef.current?.click()}
                            className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-3 sm:px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition shadow-sm min-h-12"
                        >
                            <Camera size={18} />
                            Take Photo
                        </button>

                        <button
                            onClick={() => uploadRef.current?.click()}
                            className="flex items-center justify-center gap-2 border border-green-700 text-green-700 hover:bg-green-50 px-3 sm:px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition min-h-12"
                        >
                            <Upload size={18} />
                            Upload Image
                        </button>

                    </div>

                    {/* Hidden File Inputs */}
                    <input
                        ref={cameraRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        capture="environment"
                        onChange={handleImage}
                        className="hidden"
                    />

                    <input
                        ref={uploadRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImage}
                        className="hidden"
                    />

                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-4 sm:p-5 mb-8">

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                            <div className="relative w-full sm:w-32 h-44 sm:h-28 shrink-0">
                                <img
                                    src={imagePreview}
                                    alt="Selected plant"
                                    className="w-full h-full object-cover rounded-xl"
                                />

                                <button
                                    onClick={removeImage}
                                    aria-label="Remove selected image"
                                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow text-red-500 hover:text-red-700"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#20372a]">
                                    Plant image selected
                                </p>

                                <p className="text-xs text-gray-400 mt-1 truncate">
                                    {selectedImage?.name}
                                </p>

                                <p className="text-xs text-gray-500 mt-2">
                                    Your image is ready for plant identification.
                                </p>
                            </div>

                            <button
                                onClick={identifyPlant}
                                disabled={identifying || !selectedImage}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white px-5 py-3 rounded-xl text-sm font-medium transition shrink-0 min-h-12"
                            >
                                {identifying ? 'Identifying...' : 'Identify Plant'}
                                <ScanSearch size={17} />
                            </button>

                        </div>
                    </div>
                )}

                {/* Identification Error */}
                {identificationError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-8 text-sm break-words">
                        {identificationError}
                    </div>
                )}

                {/* Identification Loading */}
                {identifying && (
                    <div className="bg-white rounded-2xl border border-green-100 p-6 sm:p-8 mb-8 text-center">

                        <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin mx-auto mb-4" />

                        <h3 className="font-semibold text-[#20372a]">
                            Analyzing your plant...
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            PlantNet is comparing your image with its plant database.
                        </p>

                    </div>
                )}

                {/* Identification Results */}
                {identification && (
                    <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-4 sm:p-7 mb-8">

                        <div className="flex items-center justify-between gap-3 mb-6">

                            <div className="min-w-0">
                                <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                                    PlantNet Results
                                </span>

                                <h2 className="text-lg sm:text-2xl font-bold text-[#20372a] mt-1">
                                    Identification Results
                                </h2>
                            </div>

                            <div className="bg-green-100 text-green-800 p-3 rounded-xl shrink-0">
                                <Sprout size={23} />
                            </div>

                        </div>

                        {identification.results?.length > 0 ? (
                            <>
                                {/* Best Prediction */}
                                {(() => {
                                    const bestResult = identification.results[0]
                                    const matchedPlant = findGardenPlant(bestResult)

                                    return (
                                        <div className="bg-[#f5f7f2] rounded-xl p-4 sm:p-5 mb-6">

                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                Best Prediction
                                            </p>

                                            <h3 className="text-lg sm:text-xl font-bold text-[#20372a] mt-2 break-words">
                                                {bestResult.scientificName}
                                            </h3>

                                            {bestResult.commonNames?.length > 0 && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {bestResult.commonNames.join(', ')}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4">

                                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-2 rounded-lg">
                                                    {(bestResult.confidence * 100).toFixed(2)}% confidence
                                                </span>

                                                <span className="bg-white text-gray-600 text-xs px-3 py-2 rounded-lg break-words">
                                                    Family: {bestResult.family}
                                                </span>

                                            </div>

                                            {matchedPlant ? (
                                                <button
                                                    onClick={() => setSelectedPlant(matchedPlant)}
                                                    className="mt-5 w-full sm:w-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-lg text-sm font-medium transition"
                                                >
                                                    View Plant Details
                                                    <ArrowRight size={16} />
                                                </button>
                                            ) : (
                                                <p className="text-xs text-gray-500 mt-4">
                                                    This prediction is not currently in your garden collection.
                                                </p>
                                            )}

                                            {bestResult.confidence < 0.3 && (
                                                <p className="text-xs text-amber-700 mt-4 leading-relaxed">
                                                    Low confidence: PlantNet is uncertain about this identification. Try another photo showing clear leaves, flowers, or the plant's overall structure.
                                                </p>
                                            )}

                                        </div>
                                    )
                                })()}

                                {/* Alternative Predictions */}
                                <h3 className="font-semibold text-[#20372a] mb-4">
                                    Other Possible Matches
                                </h3>

                                <div className="space-y-3">

                                    {identification.results.slice(1).map((result, index) => {
                                        const matchedPlant = findGardenPlant(result)

                                        return (
                                            <div
                                                key={`${result.scientificName}-${index}`}
                                                className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0"
                                            >

                                                <div className="min-w-0">
                                                    <p className="font-medium text-[#20372a] text-sm break-words">
                                                        {result.scientificName}
                                                    </p>

                                                    <p className="text-xs text-gray-500 mt-1 break-words">
                                                        {result.commonNames?.join(', ') || result.family}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3 shrink-0">
                                                    <span className="text-xs font-semibold text-green-700">
                                                        {(result.confidence * 100).toFixed(2)}%
                                                    </span>

                                                    {matchedPlant && (
                                                        <button
                                                            onClick={() => setSelectedPlant(matchedPlant)}
                                                            className="text-xs font-medium text-green-700 hover:text-green-900"
                                                        >
                                                            View Details
                                                        </button>
                                                    )}
                                                </div>

                                            </div>
                                        )
                                    })}

                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No identification results were returned. Try another image.
                            </p>
                        )}

                        <button
                            onClick={() => {
                                setIdentification(null)
                                setIdentificationError('')
                            }}
                            className="mt-6 text-sm font-medium text-gray-500 hover:text-red-600 transition"
                        >
                            Clear Results
                        </button>

                    </div>
                )}

                {/* Plant Collection */}
                <div className="mb-10">

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search succulent plants..."
                            className="w-full min-w-0 bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-green-600 transition"
                        />
                    </div>

                    {/* Plant Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">

                        {filteredPlants.map((plant) => (
                            <button
                                key={plant.name}
                                onClick={() => setSelectedPlant(plant)}
                                className="min-w-0 text-left bg-white rounded-2xl p-2.5 sm:p-4 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-300"
                            >

                                <div className="w-full h-24 sm:h-36 rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#eef5e9]">
                                    <img
                                        src={plant.image}
                                        alt={plant.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>

                                <h3 className="font-semibold text-[#20372a] text-xs sm:text-base break-words">
                                    {plant.name}
                                </h3>

                                <p className="text-[10px] sm:text-xs text-gray-400 mt-2">
                                    {plant.category}
                                </p>

                                <div className="flex items-center justify-between gap-1 mt-3 sm:mt-4">
                                    <span className="text-[10px] sm:text-xs text-green-700 font-medium">
                                        View Details
                                    </span>

                                    <ChevronRight size={15} className="text-green-700 shrink-0" />
                                </div>

                            </button>
                        ))}

                    </div>

                    {filteredPlants.length === 0 && (
                        <p className="text-center text-gray-500 py-10">
                            No plants found. Try another search.
                        </p>
                    )}

                </div>

            </section>

            {/* Plant Details Modal */}
            {selectedPlant && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
                    onClick={() => setSelectedPlant(null)}
                >

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="plant-modal-title"
                        className="relative bg-white w-full max-w-lg max-h-[90vh] max-h-[90dvh] rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedPlant(null)}
                            aria-label="Close plant details"
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-gray-600 hover:text-red-500 shadow-md transition"
                        >
                            <X size={20} />
                        </button>

                        {/* Plant Image */}
                        <div className="h-44 sm:h-64 bg-[#eef5e9]">
                            <img
                                src={selectedPlant.image}
                                alt={selectedPlant.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Plant Information */}
                        <div className="p-5 sm:p-8">

                            <span className="inline-block text-xs font-semibold text-green-800 bg-green-100 px-3 py-1.5 rounded-full">
                                {selectedPlant.category}
                            </span>

                            <h2
                                id="plant-modal-title"
                                className="text-2xl sm:text-3xl font-bold text-[#20372a] mt-4 break-words"
                            >
                                {selectedPlant.name}
                            </h2>

                            <p className="text-sm text-green-700 italic mt-1 break-words">
                                {selectedPlant.scientificName}
                            </p>

                            <div className="w-12 h-1 bg-green-600 rounded-full my-5" />

                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {selectedPlant.description}
                            </p>

                            <button
                                onClick={() => setSelectedPlant(null)}
                                className="w-full mt-7 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl text-sm font-semibold transition min-h-12"
                            >
                                Close Details
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </main>
    )
}

export default MyGarden
