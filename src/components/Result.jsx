import CardSliderCharacteristic from "./CardsliderCharacteristic"
import { typeMap } from "../utils/stateHelper"
import { useState } from "react"
import PivotGraph from "./PivotGraph"
import GradientButtons from "./GradientButton"
import CardsliderIdentify from "./CardsliderIdentify"
import CardsliderRelating from "./CardsliderRelating"

function Result({ result }) {
  const [cardSlider, setCardSlider] = useState("1")

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-6">
        <h1 className="text-5xl font-bold mb-6">Understanding Our Own Style</h1>
        <h2 className="text-4xl font-bold font-poppins mb-6 text-indigo-700">Your Dominant is : {typeMap[Object.keys(result)[0]]}</h2>
        <h2 className="text-3xl font-bold font-poppins mb-6 text-blue-500">Your Sub Dominant is : {typeMap[Object.keys(result)[1]]}</h2>

        <div className="w-full max-w-6xl flex flex-wrap gap-6 justify-start mb-1 pt-5">
          <GradientButtons label="Graph" onClick={() => setCardSlider("0")} />
          <GradientButtons label="Characteristic" onClick={() => setCardSlider("1")} />
          <GradientButtons label="Identify" onClick={() => setCardSlider("2")} />
          <GradientButtons label="Relating" onClick={() => setCardSlider("3")} />
        </div>

        <div className="relative w-full max-w-6xl min-h-[80vh] mt-4">

          {/* Card 0 */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${cardSlider === "0"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
              }`}
          >
            <PivotGraph groupStyles={result} />
          </div>

          {/* Card 1 */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${cardSlider === "1"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
              }`}
          >
            <CardSliderCharacteristic key="1" />
          </div>

          {/* Card 2 */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${cardSlider === "2"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
              }`}
          >
            <CardsliderIdentify key="2" />
          </div>

          {/* Card 3 */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${cardSlider === "3"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
              }`}
          >
            <CardsliderRelating key="3" />
          </div>
        </div>

      </div>
    </>
  )
}

export default Result