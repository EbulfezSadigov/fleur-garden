"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check } from "lucide-react"
import Link from "next/link"

interface OrderItem {
    id: string
    title: string
    brand: string
    imageSrc: string
    volume: string
    rating: number
}

interface Order {
    id: string
    createdAt: string // ISO date string
    recipient: string
    quantity: number
    totalAzn: number
    status: "delivered" | "processing" | "cancelled"
    items: OrderItem[]
}

function daysBetween(fromIso: string, to: Date): number {
    const from = new Date(fromIso)
    const diffMs = Math.abs(to.getTime() - from.getTime())
    return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

const MOCK_ORDERS: Order[] = [
    {
        id: "ord_1",
        createdAt: "2025-08-25",
        recipient: "Aysun Feyzullayeva",
        quantity: 10,
        totalAzn: 1200,
        status: "delivered",
        items: [
            {
                id: "itm_1",
                title: "YSL Libre",
                brand: "Yves Saint Laurent",
                imageSrc: "/images/product.jpg",
                volume: "50 ML",
                rating: 4.5,
            },
        ],
    },
    {
        id: "ord_2",
        createdAt: "2025-08-25",
        recipient: "Aysun Feyzullayeva",
        quantity: 10,
        totalAzn: 1200,
        status: "delivered",
        items: [
            {
                id: "itm_2",
                title: "YSL Libre",
                brand: "Yves Saint Laurent",
                imageSrc: "/images/product.jpg",
                volume: "50 ML",
                rating: 4.5,
            },
        ],
    },
    {
        id: "ord_3",
        createdAt: "2025-08-25",
        recipient: "Aysun Feyzullayeva",
        quantity: 10,
        totalAzn: 1200,
        status: "delivered",
        items: [
            {
                id: "itm_3",
                title: "YSL Libre",
                brand: "Yves Saint Laurent",
                imageSrc: "/images/product.jpg",
                volume: "50 ML",
                rating: 4.5,
            },
        ],
    },
]

export function StatusBadge({ status }: { status: Order["status"] }) {
    if (status === "delivered")
        return (
            <div className="inline-flex items-center gap-2">
                <Check color="#34C759" size={20} />
                <span>Çatdırıldı</span>
            </div>
        )
    if (status === "processing")
        return <span className="text-amber-600">Hazırlanır</span>
    return <span className="text-rose-600">Ləğv edildi</span>
}

function OrderCard({ order }: { order: Order }) {
    const item = order.items[0]
    return (
        <div
            style={{
                borderRadius: "12px",
                border: "1px solid #F2F4F8",
                background: "#FFF",
                boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
            }}
        >
            <div className="grid grid-cols-5 gap-4 px-6 py-4 text-sm text-muted-foreground">
                <div>
                    <div className="font-medium text-foreground">Sifariş tarixi</div>
                    <div>{new Date(order.createdAt).toLocaleDateString("az-AZ")}</div>
                </div>
                <div>
                    <div className="font-medium text-foreground">Alıcı</div>
                    <div>{order.recipient}</div>
                </div>
                <div>
                    <div className="font-medium text-foreground">Həcm</div>
                    <div>{item.volume}</div>
                </div>
                <div>
                    <div className="font-medium text-foreground">Miqdar</div>
                    <div>{order.quantity} ədəd</div>
                </div>
                <div className="text-right">
                    <div className="font-medium text-foreground">Toplam</div>
                    <div>{order.totalAzn} AZN</div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-[#F2F4F8] px-6 py-5">
                <div className="flex gap-4">
                    <div className="h-20 w-16 overflow-hidden rounded-md bg-muted">
                        <Image
                            src={item.imageSrc}
                            alt={item.title}
                            width={64}
                            height={80}
                            className="h-20 w-16 object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-base font-medium">
                            <span>{item.title}</span>
                            <span className="text-amber-500">★</span>
                            <span className="text-sm text-muted-foreground">{item.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.brand}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <StatusBadge status={order.status} />
                    <Link href={`/profile/orders/${order.id}`}>
                        <Button variant="secondary" className="bg-black hover:bg-black/80 text-white">Sifariş detalları</Button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default function OrdersList() {
    const [timeFilter, setTimeFilter] = useState("30")
    const filtered = useMemo(() => {
        const now = new Date()
        const limit = parseInt(timeFilter, 10)
        return MOCK_ORDERS.filter((o) => daysBetween(o.createdAt, now) <= limit)
    }, [timeFilter])

    return (
        <div className="w-full col-span-3 lg:pl-8 lg:px-6 mt-5 lg:mt-0 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between p-4"
                style={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F8",
                    background: "#FFF",
                    boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
                }}
            >
                <h1 className="text-xl font-medium">Sifarişlər</h1>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Zaman aralığı" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">Son 7 gün</SelectItem>
                        <SelectItem value="30">Son 30 gün</SelectItem>
                        <SelectItem value="90">Son 90 gün</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-6">
                {filtered.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    )
}
