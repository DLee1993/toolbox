import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/global/navigation/app-sidebar";
import Header from "@/components/global/Header";

const dmSans = DM_Sans({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
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
            <body className={`${dmSans.className} antialiased`}>
                <ThemeProvider storageKey="toolbox-theme">
                    <SidebarProvider defaultOpen={false}>
                        <TooltipProvider>
                            <AppSidebar />
                            <div className="gradient-glow"></div>
                            <div className="w-full relative">
                                <Header />
                                <main>{children}</main>
                            </div>
                        </TooltipProvider>
                    </SidebarProvider>
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    );
}
