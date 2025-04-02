import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/global/navigation/app-sidebar";
import Footer from "@/components/global/Footer";

const inter = Inter({
    weight: ["300", "400", "600", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Toolbox | Tools for everyone",
    description: "A hub for essential tools",
    icons: {
        icon: "/images/logo.svg",
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
                            <div className="w-full relative">
                                <SidebarTrigger variant="ghost" className="fixed top-5 left-5 w-10 h-10 md:hidden" />
                                <main className="w-11/12 max-w-6xl mx-auto flex justify-center items-center">{children}</main>
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
