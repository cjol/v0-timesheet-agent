"use client"

import { useEffect, useState } from "react"

interface TocItem {
  id: string
  title: string
  count: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -66% 0px",
      }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight

      // At the top
      if (scrollTop < 100) {
        setActiveId(items[0]?.id)
      }
      // At the bottom
      else if (scrollTop + clientHeight >= scrollHeight - 100) {
        setActiveId(items[items.length - 1]?.id)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
      window.removeEventListener("scroll", handleScroll)
    }
  }, [items])

  const handleClick = (id: string) => {
    setActiveId(id)
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-8 hidden xl:block w-64" style={{ top: "20vh" }}>
      <div className="sticky" >
        <ul className="space-y-2 border-l border-border">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`block w-full text-left pl-4 py-1 text-sm transition-colors border-l-2 -ml-px ${
                  activeId === item.id
                    ? "border-foreground text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                {item.title} ({item.count})
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
