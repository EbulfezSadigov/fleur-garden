"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { User } from '@/types'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UpdateUserMutation, UpdatePasswordMutation } from '@/services/auth/mutations'
import { toast } from 'sonner'

function MainProfile({ user }: { user: User }) {
    const updateUserMutation = UpdateUserMutation()

    const ProfileSchema = z.object({
        name: z.string().min(2, { message: "Ad minimum 2 simvol" }),
        email: z.string().email({ message: "Düzgün email daxil edin" }),
        mobile: z.string().min(7, { message: "Düzgün mobil nömrə daxil edin" })
    })

    type ProfileFormValues = z.infer<typeof ProfileSchema>

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: user.name ?? "",
            email: user.email ?? "",
            mobile: user.mobile ?? "",
        },
        mode: "onSubmit"
    })

    function onSubmit(values: ProfileFormValues) {
        updateUserMutation.mutate(values, {
            onSuccess: () => {
                toast.success("Profil məlumatları yeniləndi")
            },
            onError: (error: unknown) => {
                const message = error instanceof Error ? error.message : "Yeniləmə zamanı xəta baş verdi"
                toast.error(message)
            }
        })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Account Information */}
            <div className="py-7 px-6"
                style={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F8",
                    background: "#FFF",
                    boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
                }}
            >
                <div>
                    <h1 className="text-lg font-medium text-gray-900">Hesab Məlumatları</h1>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-600">Ad,soyad</FormLabel>
                                    <FormControl>
                                        <Input className="bg-gray-50 border-gray-200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-600">Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" className="bg-gray-50 border-gray-200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-600">Mobile</FormLabel>
                                    <FormControl>
                                        <Input className="bg-gray-50 border-gray-200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={updateUserMutation.isPending || form.formState.isSubmitting} className="w-fit self-end bg-gray-900 hover:bg-gray-800 text-white mt-6">
                            {updateUserMutation.isPending || form.formState.isSubmitting ? "Yadda saxlanılır..." : "Yadda saxla"}
                        </Button>
                    </form>
                </Form>
            </div>

            {/* Password Reset */}
            <div
                className="py-7 px-6"
                style={{
                    borderRadius: "8px",
                    border: "1px solid #F2F4F8",
                    background: "#FFF",
                    boxShadow: "0 8px 12px 0 rgba(0, 0, 0, 0.03)",
                }}
            >
                <div>
                    <h1 className="text-lg font-medium text-gray-900">Şifrə Yenilənmə</h1>
                </div>
                <PasswordForm />
            </div>
        </div>
    )
}

export default MainProfile

function PasswordForm() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const updatePasswordMutation = UpdatePasswordMutation()

    const PasswordSchema = z.object({
        old_password: z.string().min(1, { message: "Mövcud şifrə tələb olunur" }),
        password: z.string().min(6, { message: "Minimum 6 simvol" }),
        password_confirmation: z.string().min(6, { message: "Minimum 6 simvol" })
    }).refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "Şifrələr uyğun deyil"
    })

    type PasswordFormValues = z.infer<typeof PasswordSchema>

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: { old_password: "", password: "", password_confirmation: "" },
        mode: "onSubmit"
    })

    function onSubmit(values: PasswordFormValues) {
        updatePasswordMutation.mutate(values, {
            onSuccess: () => {
                toast.success("Şifrə yeniləndi")
                form.reset()
                setShowCurrentPassword(false)
                setShowNewPassword(false)
                setShowConfirmPassword(false)
            },
            onError: (error: unknown) => {
                const message = error instanceof Error ? error.message : "Yeniləmə zamanı xəta baş verdi"
                toast.error(message)
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full">
                <FormField
                    control={form.control}
                    name="old_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm text-gray-600">Şifrə</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        id="current-password"
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder="Şifrenizi daxil edin"
                                        className="bg-gray-50 border-gray-200 pr-10"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm text-gray-600">Yeni şifrə</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        id="new-password"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Yeni şifrenizi daxil edin"
                                        className="bg-gray-50 border-gray-200 pr-10"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm text-gray-600">Şifrənin təkrarı</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        id="confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Şifrenizi təkrar edin"
                                        className="bg-gray-50 border-gray-200 pr-10"
                                        {...field}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={updatePasswordMutation.isPending || form.formState.isSubmitting} className="w-fit self-end bg-gray-900 hover:bg-gray-800 text-white mt-6">
                    {updatePasswordMutation.isPending || form.formState.isSubmitting ? "Yadda saxlanılır..." : "Yadda saxla"}
                </Button>
            </form>
        </Form>
    )
}