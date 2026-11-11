
import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import Navbar from '../components/Navbar'

const TitlePage = () => {
    return (
        <main className="relative flex min-h-screen min-h-dvh w-full flex-col overflow-hidden">

            {/* Background */}
            <section className="absolute inset-0 z-0">
                <img
                    src={assets.background}
                    alt="Garden background"
                    className="h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/55"></div>
            </section>

            {/* Main Content */}
            <section className="relative z-10 flex min-h-screen min-h-dvh flex-1 flex-col">

                <Navbar />

                <div className="header-content flex flex-1 flex-col items-center justify-center px-5 py-12 text-center sm:px-8 sm:py-16 md:px-12 lg:px-20">

                    <div className="w-full max-w-4xl">

                        <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            Discover the Beauty of Desert Plants.
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-200 sm:mt-6 sm:text-base md:text-lg">
                            Explore a collection of fascinating succulent plants, discover their unique properties and experience the beauty of sustainable vertical gardening.
                        </p>

                    </div>

                    <Link
                        to="/dashboard"
                        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 px-9 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-green-600 hover:text-white active:scale-95 sm:mt-8 sm:text-base"
                    >
                        Dashboard
                    </Link>

                </div>

            </section>

        </main>
    )
}

export default TitlePage
