import { Inter } from "next/font/google";
import "./globals.css";
import { ConnectionProvider } from "@/context/ConnectionProvider";
import { Navbar } from "@/components/Navbar";
import { ConnectionStatus } from "@/components/ConnectionStatus";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body className={inter.className}>
				<ConnectionProvider>
					<div className="min-h-screen bg-gray-50">
						<Navbar />
						<ConnectionStatus />
						<main className="container mx-auto px-4 py-8">{children}</main>
					</div>
				</ConnectionProvider>
			</body>
		</html>
	);
}
