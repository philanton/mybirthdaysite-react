import { Session } from "@supabase/gotrue-js";
import WelcomeContent from "../components/welcome"

interface HomeProps {
  session: Session;
}

export default function Home({ session }: HomeProps) {
  return (!session ? 
    <WelcomeContent /> :
    "In Development")
}