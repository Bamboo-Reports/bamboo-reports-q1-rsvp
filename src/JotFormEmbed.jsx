import { useState, useCallback, useEffect, useId, useRef } from 'react'
import { ensureJotformEmbedHandler } from './lib/jotform'

/**
 * JotForm embed with a loading skeleton.
 * Shows a form-like placeholder while the iframe loads, then fades it
 * out once the form signals it is ready (with a timed fallback).
 */
function JotFormEmbed({ formId, title, height = '539px', className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef(null)
  const fallbackTimerRef = useRef(null)
  const resetTimerRef = useRef(null)
  const reactId = useId()
  const iframeId = `JotFormIFrame-${formId}-${reactId.replace(/:/g, '')}`
  const embedSrc = `https://form.jotform.com/${formId}?isIframeEmbed=1`

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current === null) return
    window.clearTimeout(fallbackTimerRef.current)
    fallbackTimerRef.current = null
  }, [])

  const showForm = useCallback(() => {
    clearFallbackTimer()
    setIsLoaded(true)
  }, [clearFallbackTimer])

  const resetForm = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    clearFallbackTimer()
    setIsLoaded(false)
    iframe.src = `${embedSrc}&_ts=${Date.now()}`
    fallbackTimerRef.current = window.setTimeout(showForm, 4000)
  }, [clearFallbackTimer, embedSrc, showForm])

  useEffect(() => {
    fallbackTimerRef.current = window.setTimeout(showForm, 4000)

    ensureJotformEmbedHandler().then(() => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          `iframe[id='${iframeId}']`,
          'https://form.jotform.com/'
        )
      }
    })

    return () => {
      clearFallbackTimer()
    }
  }, [clearFallbackTimer, iframeId, showForm])

  useEffect(() => {
    const handleMessage = (event) => {
      const origin = String(event.origin || '').toLowerCase()
      const data = event.data
      if (!origin.includes('jotform')) return

      if (typeof data === 'string') {
        const message = data.toLowerCase()
        if (
          message.includes(formId.toLowerCase()) ||
          message.includes('setheight')
        ) {
          showForm()
        }
        if (
          message.includes('submission-completed') ||
          message.includes('thankyou') ||
          message.includes('form-submit')
        ) {
          resetTimerRef.current = window.setTimeout(resetForm, 1200)
        }
        return
      }

      if (typeof data === 'object' && data) {
        const signal = String(
          data.event || data.type || data.action || data.message || ''
        ).toLowerCase()

        if (
          signal.includes(formId.toLowerCase()) ||
          signal.includes('setheight')
        ) {
          showForm()
        }
        if (
          signal.includes('submission-completed') ||
          signal.includes('thankyou') ||
          signal.includes('form-submit')
        ) {
          resetTimerRef.current = window.setTimeout(resetForm, 1200)
        }
      }
    }

    const handlePageShow = (event) => {
      if (event.persisted) {
        resetForm()
      }
    }

    window.addEventListener('message', handleMessage)
    window.addEventListener('pageshow', handlePageShow)

    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('pageshow', handlePageShow)
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
        resetTimerRef.current = null
      }
    }
  }, [embedSrc, formId, resetForm, showForm])

  const handleLoad = () => {
    // Small delay so the form has a moment to render its content
    window.setTimeout(showForm, 150)
  }

  return (
    <div className={`jf-embed ${className}`} style={{ height }}>
      {/* Loading skeleton */}
      <div
        className={`jf-skeleton ${isLoaded ? 'is-hidden' : ''}`}
        aria-hidden={isLoaded}
      >
        <div className="jf-skeleton-inner">
          <div className="jf-dots">
            <span className="jf-dot" />
            <span className="jf-dot" />
            <span className="jf-dot" />
          </div>
          <div className="jf-field">
            <div className="jf-label" />
            <div className="jf-input" />
          </div>
          <div className="jf-field">
            <div className="jf-label jf-label--wide" />
            <div className="jf-input" />
          </div>
          <div className="jf-field">
            <div className="jf-label jf-label--narrow" />
            <div className="jf-input" />
          </div>
          <div className="jf-btn" />
        </div>
        <p className="jf-loading-text">Loading form…</p>
      </div>

      {/* Actual JotForm iframe */}
      <iframe
        ref={iframeRef}
        id={iframeId}
        title={title}
        allowTransparency="true"
        allow="geolocation; microphone; camera; fullscreen; payment"
        src={embedSrc}
        frameBorder="0"
        style={{ minWidth: '100%', maxWidth: '100%', height, border: 'none' }}
        scrolling="no"
        onLoad={handleLoad}
        loading="eager"
        className="jf-iframe"
      />
    </div>
  )
}

export default JotFormEmbed
