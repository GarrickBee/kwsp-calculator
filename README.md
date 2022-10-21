## KWSP Calculator

[![CI](https://github.com/GarrickBee/kwsp-calculator/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/GarrickBee/kwsp-calculator/actions/workflows/main.yml) [![Publish](https://github.com/GarrickBee/kwsp-calculator/actions/workflows/publish.yml/badge.svg)](https://github.com/GarrickBee/kwsp-calculator/actions/workflows/publish.yml)

Non-official Malaysia KWSP (Kumpulan Wang Simpanan Pekerja) or EPF (Employees Provident Fund) calculator.

## Getting Started

### Installation

```bash
# npm
npm install kwsp-calculator --save

#yarn
yarn add kwsp-calculator
```

### Get Monthly Contribution

```typescript
import { getMonthlyContribution } from 'kwsp-calculator';

function main() {
  const kwspContribution = getMonthlyContribution(3000);

  console.log(kwspContribution);
}

main();
```

```json
{
  "total": 630,
  "worker": 330,
  "employer": 300,
  "rate": {
    "worker": 11,
    "employer": 10
  }
}
```

Overwrite employer or worker contribution rate

```typescript
import { getMonthlyContribution } from 'kwsp-calculator';

function main() {
  const kwspContribution = getMonthlyContribution(3000, 9, {
    overwriteEmployerRate: 15,
  });
  console.log(kwspContribution);
}

main();
```

```json
{
  "total": 720,
  "worker": 270,
  "employer": 450,
  "rate": { "worker": 9, "employer": 15 }
}
```

### Get KWSP Projection

```typescript
import { getKWSPProjectile } from 'kwsp-calculator';

function main() {
  const kwspProjection = getKWSPProjectile({
    monthlySalary: 3000,
    annualSalaryIncrementPercentage: 0,
    kwspAnnualInterest: 6,
    currentKwspAmount: 50000,
    workerRate: 11,
    employerRate: 0,
    from: new Date('2022-01-01'),
    to: new Date('2023-01-01'),
  });

  console.log(kwspProjection);
}

main();
```

```json
{
  "totalAmount": 57770.399307163374,
  "annual": [
    { "year": 2022, "amount": 3960, "dividendAmount": 3194.62617628195 },
    { "year": 2023, "amount": 330, "dividendAmount": 285.7731308814098 }
  ]
}
```
