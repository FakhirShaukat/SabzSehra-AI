
import { NavLink, Link } from 'react-router-dom'
import {
    LayoutDashboard,
    UserRound,
    Sprout,
    Compass,
    LogOut,
} from 'lucide-react'

import { assets } from '../assets/assets'

const navLinks = [
    {
        to: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        to: '/garden',
        label: 'My Garden',
        icon: Sprout,
    },
    {
        to: '/explore',
        label: 'Explore',
        icon: Compass,
    },
    {
        to: '/profile',
        label: 'Profile',
        icon: UserRound,
    },
]

const Sidebar = () => {
    const activeLinkClass =
        'bg-green-700 text-white'

    const inactiveLinkClass =
        'text-green-100 hover:bg-white/10 hover:text-white'

    return (
        <>
            {/* Mobile Top Header */}
            <header className="
        sticky top-0 z-40
        flex w-full items-center justify-between
        bg-[#20372a]
        px-4 py-3
        shadow-md
        md:hidden
      ">
                {/* Logo and Project Name */}
                <Link to="/">
                    <div className="flex min-w-0 items-center gap-3">
                        {/* Project Logo Image Placeholder */}
                        <div className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            overflow-hidden 
           
          ">
                            <img src={assets.logo} alt="Logo" className="h-full w-full object-cover" />
                        </div>

                    </div>
                </Link>

                {/* Mobile Logout */}
                <Link
                    to="/"
                    className="
            flex shrink-0 items-center gap-2
            rounded-lg bg-red-500/15
            px-3 py-2
            text-xs font-medium text-red-500
            transition hover:bg-red-500/25
          "
                >
                    <LogOut size={15} />
                </Link>
            </header>

            {/* Desktop Sidebar */}
            <aside className="
        fixed left-0 top-0 z-50
        hidden h-screen
        w-[260px] flex-col
        bg-[#20372a] p-6
        text-white shadow-xl
        md:flex
        lg:w-[300px]
      ">
                {/* Desktop Logo */}
                <div className="
          mb-12 flex shrink-0
          flex-col items-center gap-3
        ">
                    {/* Project Logo Image Placeholder */}
                    <div className="
            flex h-16 w-16 lg:h-20 lg:w-20
            items-center justify-center
            overflow-hidden rounded-2xl
            bg-white/10
          ">
                        {/* Add your logo image here later */}
                    </div>

                    <h2 className="
            text-center text-xl font-semibold
            tracking-wide
          ">
                        Sabz Sehra AI
                    </h2>
                </div>

                {/* Desktop Navigation */}
                <nav className="flex flex-1 flex-col gap-3">
                    {navLinks.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => `
                flex items-center gap-3
                rounded-xl px-4 py-3
                font-medium transition
                ${isActive ? activeLinkClass : inactiveLinkClass}
              `}
                        >
                            <Icon size={20} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop Logout */}
                <Link
                    to="/"
                    className="
            mt-auto flex items-center gap-3
            rounded-xl px-4 py-3
            font-medium text-red-300
            transition hover:bg-red-500/15
          "
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="
        fixed bottom-0 left-0 z-50
        flex w-full items-center justify-around
        border-t border-white/10
        bg-[#20372a]
        px-2 pt-2
        pb-[max(0.5rem,env(safe-area-inset-bottom))]
        shadow-[0_-4px_15px_rgba(0,0,0,0.12)]
        md:hidden
      ">
                {navLinks.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `
              flex min-w-0 flex-1
              flex-col items-center justify-center
              gap-1 rounded-lg px-1 py-1
              text-[8px] font-medium
              transition
              ${isActive
                                ? 'text-white'
                                : 'text-green-200/70 hover:text-white'
                            }
            `}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    size={22}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                />
                                <span>{label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>
        </>
    )
}

export default Sidebar
