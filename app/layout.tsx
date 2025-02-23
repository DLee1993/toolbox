import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/global/app-sidebar";
import Header from "@/components/global/Header";
import BreadCrumbNav from "@/components/global/BreadCrumbNav";
import Footer from "@/components/global/Footer";

const lexend = Lexend({
    weight: ["300", "400", "600", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Toolbox",
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
            <body className={`${lexend.className} antialiased`}>
                <ThemeProvider>
                    <SidebarProvider defaultOpen={false}>
                        <TooltipProvider>
                            <AppSidebar />
                            <main className="w-full">
                                <Header />
                                <div className="block min-[850px]:hidden p-4">
                                    <BreadCrumbNav />
                                </div>
                                <div className="minHeight customYPadding w-11/12 max-w-6xl mx-auto">{children}</div>
                                <Footer />
                            </main>
                        </TooltipProvider>
                    </SidebarProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
