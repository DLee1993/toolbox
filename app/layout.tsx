import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "MonoLayer",
    description: "Your one stop shop for all things",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased w-full">
                <SidebarProvider defaultOpen={false}>
                    <AppSidebar />
                    <main className="w-full">{children}</main>
                </SidebarProvider>
            </body>
        </html>
    );
}
