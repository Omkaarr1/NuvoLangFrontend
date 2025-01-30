export function Keywords() {
  const keywords = [
    "use", "print->", "if", "else", "function", "return", "@ENC", "@EVENT_TRIGGER",
    "ml", "blockchain", "data_science", "db",
    "randomforest", "init", "transaction", "showCurrentBalance", "showTransactionHistory",
    "loadCSV", "calculateMean", "calculateMedian", "calculateStdDev", "plotHistogram", "plotScatter", "filterData",
    "connect", "query", "close"
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword) => (
        <span key={keyword} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm">
          {keyword}
        </span>
      ))}
    </div>
  )
}
