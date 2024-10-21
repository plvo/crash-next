import FormSignIn from "@/components/signin/form.signin";
import { Metadata } from "next";

export const generateMetadata = ():Metadata =>  {
  return {
    title: "Sign In | NextCrudStarter"
  }
}

export default function Page() {
  return (
    <main>
      <FormSignIn />
    </main>
  );
}
