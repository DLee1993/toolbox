import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/global/navigation/app-sidebar";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

const inter = Inter({
    weight: ["300", "400", "600", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Toolbox | Tools for everyone",
    description: "A hub for essential tools",
    icons: {
        icon: "/logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider>
                    <SidebarProvider defaultOpen={false}>
                        <TooltipProvider>
                            <AppSidebar />
                            <div className="w-full">
                                <Header />
                                <main className="w-11/12 max-w-6xl mx-auto">
                                    {children}
                                </main>
                                <Footer />
                            </div>
                        </TooltipProvider>
                    </SidebarProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
