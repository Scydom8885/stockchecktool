import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const QuantitySection = ({ currentLang, userId, onQuantitySubmit }) => {
  const [braisedPork, setBraisedPork] = useState('')
  const [kongBak, setKongBak] = useState('')
  const [isLocked, setIsLocked] = useState(true)
  const [currentPeriod, setCurrentPeriod] = useState('morning')
  const [morningData, setMorningData] = useState(null)
  const [eveningData, setEveningData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Text translations
  const text = {
    title: {
      mm: 'ပမာဏစစ်ဆေးခြင်း',
      en: 'UNIT CHECK',
      zh: '数量检查',
    },
    braisedPork: {
      mm: 'ဝက်သား',
      en: 'Braised Pork',
      zh: '卤肉',
    },
    kongBak: {
      mm: 'Kong Bak',
      en: 'Kong Bak',
      zh: '焢肉',
    },
    submit: {
      mm: 'တင်သွင်းရန်',
      en: 'Submit',
      zh: '提交',
    },
  }

  // Fetch quantity status
  const fetchQuantityStatus = async () => {
    setLoading(true)
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${API_URL}/quantities/status`)
      const data = await response.json()

      if (data.success) {
        setIsLocked(!data.can_submit)
        setCurrentPeriod(data.current_period)
        setMorningData(data.morning)
        setEveningData(data.evening)

        // Determine which data to show based on period and submissions
        if (data.current_period === 'morning' && data.morning) {
          // Morning period, already submitted
          setBraisedPork(data.morning.braised_pork.toString())
          setKongBak(data.morning.kong_bak.toString())
        } else if (data.current_period === 'evening') {
          if (data.evening) {
            // Evening period, already submitted
            setBraisedPork(data.evening.braised_pork.toString())
            setKongBak(data.evening.kong_bak.toString())
          } else if (data.can_submit) {
            // Evening period, not submitted yet, clear inputs
            setBraisedPork('')
            setKongBak('')
          }
        } else if (!data.can_submit) {
          // Before 10 AM, show morning data if exists
          if (data.morning) {
            setBraisedPork(data.morning.braised_pork.toString())
            setKongBak(data.morning.kong_bak.toString())
          } else {
            setBraisedPork('')
            setKongBak('')
          }
        }
      }
    } catch (error) {
      console.error('Fetch quantity status error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuantityStatus()
    // Poll every 1 second for instant sync across all devices
    const interval = setInterval(fetchQuantityStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!braisedPork || !kongBak) {
      alert('Please fill in both quantities')
      return
    }

    setSubmitting(true)
    try {
      const result = await onQuantitySubmit(
        parseInt(braisedPork),
        parseInt(kongBak),
        currentPeriod
      )

      if (result.success) {
        // Refresh status after successful submission
        await fetchQuantityStatus()
      } else {
        alert(result.error || 'Submission failed')
      }
    } catch (error) {
      console.error('Submit error:', error)
      alert('Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Determine if current period has been submitted
  const hasSubmitted = (currentPeriod === 'morning' && morningData) ||
                       (currentPeriod === 'evening' && eveningData)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6 mb-4">
      <h2 className="text-textDark font-semibold text-lg mb-4">
        {text.title[currentLang]}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Braised Pork Input */}
        <div className="flex items-center gap-3">
          <label className="text-textDark font-medium whitespace-nowrap w-32">
            {text.braisedPork[currentLang]}:
          </label>
          <input
            type="number"
            min="0"
            value={braisedPork}
            onChange={(e) => setBraisedPork(e.target.value)}
            disabled={isLocked || hasSubmitted || loading}
            className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-textDark focus:border-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="0"
          />
        </div>

        {/* Kong Bak Input */}
        <div className="flex items-center gap-3">
          <label className="text-textDark font-medium whitespace-nowrap w-32">
            {text.kongBak[currentLang]}:
          </label>
          <input
            type="number"
            min="0"
            value={kongBak}
            onChange={(e) => setKongBak(e.target.value)}
            disabled={isLocked || hasSubmitted || loading}
            className="flex-1 border-2 border-gray-300 rounded-lg p-3 text-textDark focus:border-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="0"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLocked || hasSubmitted || loading || submitting}
          className="w-full bg-primary text-white py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? (
            <span>
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              {text.submit[currentLang]}...
            </span>
          ) : (
            text.submit[currentLang]
          )}
        </button>
      </form>
    </div>
  )
}

export default QuantitySection
