import { supabase } from './supabase.js'

async function loadVideos() {
  const { data } = await supabase.from('videos').select('*')

  const container = document.getElementById('videoContainer')
  container.innerHTML = ""

  data.forEach(video => {
    container.innerHTML += `
      <div class="glass p-4 rounded-xl hover:scale-105 transition">
        <video controls src="${video.video_url}" class="rounded mb-2"></video>
        <h2 class="text-white">${video.title}</h2>
      </div>
    `
  })
}

loadVideos()
