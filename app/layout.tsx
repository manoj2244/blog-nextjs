// app/layout.tsx
import './globals.css'
import { Toaster } from 'react-hot-toast'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  )
}
