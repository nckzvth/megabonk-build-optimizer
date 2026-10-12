# 🔨 Megabonk Build Optimizer & Upgrade Advisor

An interactive web application and mathematical build advisor for **Megabonk**, grounded in the game's official **8-bracket multiplicative damage formula**, diminishing returns mitigation, and community database.

## 🌟 Key Features

*   **Live Upgrade Advisor**: Input the 3–4 upgrades offered on level up or chest opening. The engine calculates exact marginal DPS ($\Delta\text{DPS}\%$) and EHP ($\Delta\text{EHP}\%$) gains to recommend the optimal choice.
*   **Searchable Combobox Dropdowns**: Instant text search for fast in-game upgrade selection without scrolling through lists.
*   **Quick Hero Selector**: Choose any character and run level (1–100) right from the top of the Upgrade Advisor.
*   **8-Bracket Multiplier Visualizer**: Shows live investment across all 8 independent damage brackets:
    $$\text{Final Damage} = \text{Base} \times B_1 \times B_2 \times B_3 \times B_4 \times B_5 \times B_6 \times B_7 \times B_8$$
*   **Strategic Reroll / Skip Engine**: Analyzes whether the current choices underperform the reroll expected value ($EV = 9.2$).
*   **Complete Megabonk Encyclopedia**: 20 Characters, 29 Weapons, 23 Tomes, and 78 Items with scaling tags and unlock quests.
*   **Leaderboard Meta Presets**: 1-click loading for *The Holy Trinity*, *CL4NK Overcrit*, *Sir Oofie Fortress*, *Calcium Speed Demon*, and more.

## 🚀 Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Deployed automatically via GitHub Pages using GitHub Actions.
