import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { generateColour } from "./generateColour"

type ColourSettings = {
  gradientAngle: number
  colourOne: string
  colourTwo: string
}

const DEFAULT_GRADIENT_ANGLE = 45

function App() {
  const [isCopied, setIsCopied] = useState(false)
  const [settings, setSettings] = useState<ColourSettings>({
    gradientAngle: DEFAULT_GRADIENT_ANGLE,
    colourOne: generateColour(),
    colourTwo: generateColour(),
  })
  const colourGradient = `linear-gradient(${settings.gradientAngle}deg, ${settings.colourOne} 0%, ${settings.colourTwo} 100%)`
  const colourGradientCSS = "background: " + colourGradient

  const generateNewGradient = () => {
    setSettings((settings) => ({
      ...settings,
      colourOne: generateColour(),
      colourTwo: generateColour(),
    }))
  }

  const handleInputOnChange = (e: ChangeEvent) => {
    const { name, valueAsNumber, value } = e.target as EventTarget &
      HTMLInputElement
    setSettings((values) => ({
      ...values,
      [name]: isNaN(valueAsNumber) ? value : valueAsNumber,
    }))
  }

  const handleGradientOnClick = useCallback(() => {
    navigator.clipboard.writeText(colourGradientCSS)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }, [colourGradientCSS])

  return (
    <div
      id="app"
      style={{ "--gradient": colourGradient } as Record<string, string>}
    >
      <h1>07/27 - CSS Gradient Generator</h1>

      <div className="gradient_container" title="click on gradient to copy">
        <div className="gradient_box" onClick={handleGradientOnClick}>
          <span className="gradient">{colourGradientCSS}</span>
        </div>
        <span className="gradient_copy">
          (
          {isCopied
            ? "css copied to clipboard 🎉"
            : "click above to copy css 👆"}
          )
        </span>
      </div>

      <div className="input_container">
        <div className="input_item">
          <label htmlFor="length">
            Gradient Angle ({settings.gradientAngle})
          </label>
          <input
            className="input"
            type="range"
            min={0}
            max={360}
            id="gradientAngle"
            name="gradientAngle"
            value={settings.gradientAngle}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="input_item">
          <label htmlFor="length">
            Colour <span className="colour_text">{settings.colourOne}</span>
          </label>
          <input
            className="input"
            type="color"
            id="colourOne"
            name="colourOne"
            value={settings.colourOne}
            onChange={handleInputOnChange}
          />
        </div>
        <div className="input_item">
          <label htmlFor="length">
            Colour <span className="colour_text">{settings.colourTwo}</span>
          </label>
          <input
            className="input"
            type="color"
            id="colourTwo"
            name="colourTwo"
            value={settings.colourTwo}
            onChange={handleInputOnChange}
          />
        </div>
        <button className="generate_new" onClick={generateNewGradient}>
          Generate New Gradient
        </button>
      </div>
    </div>
  )
}

export default App
