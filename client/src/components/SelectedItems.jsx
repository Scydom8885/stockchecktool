import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const SelectedItems = ({
  selectedItems,
  submittedItems,
  currentLang,
  notes,
  onNotesChange,
  onDeleteItem,
  onSubmit,
}) => {
  // Track quantities for each item
  const [quantities, setQuantities] = useState({})

  // Initialize quantities when selectedItems change
  useEffect(() => {
    const newQuantities = { ...quantities }
    selectedItems.forEach(item => {
      if (!(item.id in newQuantities)) {
        newQuantities[item.id] = item.quantity ?? 1 // Default to 1
      }
    })
    setQuantities(newQuantities)
  }, [selectedItems])

  // Update quantity for an item
  const updateQuantity = (itemId, newQuantity) => {
    setQuantities({
      ...quantities,
      [itemId]: Math.max(0, parseInt(newQuantity) || 0)
    })
  }

  // Check if there are new items to submit
  const hasNewItems = selectedItems.length > submittedItems.length

  // Check if an item has been submitted
  const isItemSubmitted = (item) => {
    return submittedItems.find(submitted => submitted.id === item.id)
  }

  // Handle submit with quantities
  const handleSubmit = () => {
    // Enrich items with quantities
    const itemsWithQuantities = selectedItems.map(item => ({
      ...item,
      quantity: quantities[item.id] ?? 1
    }))
    onSubmit(itemsWithQuantities)
  }
  const headerText = {
    mm: 'ပြန်ဖြည့်ရန်ပစ္စည်းများ',
    en: 'ITEMS TO RESTOCK',
    zh: '需要补货的物品',
  }

  const noItemsText = {
    mm: 'ပစ္စည်းမရှိသေးပါ',
    en: 'No items selected',
    zh: '未选择物品',
  }

  const quantityText = {
    mm: 'အရေအတွက်',
    en: 'Quantity',
    zh: '数量',
  }

  const notesPlaceholder = {
    mm: 'မှတ်ချက်များထည့်ပါ...',
    en: 'Additional notes...',
    zh: '添加备注...',
  }

  const submitText = {
    mm: 'တင်သွင်းမည်',
    en: 'Submit',
    zh: '提交',
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-textDark font-semibold mb-4 text-lg">
        {headerText[currentLang]} ({selectedItems.length})
      </h2>

      {/* Selected Items List */}
      <div className="space-y-2 mb-4 min-h-[100px]">
        {selectedItems.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            {noItemsText[currentLang]}
          </p>
        ) : (
          selectedItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg gap-2"
            >
              {/* Item Name - Left */}
              <span className="text-textDark font-medium">• {item.name[currentLang]}</span>

              {/* Quantity Controls + Delete - Right */}
              <div className="flex items-center gap-2">
                {!isItemSubmitted(item) ? (
                  <>
                    {/* Quantity Hybrid Method */}
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, (quantities[item.id] ?? 1) - 1)}
                      className="w-8 h-8 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 flex-shrink-0"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={quantities[item.id] ?? 1}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      className="w-14 border-2 border-gray-300 rounded-lg p-2 text-center text-textDark focus:border-primary focus:outline-none flex-shrink-0"
                    />
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, (quantities[item.id] ?? 1) + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-lg font-bold hover:bg-gray-300 flex-shrink-0"
                    >
                      +
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => onDeleteItem(item)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-2 flex-shrink-0"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                ) : (
                  /* Submitted - show locked quantity */
                  <span className="text-gray-600">x {quantities[item.id] ?? 1}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Note Box */}
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder={notesPlaceholder[currentLang]}
        className="w-full border-2 border-gray-300 rounded-lg p-3 mb-4 text-textDark focus:border-primary focus:outline-none resize-none"
        rows="3"
      />

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!hasNewItems || selectedItems.length === 0}
          className="bg-primary text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitText[currentLang]}
        </button>
      </div>
    </div>
  )
}

export default SelectedItems
