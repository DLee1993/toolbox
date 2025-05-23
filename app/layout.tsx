import type { Metadata } from "next";
import { Inter, Azeret_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/global/navigation/app-sidebar";
import BreadCrumbNav from "@/components/global/navigation/BreadCrumbNav";

const inter = Inter({
    weight: ["300", "400", "600", "700", "800"],
    subsets: ["latin"],
});
const azeretMono = Azeret_Mono({
    weight: ["300", "400", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-azeret-mono",
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
            <body className={`${inter.className} ${azeretMono.variable} antialiased`}>
                <ThemeProvider>
                    <SidebarProvider defaultOpen={false}>
                        <TooltipProvider>
                            <AppSidebar />
                            <div className="w-full relative">
                                <header className="sticky top-0 z-50 flex justify-between items-center border-b border-border bg-background px-5">
                                    <BreadCrumbNav />
                                    <SidebarTrigger
                                        variant="ghost"
                                        className="w-10 h-10 md:hidden"
                                    />
                                </header>
                                <main className="w-11/12 max-w-6xl mx-auto flex justify-center">
                                    {children}
                                </main>
                            </div>
                        </TooltipProvider>
                    </SidebarProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
