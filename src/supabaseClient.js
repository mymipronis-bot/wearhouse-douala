import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sdzccriyttbborkjqdmm.supabase.co'
const supabaseAnonKey = 'sb_publishable_7KmuBlPr4L9j7EwexPwGKg_Wts19ElN'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
