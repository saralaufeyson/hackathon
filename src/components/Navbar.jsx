import useConnection from "@/hooks/useConnection";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Navbar Component with mobile responsiveness and dynamic navigation
export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { connectionMode } = useConnection();

	const navigationItems = [
		{ name: "Resources", href: "/resources" },
		{ name: "Skills Registry", href: "/skills" },
		{ name: "Knowledge Base", href: "/knowledge" },
		{ name: "Emergency Contacts", href: "/contacts" },
	];

	return (
		<nav className="bg-blue-600 shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo and brand */}
					<div className="flex-shrink-0">
						<Link href="/" className="flex items-center">
							<span className="text-white text-xl font-bold">
								CommunityShield
							</span>
						</Link>
					</div>

					{/* Desktop navigation */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							{navigationItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none"
						>
							{isMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							{navigationItems.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="text-white hover:bg-blue-500 block px-3 py-2 rounded-md text-base font-medium"
									onClick={() => setIsMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
