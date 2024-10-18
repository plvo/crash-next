import type { Metadata } from "next";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export const generateMetadata = async (): Promise<Metadata> => {
//   const userData = await getServerSession(authOptions);

//   if (!userData) {
//     return redirect("/signin");
//   }

//   console.log("userData", userData);

//   return {
//     title: "Publications | NextCrudStarter",
//     description: "Logged Layout",
//   } satisfies Metadata;
// };

export const metadata: Metadata = {
  title: "Publications | NextCrudStarter",
  description: "Logged Layout",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
