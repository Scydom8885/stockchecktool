/**
 * WhatsApp Integration Utility
 * Generates WhatsApp links with formatted messages
 */

// WhatsApp API URL
const WHATSAPP_API_URL = 'https://api.whatsapp.com/send'

// Owner's phone number (in international format without + or -)
// Malaysia format: 60 + phone number (without leading 0)
const DOM_WA = '60187806530'  // Your number: 018-780 6530

// Brother's phone number (in international format without + or -)
const BRO_WA = '60128533050'  // Brother's number: 012-853 3050

/**
 * Format items list in Chinese
 * @param {Array} items - Selected items array
 * @returns {string} - Formatted items list
 */
const formatItemsInChinese = (items) => {
  if (items.length === 0) {
    return '无物品'
  }

  return items.map(item => {
    const quantity = item.quantity || 1
    return `• ${item.name.zh} x ${quantity}`
  }).join('\n')
}

/**
 * Format items list in English
 * @param {Array} items - Selected items array
 * @returns {string} - Formatted items list
 */
const formatItemsInEnglish = (items) => {
  if (items.length === 0) {
    return 'No items'
  }

  return items.map(item => {
    const quantity = item.quantity || 1
    return `• ${item.name.en} x ${quantity}`
  }).join('\n')
}

/**
 * Generate WhatsApp message in Chinese
 * @param {string} username - Username of submitter
 * @param {Array} selectedItems - Array of selected items
 * @param {string} notes - Additional notes
 * @returns {string} - Formatted message in Chinese
 */
const generateWhatsAppMessageChinese = (username, selectedItems, notes) => {
  let message = `📋 *库存补货通知*\n\n`
 
  message += `需要补货：\n${formatItemsInChinese(selectedItems)}\n`

  if (notes && notes.trim()) {
    message += `\n📝 备注：\n${notes.trim()}\n`
  }
   message += `\n---\n提交人：${username}\n`
  message += `\n---\n发送时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Kuala_Lumpur' })}`

  return message
}

/**
 * Generate WhatsApp message in English
 * @param {string} username - Username of submitter
 * @param {Array} selectedItems - Array of selected items
 * @param {string} notes - Additional notes
 * @returns {string} - Formatted message in English
 */
const generateWhatsAppMessageEnglish = (username, selectedItems, notes) => {
  let message = `📋 *Stock Reorder Notification*\n\n`
  message += `Submitted by: ${username}\n\n`
  message += `Items to restock:\n${formatItemsInEnglish(selectedItems)}\n`

  if (notes && notes.trim()) {
    message += `\n📝 Notes:\n${notes.trim()}\n`
  }

  message += `\n---\nSent at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' })}`

  return message
}

/**
 * Generate WhatsApp link with pre-filled message for a specific phone number
 * @param {string} phoneNumber - Phone number in international format
 * @param {string} language - Language of message ('en' or 'zh')
 * @param {string} username - Username of submitter
 * @param {Array} selectedItems - Array of selected items
 * @param {string} notes - Additional notes
 * @returns {string} - WhatsApp URL
 */
export const generateWhatsAppLink = (phoneNumber, language, username, selectedItems, notes) => {
  // Generate message in the specified language
  const message = language === 'en'
    ? generateWhatsAppMessageEnglish(username, selectedItems, notes)
    : generateWhatsAppMessageChinese(username, selectedItems, notes)

  const encodedMessage = encodeURIComponent(message)

  // Opens WhatsApp with pre-filled message to specific phone number
  // User only needs to tap "Send" (1 tap only!)
  return `${WHATSAPP_API_URL}?phone=${phoneNumber}&text=${encodedMessage}`
}

/**
 * Open WhatsApp with pre-filled message to owner's phone number
 * @param {string} username - Username of submitter
 * @param {Array} selectedItems - Array of selected items
 * @param {string} notes - Additional notes
 */
export const openWhatsApp = (username, selectedItems, notes) => {
  // Open WhatsApp for owner's number with Chinese message
  const whatsappLink = generateWhatsAppLink(BRO_WA, 'zh', username, selectedItems, notes)
  window.open(whatsappLink, '_blank')

  // User just needs to:
  // 1. Tap "Send" on WhatsApp window - 1 tap only!
  // 2. Owner will manually forward to brother/group
  // Total: 1 tap (simplest and most reliable!)
}

/**
 * Generate WhatsApp message for quantity check in Chinese
 * @param {string} username - Username of submitter
 * @param {number} braisedPork - Quantity of braised pork
 * @param {number} kongBak - Quantity of kong bak
 * @param {number} shiitake - Quantity of shiitake
 * @param {string} period - Time period (morning/evening)
 * @returns {string} - Formatted message in Chinese
 */
const generateQuantityMessageChinese = (username, braisedPork, kongBak, shiitake , period) => {
  const periodText = period === 'morning' ? '上午' : '晚上'

  let message = `📦 *数量检查通知*\n\n`
  message += `时段：${periodText}\n\n`
  message += `卤肉：${braisedPork} 包\n`
  message += `焢肉：${kongBak} 包\n`
  message += `香菇：${shiitake} 包\n` 
  message += `\n---\n提交人：${username}\n`
  message += `发送时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Kuala_Lumpur' })}`

  return message
}

/**
 * Send quantity check to brother's WhatsApp (Chinese only)
 * @param {string} username - Username of submitter
 * @param {number} braisedPork - Quantity of braised pork
 * @param {number} kongBak - Quantity of kong bak
 * @param {number} shiitake - Quantity of shiitake
 * @param {string} period - Time period (morning/evening)
 */
export const sendQuantityWhatsApp = (username, braisedPork, kongBak, shiitake, period) => {
  const message = generateQuantityMessageChinese(username, braisedPork, kongBak, shiitake, period)
  const encodedMessage = encodeURIComponent(message)
  const whatsappLink = `${WHATSAPP_API_URL}?phone=${BRO_WA}&text=${encodedMessage}`

  window.open(whatsappLink, '_blank')
}
