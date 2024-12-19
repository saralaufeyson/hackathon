import localFont from "next/font/local";
import "./globals.css";
import { ConnectionProvider } from "@/context/ConnectionProvider";
import { Navbar } from "@/components/Navbar";
import { ConnectionStatus } from "@/components/ConnectionStatus";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Community Shield",
	description: "Hyperlocal Disaster Response Network",
};

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
