
import React from 'react'
import Sidebar from '../components/Sidebar'
import { Crown, UserRound, Sprout } from 'lucide-react'

const Profile = () => {
    const members = [
        { name: 'Aliza Shaukat', role: 'Group Leader', icon: Crown },
        { name: 'Haya Javed', role: 'Group Member', icon: UserRound },
        { name: 'Sakina Fatima', role: 'Group Member', icon: UserRound },
    ]

    return (
        <main className="min-h-screen min-h-dvh bg-[#f5f7f2] flex flex-col md:flex-row">

            <Sidebar />

            <section className="
                w-full min-w-0 flex-1
                p-4 sm:p-6 lg:p-10
                md:ml-[260px]
                lg:ml-[300px]
            ">

                {/* Page Header */}
                <div className="mb-7 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#20372a]">
                        Team Behind Project
                    </h1>

                    <p className="text-gray-500 mt-2 text-xs sm:text-base">
                        Get to know our dedicated members.
                    </p>
                </div>

                {/* Project Overview */}
                <div className="
                    bg-[#20372a]
                    rounded-2xl
                    p-5 sm:p-8 lg:p-10
                    text-white mb-6 sm:mb-8
                    relative overflow-hidden
                ">

                    {/* Decorative Background Elements */}
                    <div className="
                        absolute -right-12 -top-12
                        w-36 h-36 sm:w-48 sm:h-48
                        bg-green-500/10 rounded-full
                    "></div>

                    <div className="
                        absolute -right-8 -bottom-20
                        w-44 h-44 sm:w-56 sm:h-56
                        bg-green-500/10 rounded-full
                    "></div>

                    <div className="relative z-10">

                        <div className="
                            w-12 h-12 sm:w-14 sm:h-14
                            bg-green-600 rounded-2xl
                            flex items-center justify-center
                            mb-5 sm:mb-6
                        ">
                            <Sprout size={28} />
                        </div>

                        <p className="
                            text-green-300 text-xs sm:text-sm
                            font-medium tracking-wider mb-2
                        ">
                            PROJECT NAME
                        </p>

                        <h2 className="
                            text-3xl sm:text-4xl lg:text-5xl
                            font-bold break-words
                        ">
                            Sabz Sehra AI
                        </h2>

                        <p className="
                            text-gray-300 mt-4
                            max-w-xl text-sm sm:text-base
                            leading-relaxed
                        ">
                            An innovative plant-focused project dedicated to exploring desert plants, their unique characteristics, and sustainable gardening.
                        </p>
                    </div>
                </div>

                {/* Team Members */}
                <div className="
                    bg-white rounded-2xl
                    p-4 sm:p-6 lg:p-8
                    border border-gray-100 shadow-sm
                ">

                    <div className="mb-6 sm:mb-7">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#20372a]">
                            Our Team
                        </h2>

                        <p className="text-gray-500 text-sm mt-2">
                            Meet the people behind GreeHeal AI.
                        </p>
                    </div>

                    <div className="
                        grid grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-3 sm:gap-5
                         mb-20
                    ">

                        {members.map((member, index) => {
                            const Icon = member.icon

                            return (
                                <div
                                    key={member.name}
                                    className="
                                        min-w-0
                                        border border-gray-100
                                        rounded-2xl
                                        p-5 sm:p-6
                                        bg-[#fafcf8]
                                        hover:border-green-300
                                        hover:shadow-md
                                        transition-all duration-300
                                    "
                                >

                                    <div className="
                                        w-12 h-12 sm:w-14 sm:h-14
                                        rounded-full bg-green-100
                                        flex items-center justify-center
                                        mb-4 sm:mb-5
                                    ">
                                        <Icon
                                            size={24}
                                            className="text-green-700"
                                        />
                                    </div>

                                    <h3 className="
                                        text-base sm:text-lg
                                        font-bold text-[#20372a]
                                        break-words
                                    ">
                                        {member.name}
                                    </h3>

                                    <p className={`
                                        text-sm mt-2 font-medium
                                        ${index === 0
                                            ? 'text-green-700'
                                            : 'text-gray-500'
                                        }
                                    `}>
                                        {member.role}
                                    </p>

                                </div>
                            )
                        })}

                    </div>
                </div>

            </section>
        </main>
    )
}

export default Profile
