import { supabase } from './supabase.js'

window.uploadVideo = async function() {

  const title = document.getElementById('title').value
  const file = document.getElementById('fileInput').files[0]
  const youtubeUrl = document.getElementById('youtubeUrl').value

  let videoUrl = ""

  if (file) {
    const { data } = await supabase.storage
      .from('videos')
      .upload(`public/${Date.now()}.mp4`, file)

    videoUrl = supabase.storage.from('videos')
      .getPublicUrl(data.path).data.publicUrl
  }

  if (youtubeUrl) {
    videoUrl = youtubeUrl
  }

  await supabase.from('videos').insert([{ title, video_url: videoUrl }])

  alert("Uploaded Successfully 🚀")
}
