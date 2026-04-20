import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://ymcrkbcsuloijemdbqzy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltY3JrYmNzdWxvaWplbWRicXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMTg0OTUsImV4cCI6MjA4NTg5NDQ5NX0.DH7S5cdFSwD5i1RNs_QYyubJUar8ANtdEImyj1ZqOjw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
