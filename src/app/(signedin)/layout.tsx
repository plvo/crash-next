import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signed In | NextDashboard",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        { children }
    );
}