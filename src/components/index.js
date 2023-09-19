import React from 'react'
import style from './assets/style.module.css'
import { useState, useEffect } from 'react'

export default function Quote() {
  const categories = [
    'age',
    'alone',
    'amazing',
    'anger',
    'architecture',
    'art',
    'attitude',
    'beauty',
    'best',
    'birthday',
    'business',
    'car',
    'change',
    'communications',
    'computers',
    'cool',
    'courage',
    'dad',
    'dating',
    'death',
    'design',
    'dreams',
    'education',
    'environmental',
    'equality',
    'experience',
    'failure',
    'faith',
    'family',
    'famous',
    'fear',
    'fitness',
    'food',
    'forgiveness',
    'freedom',
    'friendship',
    'funny',
    'future',
    'god',
    'good',
    'government',
    'graduation',
    'great',
    'happiness',
    'health',
    'history',
    'home',
    'hope',
    'humor',
    'imagination',
    'inspirational',
    'intelligence',
    'jealousy',
    'knowledge',
    'leadership',
    'learning',
    'legal',
    'life',
    'love',
    'marriage',
    'medical',
    'men',
    'mom',
    'money',
    'morning',
    'movies',
    'success',
  ]
  const apiKey = '8LtLBbltT88tPA+vc8kkWQ==aiK8u0Ff8ibxU0yX'
  const [selectedQuote, setSelectedQuote] = useState('')
  const [fetchedQuote, setFetchedQuote] = useState('')
  const [fetchedAuthor, setFetchedAuthor] = useState('')
  const [loading, setLoading] = useState(false)

  const handleQuoteChange = (event) => {
    setSelectedQuote(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/quotes?category=${selectedQuote}`,
          {
            method: 'GET',
            headers: {
              'X-Api-Key': apiKey,
              'Content-Type': 'application/json',
            },
          }
        )

        if (response.ok) {
          const result = await response.json()
          if (result && result.length > 0) {
            setFetchedQuote(result[0].quote)
            setFetchedAuthor(result[0].author)
          } else {
            console.error('No quotes found for the selected category')
          }
        } else {
          console.error('Error fetching data:', response.statusText)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedQuote, apiKey])

  return (
    <body>
      <div className={style.container}>
        <select
          title="Select a category"
          onChange={handleQuoteChange}
          value={selectedQuote}
          className={style.containerSelect}
        >
          {categories.map((quote) => {
            return (
              <option key={quote} value={quote} className={style.options}>
                {quote.toUpperCase()}
              </option>
            )
          })}
        </select>

        {loading ? (
          <p className={style.loading}>Loading...</p>
        ) : (
          <div className={style.quoteContainer}>
            {fetchedQuote && (
              <div>
                <h2 className={style.quoteTitle}>QUOTE</h2>
                <p className={style.fetchedQuote}>"{fetchedQuote}"</p>
                <p className={style.fetchedAuthor}>~{fetchedAuthor}~</p>
              </div>
            )}
          </div>
        )}
      </div>
    </body>
  )
}
