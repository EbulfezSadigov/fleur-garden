import React from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'

function UserPopover() {
    const t = useTranslations("navigation")
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="border-[#F2F4F8] py-4 font-medium text-[#20201E] rounded-[8px] hover:bg-[#20201E] hover:text-white">
                    <User className="w-4 h-4 mr-2" />
                    {t("login")}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[262px] p-5">
                <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="bg-primary text-white rounded-[12px] hover:bg-primary/80 hover:text-white">
                        {t("login")}
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#F2F4F8] text-[#20201E] rounded-[12px] hover:bg-[#20201E] hover:text-white">
                        {t("register")}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default UserPopover