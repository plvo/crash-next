import ListPublications from "@/components/publications/list-publications";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Publications | NextCrudStarter",
    description: "Logged Layout",
  };
};

export default function Page() {
  return (
    <>
      <h1>Publications</h1>
      <ListPublications />
    </>
  );
}
