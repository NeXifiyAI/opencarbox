'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProductSortProps {
  onSortChange?: (value: string) => void
}

export function ProductSort({ onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-slate-500 sm:inline">Sortieren nach:</span>
      <Select onValueChange={onSortChange} defaultValue="relevance">
        <SelectTrigger className="w-[180px] border-slate-200 bg-white">
          <SelectValue placeholder="Sortierung" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevanz</SelectItem>
          <SelectItem value="price-asc">Preis aufsteigend</SelectItem>
          <SelectItem value="price-desc">Preis absteigend</SelectItem>
          <SelectItem value="newest">Neuheiten</SelectItem>
          <SelectItem value="rating">Bewertung</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
