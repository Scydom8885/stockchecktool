const ItemGrid = ({ items, activeTab, currentLang, onItemClick }) => {
  const headerText = {
    mm: 'ပစ္စည်းများရွေးချယ်ပါ',
    en: 'SELECT ITEMS',
    zh: '选择物品',
  }

  // Helper function to render item image (emoji or webp)
  const renderImage = (image) => {
    if (image.startsWith('/')) {
      // It's a file path - render as img tag (full cover)
      return (
        <img
          src={image}
          alt="item"
          className="w-full h-full object-cover"
        />
      )
    } else {
      // It's an emoji - render as text
      return <span className="text-4xl">{image}</span>
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-textDark font-semibold mb-4 text-lg">
        {headerText[currentLang]}
      </h2>

      {/* Grid for all items (now includes Others with images) - 3 columns for bigger images */}
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`aspect-square bg-white border-2 border-primary rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all overflow-hidden ${
              item.image.startsWith('/') ? '' : 'flex items-center justify-center'
            }`}
          >
            {renderImage(item.image)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ItemGrid
