// Chart utils sẽ được thêm từ page.tsx

// Utility functions for charts and data processing

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Cơ bản":
      return "bg-green-100 text-green-800"
    case "Nâng cao":
      return "bg-yellow-100 text-yellow-800"
    case "Cao cấp":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getPerformanceColor = (score: number) => {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  return "text-red-600"
}

export const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`
}

export const formatNumber = (value: number) => {
  return value.toLocaleString()
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
} 