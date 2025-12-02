import React from 'react'
import AppSidebar from '@/components/Application/Admin/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import Topbar from '@/components/Application/Admin/Topbar'
import { ThemeProvider } from '@/components/Application/Admin/ThemeProvider'

const layout = ({ children }) => {
  // useAuthRedirect('admin');
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >

      <SidebarProvider>
        <AppSidebar />
        <main className='md:w-[calc(100vw-16rem)] w-full'>
          <div className='pt-[70px] md:px-8 px-5 min-h-[calc(100vh-40px)] pb-5 '>
            <Topbar />
            {children}
          </div>

          <div className='border-t h-[40px] flex items-center justify-center bg-gray-50 dark:bg-background'>

            © 2025 Developer Inaam Ul haq™. All Rights Reserved.
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default layout

