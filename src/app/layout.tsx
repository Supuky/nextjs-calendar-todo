import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DateProvider } from './context/dateContext'
import { TodoListProvider } from './context/todoListContext'
import { TodoProvider } from './context/todoContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Todo list demo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className} suppressHydrationWarning={true}>
      <DateProvider>
          <TodoListProvider>
            <TodoProvider >
                {children}
            </TodoProvider>
          </TodoListProvider>
      </DateProvider>
      </body>
    </html>
  )
}
