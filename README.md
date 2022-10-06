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
  "total": 630, // Total monthly kwsp
  "worker": 330, // Amount contributed by worker
  "employer": 300, // Amount contributed by employer
  "rate": {
    "worker": 11, // Worker rate in percentage
    "employer": 10 // employer rate in percentage
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
