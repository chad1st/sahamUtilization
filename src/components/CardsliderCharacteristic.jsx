// CardSlider.jsx
import React from "react";

const stylesData = [
  {
    title: "DRIVER",
    desc: "Mengendalikan, ambisi, dan orientasi pada hasil",
    points: [
      "Tegas dalam mengambil keputusan dan langsung, senang mengendalikan lingkungan kerja",
      "Paling optimal bekerja di bawah pengawasan minimal",
      "Mudah menerima tantangan",
      "Nyaman dengan perubahan",
      "Self-starter",
      "Kompetitif",
      "Berorientasikan hasil",
    ],
  },
  {
    title: "INFLUENCER",
    desc: "Pendekatan sosial, berharap hal positif, dan keterbukaan ekspresi",
    points: [
      "Umumnya optimistis dan antusias",
      "Promotor dan motivator yang baik",
      "Menikmati kebebasan untuk bergerak",
      "Ekstrover",
      "Berorientasikan orang",
      "Terampil mempengaruhi orang lain",
      "Senang bergaul",
    ],
  },
  {
    title: "SYMPATHIZER",
    desc: "Sabar, pengendalian diri, pemain tim (team-player)",
    points: [
      "Pekerja tim yang dapat diandalkan dan konsisten",
      "Membutuhkan lingkungan kerja stabil",
      "Bersahabat dengan rekan kerja",
      "Butuh waktu menyesuaikan diri dengan perubahan",
      "Dapat diandalkan",
    ],
  },
  {
    title: "ANALYZER",
    desc: "Berorientasikan presisi dan analisa/kualitas",
    points: [
      "Senang bekerja dengan detail",
      "Pemikiran kritis",
      "Hati-hati dengan konsep benar/salah",
      "Menjaga standar tinggi",
      "Cenderung teratur dan tertata",
    ],
  },
];

export default function CardSliderCharacteristic() {
  return (
    <div className="flex flex-col items-center min-h-screen p-1">
      <div className="relative w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Understanding Our Own Styles</h1>
        <div
          className="overflow-x-auto scroll-smooth py-6 [&::-webkit-scrollbar]:hidden relative"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 3%, black 98%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 3%, black 98%, transparent 100%)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* inner flex with min-width larger than container */}
          <div className="flex gap-6 px-6 w-max">
            {stylesData.map((style, idx) => (
              <article
                key={idx}
                className="flex-shrink-0 w-80 bg-white shadow-xl rounded-2xl p-6 snap-center transition-transform duration-300 hover:scale-105"
              >
                <h2 className="text-xl font-bold text-indigo-700 mb-2">
                  {style.title}
                </h2>
                <p className="text-gray-600 mb-4">{style.desc}</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
                  {style.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
            {/* small spacer to prevent right cut-off */}
            <div className="shrink-0 w-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}