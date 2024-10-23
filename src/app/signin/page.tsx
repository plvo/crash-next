import { Metadata } from "next";
import FormSignIn from "@/components/signin/form.signin";

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
