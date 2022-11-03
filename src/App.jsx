import CurrencyInput from './components/CurrencyInput'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import axios from 'axios'

function App() {
  const [amount1, setAmount1] = useState(0)
  const [amount2, setAmount2] = useState(0)
  const [currency1, setCurrency1] = useState('USD')
  const [currency2, setCurrency2] = useState('UAH')
  const [rates, setRates] = useState([])

  useEffect(() => {
    const fetchApi = () =>
      axios
        .get('https://api.exchangerate.host/latest?base=USD')
        .then(({ data: { rates } }) => {
          const { UAH, USD, EUR, PLN } = rates
          setRates({ UAH, USD, EUR, PLN })
        })

    fetchApi()
  }, [])

  const format = (num) => num.toFixed(2)

  function handleAmount1Change(value) {
    setAmount2(format((value * rates[currency2]) / rates[currency1]))
    setAmount1(value)
  }

  function handleAmount2Change(value) {
    setAmount1(format((value * rates[currency1]) / rates[currency2]))
    setAmount2(value)
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]))
    setCurrency1(currency1)
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]))
    setCurrency2(currency2)
  }

  return (
    <div className="App">
      <Header baseUsd={rates.UAH} />
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  )
}

export default App
