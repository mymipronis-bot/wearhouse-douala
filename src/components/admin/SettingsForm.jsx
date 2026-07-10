import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import ImageUpload from './ImageUpload'

export default function SettingsForm({ settings, onSaved }) {
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const { error } = await supabase.from('settings').update({
      business_name: form.business_name,
      logo_url: form.logo_url || null,
      whatsapp_number: form.whatsapp_number,
    }).eq('id', 1)

    setSaving(false)
    if (error) {
      setMessage('Erreur : ' + error.message)
      return
    }
    setMessage('Réglages enregistrés ✓')
    onSaved(form)
  }

  return (
    <form onSubmit={handleSubmit} className="hang-tag p-4 mt-3 space-y-4 max-w-md">
      <h3 className="stamp-text text-lg">Réglages du site</h3>

      <div>
        <label className="block text-sm font-semibold mb-1">Nom de l'entreprise</label>
        <input required value={form.business_name} onChange={e => update('business_name', e.target.value)}
          className="w-full border-2 border-ink px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Numéro WhatsApp (format 237XXXXXXXXX)</label>
        <input required value={form.whatsapp_number} onChange={e => update('whatsapp_number', e.target.value)}
          className="w-full border-2 border-ink px-3 py-2" />
      </div>

      <ImageUpload currentUrl={form.logo_url} onUploaded={url => update('logo_url', url)} label="Logo" />

      {message && <p className="text-sm">{message}</p>}

      <button type="submit" disabled={saving}
        className="stamp-text bg-ink text-cream px-4 py-2 hover:bg-safety transition-colors text-sm">
        {saving ? 'Enregistrement...' : 'Enregistrer les réglages'}
      </button>
    </form>
  )
}
