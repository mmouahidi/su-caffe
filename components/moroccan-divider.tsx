"use client"

interface MoroccanDividerProps {
  className?: string
  color?: string
}

export function MoroccanDivider({ className = "", color = "currentColor" }: MoroccanDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {/* Left pattern */}
      <svg className="w-8 h-8 opacity-40" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L20 8L28 8L22 14L24 22L16 18L8 22L10 14L4 8L12 8L16 2Z"
          stroke={color}
          strokeWidth="1"
        />
        <circle cx="16" cy="12" r="2" stroke={color} strokeWidth="0.5" />
      </svg>
      
      {/* Center diamond */}
      <svg className="w-4 h-4 opacity-60" viewBox="0 0 16 16" fill={color}>
        <path d="M8 0L16 8L8 16L0 8L8 0ZM8 4L4 8L8 12L12 8L8 4Z" />
      </svg>
      
      {/* Right pattern */}
      <svg className="w-8 h-8 opacity-40" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 2L20 8L28 8L22 14L24 22L16 18L8 22L10 14L4 8L12 8L16 2Z"
          stroke={color}
          strokeWidth="1"
        />
        <circle cx="16" cy="12" r="2" stroke={color} strokeWidth="0.5" />
      </svg>
    </div>
  )
}

export function MoroccanLine({ className = "", color = "currentColor" }: MoroccanDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-current opacity-20" />
      <svg className="w-6 h-6 opacity-40 shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14 6L18 6L15 9L16 13L12 11L8 13L9 9L6 6L10 6L12 2Z"
          stroke={color}
          strokeWidth="1"
        />
      </svg>
      <div className="flex-1 h-px bg-current opacity-20" />
    </div>
  )
}
