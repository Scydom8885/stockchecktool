const ItemGrid = ({ items, activeTab, currentLang, onItemClick }) => {
  const headerText = {
    mm: 'ပစ္စည်းများရွေးချယ်ပါ',
    en: 'SELECT ITEMS',
    zh: '选择物品',
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-textDark font-semibold mb-4 text-lg">
        {headerText[currentLang]}
      </h2>

      {/* Grid for images (2 rows x 4 columns) or Pills for Others */}
      {activeTab !== 'others' ? (
        <div className="grid grid-cols-4 gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item)}
              className="aspect-square bg-white border-2 border-primary rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all flex flex-col items-center justify-center text-4xl"
            >
              <span>{item.image}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onItemClick(item)}
              className="px-6 py-3 bg-white border-2 border-primary rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all text-textDark font-medium"
            >
              {item.name[currentLang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemGrid
