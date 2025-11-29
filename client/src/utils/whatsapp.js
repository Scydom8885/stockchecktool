/**
 * WhatsApp Integration Utility
 * Generates WhatsApp links with formatted messages
 */

// WhatsApp API URL
const WHATSAPP_API_URL = 'https://api.whatsapp.com/send'

// Owner's phone number (in international format without + or -)
// Malaysia format: 60 + phone number (without leading 0)
const OWNER_PHONE = '60187806530'  // Your number: 018-780 6530

/**
 * Format items list in Chinese
 * @param {Array} items - Selected items array
 * @returns {string} - Formatted items list
 */
const formatItemsInChinese = (items) => {
  if (items.length === 0) {
    return '无物品'
  }

  return items.map(item => `• ${item.name.zh}`).join('\n')
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

  return items.map(item => `• ${item.name.en}`).join('\n')
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
  const whatsappLink = generateWhatsAppLink(OWNER_PHONE, 'zh', username, selectedItems, notes)
  window.open(whatsappLink, '_blank')

  // User just needs to:
  // 1. Tap "Send" on WhatsApp window - 1 tap only!
  // 2. Owner will manually forward to brother/group
  // Total: 1 tap (simplest and most reliable!)
}
