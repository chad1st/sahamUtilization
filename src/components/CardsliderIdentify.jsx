// CardSlider.jsx
import React from "react";

const stylesData = [
  {
    title: "DRIVER",
    desc: "Mengendalikan, ambisi, dan orientasi pada hasil",
    points: [
      "Percaya diri",
      "Selalu terburu-buru",
      "Sangat blak-blakan",
      "Mengendalikan rapat-rapat",
      "Cenderung terkesan kasar",
      "Cenderung tidak sabaran",
      "Cenderung menginterupsi orang lain",
      "Agresif",
      "Dapat membuat orang lain merasa terintimidasi",
    ],
  },
  {
    title: "INFLUENCER",
    desc: "Pendekatan sosial, berharap hal positif, dan keterbukaan ekspresi",
    points: [
      "Cenderung ekstrovert",
      "Sangat bersahabat dan karismatis",
      "Saat berbicara, menggunakan tangan dan ekspresi wajah",
      "Sangat antusias",
      "Senang mengorganisir pertemuan yang bersifat sosial (kumpul-kumpul)",
      "Senang bekerja dengan orang lain",
      "Berusaha melibatkan orang lain dalam tugas/proyek",
      "Cenderung optimistis",
    ],
  },
  {
    title: "SYMPATHIZER",
    desc: "Sabar, pengendalian diri, team-player",
    points: [
      "Sangat santai dan tenang",
      "Pendengar yang sangat baik",
      "Mendorong orang lain untuk bicara mengenai diri mereka",
      "Cenderung diam dan tidak terbuka",
      "Lebih suka mengikuti daripada memimpin",
      "Senang bekerja dalam kelompok kecil",
    ],
  },
  {
    title: "ANALYZER",
    desc: "Berorientasikan akurasi dan analisa/kualitas",
    points: [
      "Ruang kantor rapi/tertata",
      "Senang mengumpulkan data dan membuat perencanaan",
      "Cenderung terjebak dalam detail",
      "Bicara tenang, factual – menghindari kesalahan",
      "Jarang bicara dalam rapat-rapat",
      "Menggunakan fakta/data untuk mengatasi keberatan dan saat mengambil keputusan",
    ],
  },
];


export default function CardsliderIdentify() {
  return (
    <div className="flex flex-col items-center min-h-screen p-1">
      <div className="relative w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Identifying Styles in Others</h1>
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