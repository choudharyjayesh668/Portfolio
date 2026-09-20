import { useState, useEffect } from 'react'
import { GitHubCalendar } from 'react-github-calendar'

export default function GithubCalendarWrapper({ username, year }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[140px] flex items-center justify-center text-xs font-['var(--font-dm-mono)'] text-[#9B9B9B] animate-pulse">
        Loading contributions...
      </div>
    )
  }

  return (
    <GitHubCalendar
      username={username}
      year={year || new Date().getFullYear()}
      colorScheme="dark"
      blockSize={13}
      blockMargin={4}
      fontSize={12}
      showTotalCount={true}
    />
  )
}
