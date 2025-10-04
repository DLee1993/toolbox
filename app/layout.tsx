import type { Metadata } from "next";
import { Inter, Azeret_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/global/navigation/app-sidebar";
import Header from "@/components/global/Header";

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
    title: "Your Digital Toolbox",
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
                                <Header />
                                <main className="p-4 md:p-9">{children}</main>
                            </div>
                        </TooltipProvider>
                    </SidebarProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
