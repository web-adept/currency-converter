import { v4 as uuidv4 } from 'uuid'

function CurrencyInput({
  amount,
  currencies,
  currency,
  onAmountChange,
  onCurrencyChange,
}) {
  return (
    <div className="group">
      <input
        type="text"
        value={amount}
        onClick={(e) => (e.target.value = '')}
        onChange={(e) => onAmountChange(e.target.value)}
      />
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={uuidv4()} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CurrencyInput
