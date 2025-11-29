const Tabs = ({ activeTab, onTabChange, currentLang }) => {
  const tabs = [
    { id: 'main', label: { mm: 'အဓိက', en: 'Main', zh: '主要' } },
    { id: 'packaging', label: { mm: 'ထုပ်ပိုးခြင်း', en: 'Packaging', zh: '包装' } },
    { id: 'others', label: { mm: 'အခြား', en: 'Others', zh: '其他' } },
  ]

  return (
    <div className="bg-white shadow-sm px-4 py-2 flex gap-2 sticky top-16 z-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-200 text-textDark hover:bg-gray-300'
          }`}
        >
          {tab.label[currentLang]}
        </button>
      ))}
    </div>
  )
}

export default Tabs
