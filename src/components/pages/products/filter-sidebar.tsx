"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {ChevronDownIcon, ChevronUpIcon } from "lucide-react"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

  return (
    <div className="border-b border-[#F2F4F8] py-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-sm font-medium text-primary"
      >
        <span>{title}</span>
        <span className="text-gray-400">{isOpen ? <ChevronDownIcon/> : <ChevronUpIcon/>}</span>
      </button>
      {isOpen && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  )
}

export interface FilterSidebarProps {
  className?: string
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <aside
      className={`w-full lg:w-[280px] rounded-[12px] bg-white border border-[#F2F4F8] p-4 ${className ?? ""}`}
      style={{ boxShadow: "0px 8px 12px 0px #00000008" }}
    >
      <FilterSection title="Qiymət" defaultOpen>
        <div className="flex items-center gap-3">
          <Input placeholder="Min" className="h-9" />
          <span className="text-sm text-[#77777B]">—</span>
          <Input placeholder="Max" className="h-9" />
        </div>
        <PriceSlider min={0} max={5600} step={10} />
      </FilterSection>

      <FilterSection title="Məhsul" defaultOpen>
        <label className="flex items-center gap-2 text-sm text-primary">
          <Checkbox /> Endirimli məhsullar
        </label>
        <label className="flex items-center gap-2 text-sm text-primary">
          <Checkbox /> Ən yeni
        </label>
        <label className="flex items-center gap-2 text-sm text-primary">
          <Checkbox /> Ən çox satılanlar
        </label>
      </FilterSection>

      <FilterSection title="Brend" defaultOpen>
        <Input placeholder="Axtarın" className="h-9" />
        <div className="max-h-40 overflow-auto pr-1 space-y-2 mt-2">
          {[
            "Dior",
            "Chanel",
            "Versace",
            "YSL Libre",
            "Dolce & Gabbana",
            "Gucci",
            "Tom Ford",
            "Burberry",
          ].map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm text-primary">
              <Checkbox /> {brand}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Qoxu tipi" defaultOpen>
        {[
          { id: "woman", label: "Qadın" },
          { id: "man", label: "Kişi" },
          { id: "unisex", label: "Unisex" },
        ].map((g) => (
          <label key={g.id} className="flex items-center gap-2 text-sm text-primary">
            <Checkbox /> {g.label}
          </label>
        ))}
      </FilterSection>
    </aside>
  )
}

export default FilterSidebar

interface PriceSliderProps {
  min: number
  max: number
  step?: number
}

function PriceSlider({ min, max, step = 1 }: PriceSliderProps) {
  const [minValue, setMinValue] = useState<number>(min)
  const [maxValue, setMaxValue] = useState<number>(max)

  const minPercent = useMemo(() => ((minValue - min) / (max - min)) * 100, [minValue, min, max])
  const maxPercent = useMemo(() => ((maxValue - min) / (max - min)) * 100, [maxValue, min, max])

  function handleMinChange(value: number) {
    if (value <= maxValue) setMinValue(value)
  }

  function handleMaxChange(value: number) {
    if (value >= minValue) setMaxValue(value)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm text-primary mb-2">
        <span>{min}</span>
        <span>{max}AZN</span>
      </div>

      <div className="relative h-6 select-none">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[6px] bg-[#F2F4F8] rounded-full" />

        <div
          className="absolute top-1/2 -translate-y-1/2 h-[6px] bg-primary rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minValue}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute inset-0 appearance-none bg-transparent pointer-events-auto"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxValue}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute inset-0 appearance-none bg-transparent pointer-events-auto"
        />

        <style jsx>{`
          input[type='range']::-webkit-slider-thumb { 
            -webkit-appearance: none; appearance: none; width: 20px; height: 20px; 
            background: white; border: 3px solid #1F2937; border-radius: 50%; cursor: pointer;
            box-shadow: 0 1px 2px rgba(0,0,0,0.08);
          }
          input[type='range']::-moz-range-thumb { 
            width: 20px; height: 20px; background: white; border: 3px solid #1F2937; border-radius: 50%; cursor: pointer;
          }
          input[type='range'] { 
            pointer-events: none; /* allow dragging only on thumbs */
          }
        `}</style>
      </div>
    </div>
  )
}

