import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CircleUserRound } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LoginSheet, useLoginSheet } from './login-sheet'
import { RegisterSheet, useRegisterSheet } from './register-sheet'

function UserPopover() {
    const t = useTranslations("navigation")
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const { isOpen: isLoginOpen, isAnimating: isLoginAnimating, handleClose: handleLoginClose, handleToggle: handleLoginToggle } = useLoginSheet()
    const { isOpen: isRegisterOpen, isAnimating: isRegisterAnimating, handleClose: handleRegisterClose, handleToggle: handleRegisterToggle } = useRegisterSheet()
    
    const handleLoginClick = () => {
        handleLoginToggle()
        if (!isLoginOpen) {
            handleRegisterClose() // Close register sheet if opening login
        }
        setIsPopoverOpen(false) // Close popover when opening login sheet
    }
    
    const handleRegisterClick = () => {
        handleRegisterToggle()
        if (!isRegisterOpen) {
            handleLoginClose() // Close login sheet if opening register
        }
        setIsPopoverOpen(false) // Close popover when opening register sheet
    }
    
    return (
        <>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="border-[#F2F4F8] py-4 font-medium text-[#20201E] rounded-full md:rounded-[8px] hover:bg-[#20201E] hover:text-white">
                        <CircleUserRound className="w-4 h-4 md:mr-2" />
                        <span className="hidden md:block">{t("login")}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[262px] p-5 z-[150]">
                    <div className="flex flex-col gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-primary text-white rounded-[12px] hover:bg-primary/80 hover:text-white"
                            onClick={handleLoginClick}
                        >
                            {t("login")}
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-[#F2F4F8] text-[#20201E] rounded-[12px] hover:bg-[#20201E] hover:text-white"
                            onClick={handleRegisterClick}
                        >
                            {t("register")}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            
            <LoginSheet 
                isOpen={isLoginOpen}
                isAnimating={isLoginAnimating}
                onClose={handleLoginClose}
                onOpenRegister={handleRegisterClick}
            />
            
            <RegisterSheet
                isOpen={isRegisterOpen}
                isAnimating={isRegisterAnimating}
                onClose={handleRegisterClose}
                onOpenLogin={handleLoginClick}
            />
        </>
    )
}

export default UserPopover