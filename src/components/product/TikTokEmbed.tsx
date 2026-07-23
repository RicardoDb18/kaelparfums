import { useEffect, useRef } from 'react'

interface Props {
  url: string
}

export default function TikTokEmbed({ url }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    container.innerHTML = ''

    const blockquote = document.createElement('blockquote')
    blockquote.className = 'tiktok-embed'
    blockquote.setAttribute('cite', url)

    const id = url.split('/video/')[1]?.split('?')[0]
    if (id) blockquote.setAttribute('data-video-id', id)

    const section = document.createElement('section')
    blockquote.appendChild(section)
    container.appendChild(blockquote)

    const scriptSrc = 'https://www.tiktok.com/embed.js'
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const s = document.createElement('script')
      s.src = scriptSrc
      s.async = true
      document.body.appendChild(s)
    }

    let attempts = 0
    function tryProcess() {
      try {
        if ((window as any).tiktokEmbed?.process) {
          ;(window as any).tiktokEmbed.process()
        } else if (attempts++ < 30) {
          setTimeout(tryProcess, 300)
        }
      } catch {
        if (attempts++ < 30) {
          setTimeout(tryProcess, 300)
        }
      }
    }
    const timer = setTimeout(tryProcess, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [url])

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden bg-black min-h-[500px] flex items-center justify-center"
    />
  )
}
