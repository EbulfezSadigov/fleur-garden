import Container from '@/components/shared/container'
import ProfileSidebar from '@/components/pages/profile/sidebar'
import React from 'react'

function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="py-8">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-4 items-start">
                    {/* Sidebar */}
                    <ProfileSidebar />
                    {/* Main Content */}
                    {children}
                </div>
            </Container>
        </section>
    )
}

export default ProfileLayout