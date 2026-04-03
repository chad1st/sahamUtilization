export function calcTotalShares(totalLot) {
    return totalLot * 100;
}

export function calcGolongan(ipoValue) {
    if (ipoValue <= 100000000000) return "I";
    if (ipoValue <= 250000000000) return "II";
    if (ipoValue <= 500000000000) return "III";
    if (ipoValue <= 1000000000000) return "IV";
    return "V";
}

export function getNormalAllocationByTier(tier) {
    const map = {
        I: 0.2,
        II: 0.15,
        III: 0.1,
        IV: 0.075,
        V: 0.025,
    };

    return map[tier] ?? 0.025;
}

export function getOversubAllocation(tier, oversub) {
    const table = {
        I: [
            { min: 25, value: 0.30 },
            { min: 10, value: 0.25 },
            { min: 2.5, value: 0.225 },
            { min: 0, value: 0.20 },
        ],
        II: [
            { min: 25, value: 0.25 },
            { min: 10, value: 0.20 },
            { min: 2.5, value: 0.175 },
            { min: 0, value: 0.15 },
        ],
        III: [
            { min: 25, value: 0.20 },
            { min: 10, value: 0.15 },
            { min: 2.5, value: 0.125 },
            { min: 0, value: 0.10 },
        ],
        IV: [
            { min: 25, value: 0.175 },
            { min: 10, value: 0.125 },
            { min: 2.5, value: 0.10 },
            { min: 0, value: 0.075 },
        ],
        V: [
            { min: 25, value: 0.125 },
            { min: 10, value: 0.075 },
            { min: 2.5, value: 0.05 },
            { min: 0, value: 0.025 },
        ],
    };

    const rules = table[tier];
    if (!rules) {
        throw new Error(`Unknown IPO tier: ${tier}`);
    }

    return rules.find(rule => oversub >= rule.min).value;
}

export function selectFinalAllocation(oversub, normalAllocation, oversubAllocation) {
    return oversub < 2.5 ? normalAllocation : oversubAllocation;
}

export function calcIpoValue(totalShares, price) {
    return totalShares * price;
}

export function calcTotalLotTerpusat(totalLot, poolRatio) {
    return totalLot * poolRatio;
}

export function calcLotRitel(totalLotTerpusat) {
    return totalLotTerpusat / 2;
}

export function calcEstimasiInvestor(totalSid, lotRitel) {
    if (lotRitel>=totalSid) 
        return totalSid * 0.8;
    else
        return lotRitel * 0.8;
}


export function calcAllotmentRange(numerator, denominator) {
  if (denominator === 0) {
    throw new Error("Denominator cannot be zero");
  }

  const ratio = numerator / denominator;

  if (ratio < 1) {
    return "1-2";
  }

  const min = Math.floor(ratio);
  const max = Math.ceil(1 + ratio);

  return `${min}-${max}`;
}

export function calculateIpoResult(input) {
    const totalShares = calcTotalShares(input.totalLotIpo);
    const ipoValue = calcIpoValue(totalShares, input.ipoPrice);
    const golongan = calcGolongan(ipoValue);
    const alokasiNormal = getNormalAllocationByTier(golongan);
    const alokasiOversub = getOversubAllocation(golongan, input.oversub);
    const alokasiTerpusat = selectFinalAllocation(input.oversub, alokasiNormal, alokasiOversub);

    const totalLotTerpusat = calcTotalLotTerpusat(
        input.totalLotIpo,
        alokasiTerpusat
    );

    const lotRitel = calcLotRitel(totalLotTerpusat);

    const estimasiInvestor = calcEstimasiInvestor(
        input.estimasiSid,
        lotRitel
    );

    const allotment = calcAllotmentRange(
        lotRitel-estimasiInvestor,
        estimasiInvestor
    );

    return {
        totalShares,
        golongan,
        alokasiNormal,
        alokasiOversub,
        alokasiTerpusat,
        ipoValue,
        totalLotTerpusat,
        lotRitel,
        estimasiInvestor,
        allotment,
    };
}
