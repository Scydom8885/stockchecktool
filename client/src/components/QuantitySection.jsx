import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock, faSpinner } from '@fortawesome/free-solid-svg-icons'

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
      en: 'QUANTITY CHECK',
      zh: '数量检查',
    },
    braisedPork: {
      mm: 'ကြော်ထားသော ဝက်သား',
      en: 'Braised Pork',
      zh: '卤肉',
    },
    kongBak: {
      mm: 'ကောင်းဘတ်',
      en: 'Kong Bak',
      zh: '焢肉',
    },
    packets: {
      mm: 'အထုပ်',
      en: 'packets',
      zh: '包',
    },
    submit: {
      mm: 'တင်သွင်းရန်',
      en: 'Submit',
      zh: '提交',
    },
    locked: {
      mm: 'သော့ပိတ်ထားသည်',
      en: 'Locked',
      zh: '已锁定',
    },
    morningLocked: {
      mm: 'မနက် - တင်သွင်းပြီး',
      en: 'Morning - Submitted',
      zh: '上午 - 已提交',
    },
    eveningLocked: {
      mm: 'ညနေ - တင်သွင်းပြီး',
      en: 'Evening - Submitted',
      zh: '晚上 - 已提交',
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
    // Poll every 10 seconds to check lock status
    const interval = setInterval(fetchQuantityStatus, 10000)
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

  // Determine lock message
  const getLockMessage = () => {
    if (currentPeriod === 'morning' && morningData) {
      return text.morningLocked[currentLang]
    }
    if (currentPeriod === 'evening' && eveningData) {
      return text.eveningLocked[currentLang]
    }
    return text.locked[currentLang]
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-textDark font-semibold text-lg">
          {text.title[currentLang]}
        </h2>
        {(isLocked || hasSubmitted) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FontAwesomeIcon icon={faLock} />
            <span>{getLockMessage()}</span>
          </div>
        )}
        {!isLocked && !hasSubmitted && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <FontAwesomeIcon icon={faUnlock} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Braised Pork Input */}
        <div>
          <label className="block text-textDark font-medium mb-2">
            {text.braisedPork[currentLang]} ({text.packets[currentLang]})
          </label>
          <input
            type="number"
            min="0"
            value={braisedPork}
            onChange={(e) => setBraisedPork(e.target.value)}
            disabled={isLocked || hasSubmitted || loading}
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-textDark focus:border-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder="0"
          />
        </div>

        {/* Kong Bak Input */}
        <div>
          <label className="block text-textDark font-medium mb-2">
            {text.kongBak[currentLang]} ({text.packets[currentLang]})
          </label>
          <input
            type="number"
            min="0"
            value={kongBak}
            onChange={(e) => setKongBak(e.target.value)}
            disabled={isLocked || hasSubmitted || loading}
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-textDark focus:border-primary focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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
