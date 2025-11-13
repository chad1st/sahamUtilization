// CardSlider.jsx
import React from "react";

const stylesData = [
  {
    title: "DRIVER",
    desc: "Mengendalikan, ambisi, dan orientasi pada hasil",
    points: [
      "Bicara sesegera mungkin mengenai pokok permasalahan",
      "Libatkan mereka dalam proses pengambilan keputusan",
      "Beri mereka tantangan",
      "Gunakan fakta saat mengkonfrontasi mereka",
      "Perjelas peran dan kewenangan mereka",
      "Jangan buang-buang waktu mereka",
      "Beri mereka apresiasi",
    ],
  },
  {
    title: "INFLUENCER",
    desc: "Pendekatan sosial, berharap hal positif, dan keterbukaan ekspresi",
    points: [
      "Gunakan pendekatan yang bersahabat dan pribadi",
      "Libatkan mereka dalam proyek-proyek",
      "Bantu mereka menentukan sasaran",
      "Berkomunikasilah dengan mereka secara teratur mengenai status suatu proyek",
      "Temukan cara baru mereka untuk mendayagunakan keterampilan verbal mereka",
    ],
  },
  {
    title: "SYMPATHIZER",
    desc: "Sabar, pengendalian diri, team-player",
    points: [
      "Sering mengobrol – gunakan pendekatan yang bersahabat dan pribadi",
      "Komunikasikan perubahan sesegera mungkin dan beri mereka waktu untuk menyesuaikan diri",
      "Tanyakan hal-hal mengenai diri mereka",
      "Dorong mereka untuk bicara dalam rapat-rapat",
      "Beri mereka apresiasi",
    ],
  },
  {
    title: "ANALYZER",
    desc: "Berorientasikan akurasi dan analisa/kualitas",
    points: [
      "Segeralah bicara mengenai permasalahan yang ada",
      "Beri fakta dan data",
      "Minta pendapat mereka",
      "Tentukan peran dan tanggung jawab mereka",
      "Dorong mereka untuk bicara dalam rapat-rapat",
      "Beritahu mereka bahwa membuat kesalahan adalah OK",
    ],
  },
];



export default function CardsliderRelating() {
  return (
    <div className="flex flex-col items-center min-h-screen p-1">
      <div className="relative w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Relating with Different Styles</h1>
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