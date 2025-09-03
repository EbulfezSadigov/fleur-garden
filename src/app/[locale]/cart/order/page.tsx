"use client"

import React from 'react'
import Image from 'next/image'

import Container from '@/components/shared/container'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CheckoutItem {
    id: string
    title: string
    brand: string
    volume: string
    price: number
    qty: number
}

function formatCurrency(amount: number) {
    return `${amount.toFixed(2)} AZN`
}

function Order() {
    const [items] = React.useState<CheckoutItem[]>([
        { id: '1', title: 'YSL Libre', brand: 'Yves Saint Laurent', volume: '50 ML', price: 155.3, qty: 1 },
        { id: '2', title: 'YSL Libre', brand: 'Yves Saint Laurent', volume: '50 ML', price: 155.3, qty: 1 },
    ])

    const [payment, setPayment] = React.useState<'card' | 'cod'>('card')
    const [fullName, setFullName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [city, setCity] = React.useState('Bakı')
    const [address, setAddress] = React.useState('')
    const [note, setNote] = React.useState('')

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const discount = 10.6
    const total = subtotal - discount

    return (
        <Container className="py-6 md:py-10">
            <Breadcrumb className="mb-6 md:mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Ana səhifə</BreadcrumbLink>
                    </BreadcrumbItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_355_8453)">
                            <path d="M11.3332 3.33337L4.6665 12.6667" stroke="#D3D3D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_355_8453">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Səbətim</BreadcrumbLink>
                    </BreadcrumbItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_355_8453)">
                            <path d="M11.3332 3.33337L4.6665 12.6667" stroke="#D3D3D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_355_8453">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Sifarişin rəsmiləşdirilməsi</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <div className="text-xl md:text-2xl font-semibold mb-4 p-4" style={{ borderRadius: '10px', border: '1px solid #F2F4F8', background: '#FFF' }}>Sifarişin rəsmiləşdirilməsi</div>
                    <div className="p-5 md:p-6 space-y-6" style={{ borderRadius: '10px', border: '1px solid #F2F4F8', background: '#FFF' }}>
                        <div className="space-y-2">
                            <div className="text-lg font-semibold">Ödəniş Üsulu</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer ${payment === 'card' ? 'border-primary' : 'border-[#F2F4F8]'}`}>
                                    <input type="radio" name="payment" className="sr-only" checked={payment === 'card'} onChange={() => setPayment('card')} />
                                    <span className="size-4 rounded-full border border-[#E4E7EC] grid place-content-center">
                                        <span className={`size-2 rounded-full ${payment === 'card' ? 'bg-primary' : 'bg-transparent'}`} />
                                    </span>
                                    <span>Bank kartı vasitəsilə onlayn ödəniş</span>
                                </label>
                                <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer ${payment === 'cod' ? 'border-primary' : 'border-[#F2F4F8]'}`}>
                                    <input type="radio" name="payment" className="sr-only" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                                    <span className="size-4 rounded-full border border-[#E4E7EC] grid place-content-center">
                                        <span className={`size-2 rounded-full ${payment === 'cod' ? 'bg-primary' : 'bg-transparent'}`} />
                                    </span>
                                    <span>Təhvil alarkən nağd ödəniş</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-lg font-semibold">Şəxsi Məlumat</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input placeholder="Ad,soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                <div className="flex gap-2">
                                    <div className="w-24">
                                        <Input readOnly value={'+994'} />
                                    </div>
                                    <Input placeholder="Telefon nömrənizi daxil edin" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-lg font-semibold">Çatdırılma Məlumatları</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Select value={city} onValueChange={setCity}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Şəhər" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bakı">Bakı</SelectItem>
                                        <SelectItem value="Gəncə">Gəncə</SelectItem>
                                        <SelectItem value="Sumqayıt">Sumqayıt</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input placeholder="Ünvanı qeyd edin" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <Textarea placeholder="Sifariş barədə əlavə qeydləriniz varsa qeyd edin" value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="h-11 flex-1">Ləğv et</Button>
                            <Button className="h-11 flex-1">Davam et</Button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 sticky top-0">
                    <div className="p-5 md:p-6 space-y-5" style={{ borderRadius: '10px', border: '1px solid #F2F4F8', background: '#FFF' }}>
                        <div className="text-lg md:text-xl font-semibold">Səbət ({items.length} məhsul)</div>

                        <div className="space-y-4">
                            {items.map((i) => (
                                <div key={i.id} className="flex items-start gap-3">
                                    <Image src="/images/product.jpg" alt={i.title} width={64} height={64} className="rounded-md object-cover" />
                                    <div className="flex-1">
                                        <div className="font-medium">{i.title}</div>
                                        <div className="text-muted-foreground text-sm">{i.brand} • {i.volume}</div>
                                        <div className="text-sm">(X{i.qty}) {formatCurrency(i.price)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between"><span>Ümumi Qiymət</span><span className="font-medium">{formatCurrency(subtotal)}</span></div>
                            <div className="flex items-center justify-between"><span>Endirim</span><span className="font-medium">{formatCurrency(discount)}</span></div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex items-center justify-between text-lg font-semibold"><span>Yekun qiymət</span><span>{formatCurrency(total)}</span></div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Order