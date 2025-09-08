"use client"

import Container from '@/components/shared/container'
import Image from 'next/image'
import React from 'react'
import { Product } from '@/types'

interface ComparisonItem {
    id: number
    product: Product
}

function ComparisonPage() {
    const [items, setItems] = React.useState<ComparisonItem[]>([])

    React.useEffect(() => {
        try {
            const raw = window.localStorage.getItem('comparison')
            const parsed: ComparisonItem[] = raw ? JSON.parse(raw) : []
            setItems(parsed)
        } catch {
            setItems([])
        }

        function handleStorage(e: StorageEvent) {
            if (e.key === 'comparison') {
                try {
                    const next: ComparisonItem[] = e.newValue ? JSON.parse(e.newValue) : []
                    setItems(next)
                } catch {
                    setItems([])
                }
            }
        }

        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
    }, [])

    function removeItem(productId: number) {
        try {
            const next = items.filter((x) => x.id !== productId)
            setItems(next)
            window.localStorage.setItem('comparison', JSON.stringify(next))
            window.dispatchEvent(new CustomEvent('comparisonChanged'))
        } catch {}
    }

    function clearAll() {
        try {
            setItems([])
            window.localStorage.setItem('comparison', JSON.stringify([]))
            window.dispatchEvent(new CustomEvent('comparisonChanged'))
        } catch {}
    }

    const hasItems = items.length > 0

    return (
        <div className="w-full py-9">
            <Container>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="md:text-[32px] text-[28px] font-medium">Məhsul müqayisəsi</h1>
                    {hasItems && (
                        <button onClick={clearAll} className="text-sm text-primary hover:underline">Hamısını sil</button>
                    )}
                </div>

                {!hasItems ? (
                    <div className="text-center text-gray-600 py-16">Müqayisə siyahısı boşdur</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-[800px] w-full border-separate border-spacing-y-2" style={{ width: 'max-content' }}>
                            <thead>
                                <tr className="bg-gray-50 border-b border-[#E8EAED]">
                                    <th className="w-64 text-left px-6 py-4 font-medium text-gray-700"></th>
                                    {items.map((x) => (
                                        <th key={`remove-${x.id}`} className="w-48 px-6 py-4 text-gray-600 font-normal">
                                            <button onClick={() => removeItem(x.id)} className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                                                <span aria-hidden>×</span>
                                                <span>Sil</span>
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                                <tr>
                                    <th className="px-6 py-6 bg-gray-50 font-medium text-xl" >Məhsul Müqayisəsi</th>
                                    {items.map((x) => (
                                        <th key={`image-${x.id}`} className="w-48 px-6 py-6 border-y border-gray-200">
                                            <div className="mx-auto h-28 w-20 relative">
                                                <Image
                                                    src={x.product.image}
                                                    alt={x.product.brand}
                                                    fill
                                                    sizes="80px"
                                                    className="object-contain"
                                                />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-[#E8EAED]">
                                    <td className="bg-gray-50 px-6 py-4 text-gray-700 font-medium text-xl text-center">Brend</td>
                                    {items.map((x) => (
                                        <td key={`brand-${x.id}`} className="w-48 px-6 py-4 text-center border-y border-gray-200">{x.product.brand}</td>
                                    ))}
                                </tr>

                                <tr className="border-t border-[#E8EAED]">
                                    <td className="bg-gray-50 px-6 py-4 text-gray-700 font-medium text-xl text-center">Məhsul</td>
                                    {items.map((x) => (
                                        <td key={`name-${x.id}`} className="w-48 px-6 py-4 text-center border-y border-gray-200">{x.product.name}</td>
                                    ))}
                                </tr>

                                <tr className="border-t border-[#E8EAED]">
                                    <td className="bg-gray-50 px-6 py-4 text-gray-700 font-medium text-xl text-center">Qiymət</td>
                                    {items.map((x) => (
                                        <td key={`price-${x.id}`} className="w-48 px-6 py-4 text-center border-y border-gray-200">{x.product.price}</td>
                                    ))}
                                </tr>

                                <tr className="border-t border-[#E8EAED]">
                                    <td className="bg-gray-50 px-6 py-4 text-gray-700 font-medium text-xl text-center">Stok vəziyyəti</td>
                                    {items.map((x) => (
                                        <td key={`stock-${x.id}`} className="w-48 px-6 py-4 text-center border-y border-gray-200">
                                            {x.product.inStock ? (
                                                <span className="inline-flex items-center gap-2 text-green-600">
                                                    <span className="text-lg" aria-hidden>✓</span>
                                                    <span>Stokda</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 text-red-600">
                                                    <span className="text-lg" aria-hidden>✕</span>
                                                    <span>Stokda deyil</span>
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default ComparisonPage