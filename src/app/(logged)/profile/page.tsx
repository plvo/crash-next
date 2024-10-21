import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Publications | NextCrudStarter",
    description: "Logged Layout",
  };
};

export default function Page() {
  return (
    <div>
      <h1>Profil</h1>
    </div>
  );
}
