import { useEffect, useState } from 'react'
import axios from 'axios'

function Header({ baseUsd }) {
  const [baseEur, setBaseEur] = useState(0)

  useEffect(() => {
    const fetchApi = () =>
      axios
        .get('https://api.exchangerate.host/latest?base=EUR')
        .then(({ data: { rates } }) => {
          setBaseEur(rates.UAH)
        })

    fetchApi()
  }, [])

  return (
    <div className="header__container">
      <h2>1 πͺπΊ = {baseEur?.toFixed(2)} πΊπ¦ </h2>
      <h2>1 πΊπΈ = {baseUsd?.toFixed(2)} πΊπ¦ </h2>
    </div>
  )
}

export default Header
