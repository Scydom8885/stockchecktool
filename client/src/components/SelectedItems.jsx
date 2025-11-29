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
  // Check if there are new items to submit
  const hasNewItems = selectedItems.length > submittedItems.length

  // Check if an item has been submitted
  const isItemSubmitted = (item) => {
    return submittedItems.find(submitted => submitted.id === item.id)
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
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg"
            >
              <span className="text-textDark">• {item.name[currentLang]}</span>
              {!isItemSubmitted(item) && (
                <button
                  onClick={() => onDeleteItem(item)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
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
          onClick={onSubmit}
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
