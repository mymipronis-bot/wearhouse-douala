import { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function ImageUpload({ currentUrl, onUploaded, label = 'Photo' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file)

    if (uploadError) {
      setError('Échec de l\'upload : ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('images').getPublicUrl(fileName)
    onUploaded(data.publicUrl)
    setUploading(false)
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      {currentUrl && (
        <img src={currentUrl} alt="Aperçu" className="w-24 h-24 object-cover border-2 border-ink mb-2" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={uploading}
        className="text-sm"
      />
      {uploading && <p className="text-xs text-ink/60 mt-1">Envoi en cours...</p>}
      {error && <p className="text-xs text-safety mt-1">{error}</p>}
    </div>
  )
}
