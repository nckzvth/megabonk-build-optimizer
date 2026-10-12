import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Lightbulb, Zap, ArrowUpRight } from 'lucide-react';
import { calculateStatPriorities } from '../engine/optimizer.js';

export default function StatPriorityRadar({ buildState, onQuickAddTome }) {
  const priorities = useMemo(() => {
    return calculateStatPriorities(buildState);
  }, [buildState]);

  const topPriority = priorities[0];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-amber-400 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-400" />
              Marginal Stat Priority Radar
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Identifies which stat currently yields the highest marginal DPS increase for your active build, exposing diminishing returns.
            </p>
          </div>

          {topPriority && (
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl font-mono text-xs">
              <span className="text-emerald-400 uppercase font-bold block">Top Immediate Priority:</span>
              <span className="text-white font-bold text-sm">{topPriority.statName}</span>
              <span className="text-emerald-400 ml-2 font-black">+{topPriority.marginalDpsGainPct.toFixed(1)}% DPS</span>
            </div>
          )}
        </div>
      </div>

      {/* Ranked Priority Bars */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-heading font-bold text-slate-200 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          Marginal Value of Next Upgrade Point
        </h3>

        <div className="space-y-4">
          {priorities.map((item, idx) => {
            const isTop = idx === 0;
            const maxVal = Math.max(1, topPriority?.marginalDpsGainPct || 10);
            const percentageWidth = Math.min(100, (item.marginalDpsGainPct / maxVal) * 100);

            return (
              <div key={item.statName} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold ${
                        isTop ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                    <span className="font-sans font-bold text-slate-200">{item.statName}</span>
                    {isTop && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                        MAX EFFICIENCY
                      </span>
                    )}
                  </div>
                  <span className={`font-bold ${isTop ? 'text-emerald-400 text-sm' : 'text-slate-300'}`}>
                    +{item.marginalDpsGainPct.toFixed(1)}% DPS
                  </span>
                </div>

                {/* Visual Bar */}
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isTop
                        ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                        : 'bg-gradient-to-r from-slate-600 to-slate-500'
                    }`}
                    style={{ width: `${percentageWidth}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diminishing Returns Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h4 className="font-heading font-bold text-amber-400 text-sm flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Why Diversification Trumps Stacking
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            In Megabonk, players often fall into the trap of blindly leveling the Damage Tome to level 10 first.
            However, because Damage Tome is its own additive bracket, going from Lv. 7 to Lv. 8 only yields a marginal 
            <strong> ~4.5% total DPS increase</strong>. Meanwhile, picking up an uninvested Cooldown Tome (Attack Speed bracket)
            or Precision Tome (Crit bracket) can provide <strong>+12% to +20% raw multiplicative gain</strong> immediately!
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h4 className="font-heading font-bold text-cyan-400 text-sm flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Nash Equilibrium Build Strategy
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Optimal endgame Megabonk builds maintain a balanced ratio across all 4 offensive brackets:
            Damage %, Attack Speed, Critical Hit Expectation, and Weapon Coverage (Projectiles/AoE).
            Whenever any single bracket exceeds 2.5x the multiplier of another, pivot offers to the starved brackets.
          </p>
        </div>
      </div>
    </div>
  );
}
