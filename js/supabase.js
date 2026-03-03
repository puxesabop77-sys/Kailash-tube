import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ahhuhanjvwrltwdnrqxc.supabase.co'
const supabaseKey = 'sb_publishable_vCOpkdTBVH1d4exzr82JIQ_uNJNIzIu'

export const supabase = createClient(supabaseUrl, supabaseKey)
