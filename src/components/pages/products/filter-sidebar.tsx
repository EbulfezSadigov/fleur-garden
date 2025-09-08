"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

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
        <span className="text-gray-400">{isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}</span>
      </button>
      {isOpen && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  )
}

export interface FilterSidebarProps {
  className?: string
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  const t = useTranslations("product_grid")
  return (
    <aside
      className={`w-full lg:w-[280px] rounded-[12px] bg-white border border-[#F2F4F8] p-4 ${className ?? ""}`}
      style={{ boxShadow: "0px 8px 12px 0px #00000008" }}
    >
      <FilterSection title={t("price")} defaultOpen>
        <div className="flex items-center gap-3">
          <Input placeholder="Min" className="h-9" />
          <span className="text-sm text-[#77777B]">—</span>
          <Input placeholder="Max" className="h-9" />
        </div>
        <PriceRangeSlider min={0} max={5600} step={10} />
      </FilterSection>

      <FilterSection title={t("product")} defaultOpen>
        <label className="flex items-center gap-2 text-sm text-primary">
          <Checkbox className="border-primary" /> {t("discounted_products")}
        </label>
        <label className="flex items-center gap-2 text-sm text-primary">
          <Checkbox className="border-primary" /> {t("new_products")}
        </label>
        <label className="flex items-center gap-2 text-sm text-primary">
          <Checkbox className="border-primary" /> {t("best_sellers")}
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
              <Checkbox className="border-primary" /> {brand}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title={t("type")} defaultOpen>
        {[
          { id: "woman", label: t("woman") },
          { id: "man", label: t("man") },
          { id: "unisex", label: t("unisex") },
        ].map((g) => (
          <label key={g.id} className="flex items-center gap-2 text-sm text-primary">
            <Checkbox className="border-primary" /> {g.label}
          </label>
        ))}
      </FilterSection>
    </aside>
  )
}

export default FilterSidebar

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  className?: string;
  currency?: string;
}

function PriceRangeSlider({
  min = 0,
  max = 5600,
  step = 10,
  defaultValue = [0, 5600],
  onValueChange,
  className,
  currency = "AZN",
}: PriceRangeSliderProps) {
  const [value, setValue] = useState<[number, number]>(defaultValue);

  const handleValueChange = (newValue: number[]) => {
    const rangeValue: [number, number] = [newValue[0], newValue[1]];
    setValue(rangeValue);
    onValueChange?.(rangeValue);
  };

  const formatPrice = (price: number): string => {
    return `${price.toLocaleString()} ${currency}`;
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Price Display */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          {formatPrice(value[0])}
        </div>
        <div className="text-sm font-medium text-gray-700">
          {formatPrice(value[1])}
        </div>
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={value}
          onValueChange={handleValueChange}
          min={min}
          max={max}
          step={step}
          className="w-full"
          minStepsBetweenThumbs={1}
        />
      </div>
    </div>
  );
}