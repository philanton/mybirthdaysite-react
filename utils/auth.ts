import { GoTrueClient } from "@supabase/gotrue-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseApiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const goTrueClient = new GoTrueClient({
    url: `${supabaseURL}/auth/v1`,
    headers: {
        apikey: supabaseApiKey,
    },
});

export default goTrueClient;