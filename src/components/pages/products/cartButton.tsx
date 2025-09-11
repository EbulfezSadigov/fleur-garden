import { useTranslations } from 'next-intl'
import React, { Fragment } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { ArrowRight } from 'lucide-react'
import { Product } from '@/types'

function CartButton({ product }: { product: Product }) {
    const [isOpen, setIsOpen] = React.useState(false)
    const t = useTranslations("product_card")

    function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const storageKey = 'cart'
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
            // Normalize to the cart schema consumed by cart pages
            type CartItem = {
                id: string
                title: string
                brand: string
                volume: string
                price: number
                qty: number
                selected: boolean
                image: string
            }
            const cart: CartItem[] = raw ? JSON.parse(raw) : []

            const id = String(product.id)
            const existingIndex = cart.findIndex(item => item.id === id)
            if (existingIndex >= 0) {
                cart[existingIndex].qty += 1
            } else {
                cart.push({
                    id,
                    title: product.name,
                    brand: product.brand_name ?? '',
                    volume: '50 ML',
                    price: product.price,
                    qty: 1,
                    selected: true,
                    image: product.image || ''
                })
            }

            window.localStorage.setItem(storageKey, JSON.stringify(cart))
            setIsOpen(true)
        } catch (error) {
            console.error('Failed to write cart to localStorage', error)
        }
    }

    return (
        <Fragment>
            <button onClick={handleAddToCart} className="bg-primary text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                {t("add_to_cart")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open)
                if (!open) {
                    setTimeout(() => {
                    }, 0)
                }
            }}>
                <DialogContent className="max-w-xl p-0" onClick={(e) => e.stopPropagation()}>
                    <div className="p-4 sm:p-6">
                        <DialogHeader>
                            <DialogTitle>{t("add_to_cart_dialog")}</DialogTitle>
                            <DialogDescription />
                        </DialogHeader>

                        <div className="mt-4 grid grid-cols-[72px_1fr_auto] gap-4 items-center">
                            <div className="w-18 h-18 bg-white py-3 rounded-md border flex items-center justify-center overflow-hidden">
                                <Image
                                    width={72}
                                    height={72}
                                    src={product.image || '/placeholder.svg'}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-primary">{product.name}</p>
                                <p className="text-xs text-[#77777B] mt-1">{product.brand_name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-primary">(x1) {product.price} AZN</p>
                                <p className="text-[10px] text-muted-foreground">200 ml (1.50 a/ml)</p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between text-xs text-[#77777B] border-t pt-2">
                            <span>{t("in_cart")}</span>
                            <span className="text-primary">{t("initial_price")} {product.price}</span>
                        </div>

                        <div className="mt-4 w-full flex justify-end gap-2">
                            <Link
                                href={`/cart`}
                                className="flex gap-2 items-center bg-primary text-white rounded-md px-3 py-2 text-xs text-center"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.stopPropagation()
                                    setIsOpen(false)
                                }}
                            >
                                {t("cross_basket")} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default CartButton