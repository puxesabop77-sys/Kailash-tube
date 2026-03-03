import { supabase } from './supabase.js'

window.signUp = async function() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signUp({ email, password })
  if (!error) alert("Signup successful!")
}

window.signIn = async function() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (!error) window.location.href = "/home.html"
}

window.logout = async function() {
  await supabase.auth.signOut()
  window.location.href = "/index.html"
}
