"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
    { id: "orders", label: "Sifarış və Ödəniş" },
    { id: "delivery", label: "Çatdırılma və Qaytarma" },
    { id: "products", label: "Məhsullar və Keyfiyyət" },
]

const faqData = {
    orders: [
        {
            question: "Minimum sifarış miqdarı nə qədərdir?",
            answer: "Minimum sifarış miqdarı 50 AZN təşkil edir.",
        },
        {
            question: "Hansı ödəniş üsulları mövcuddur?",
            answer: "Kartla ödəniş və nağd hesablaşma mövcuddur.",
        },
        {
            question: "Sifarış verdikdən sonra dəyişiklik edə bilərəmmi?",
            answer: "Sifarişiniz hazırlanmağa başlamazdan əvvəl dəyişiklik etmək mümkündür.",
        },
        {
            question: "Sifarişimi necə izləyə bilərəm?",
            answer: "Sifarişinizi hesabınızdan və ya SMS vasitəsilə izləyə bilərsiniz.",
        },
        {
            question: "Qiymətlərə əlavə vergi daxildirmi?",
            answer: "Bəli, göstərilən qiymətlərə bütün vergilər daxildir.",
        },
        {
            question: "Qaime-faktura təqdim olunurmu?",
            answer: "Bəli, istəyiniz əsasında qaime-faktura təqdim edilir.",
        },
    ],
    delivery: [
        {
            question: "Çatdırılma müddəti nə qədərdir?",
            answer: "Çatdırılma müddəti 1-3 iş günü təşkil edir.",
        },
        {
            question: "Çatdırılma haqqı nə qədərdir?",
            answer: "50 AZN-dən yuxarı sifarişlər üçün çatdırılma pulsuzdur.",
        },
    ],
    products: [
        {
            question: "Məhsulların keyfiyyət zəmanəti varmı?",
            answer: "Bəli, bütün məhsullarımız üçün keyfiyyət zəmanəti verilir.",
        },
        {
            question: "Məhsulu qaytarmaq mümkündürmü?",
            answer: "14 gün ərzində məhsulu qaytarmaq mümkündür.",
        },
    ],
}

export default function FAQSection() {
    return (
        <div className="col-span-3 lg:pl-8 lg:px-6 mt-5 lg:mt-0 space-y-6">
            <h1
                style={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F8",
                    background: "#FFF",
                    boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
                }} className="text-2xl font-semibold mb-8 text-gray-900 p-4">Yardım</h1>

            {/* Tab Navigation */}
            <div
                className="py-9 px-8"
                style={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F8",
                    background: "#FFF",
                    boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
                }}>
                <Tabs defaultValue="orders">
                    <TabsList className="grid grid-cols-3 gap-1 mb-8 bg-gray-100 p-1 rounded-lg">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="flex-1 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 text-gray-600"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent key={tab.id} value={tab.id}>
                            <Accordion type="single" collapsible className="space-y-4">
                                {faqData[tab.id as keyof typeof faqData].map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6 py-2">
                                        <AccordionTrigger className="text-left text-gray-900 hover:no-underline py-4">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 pb-4">
                                            <div className="flex items-start gap-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                                <p>{faq.answer}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}
