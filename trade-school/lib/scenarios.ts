import type { Scenario } from "./types";

export const SCENARIOS: Scenario[] = [
  {
    id: "tsla-earnings-iv-crush",
    title: "TSLA Earnings IV Crush",
    symbol: "TSLA",
    setup:
      "Tesla reports earnings after the close tonight. The stock has been in a tight consolidation for 2 weeks at $410. Implied volatility is at the 92nd percentile of its 1-year range. The options chain is pricing in a $28 expected move (±6.8%). Analyst consensus is mixed — half expect a beat, half expect a miss.",
    currentPrice: 410,
    impliedVolatility: 88,
    ivRank: 92,
    daysToExpiration: 1,
    difficulty: "Intermediate",
    marketContext:
      "High IV environment. Earnings tonight. Straddle pricing an implied move of ±$28. IV rank at 92nd percentile — premium is expensive by historical standards.",
    choices: [
      { id: "buy-call", label: "Buy Call (Bullish Bet)", strategy: "Buy Call", maxRisk: 400 },
      { id: "buy-put", label: "Buy Put (Bearish Bet)", strategy: "Buy Put", maxRisk: 400 },
      { id: "sell-spread", label: "Sell Credit Spread (Defined Risk Sell)", strategy: "Credit Spread", maxRisk: 350 },
      { id: "iron-condor", label: "Iron Condor (Range Play)", strategy: "Iron Condor", maxRisk: 300 },
      { id: "no-trade", label: "No Trade", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove: "TSLA gaps up 4% on an earnings beat — but the stock is now $426, barely above the upper expected move boundary.",
      percentChange: 4,
      bestChoiceId: "iron-condor",
      explanation:
        "TSLA moved up 4% — directionally correct for the bulls, but the move was inside the expected range. Implied volatility collapsed from 88% to 32% after the event. Any long call or put buyer experienced severe IV crush — even though TSLA went up, long call buyers likely lost money because they overpaid for volatility. The Iron Condor, which profits when the stock stays within a range, was the most consistent choice. No Trade was also valid — earnings plays with high IV are often negative expected value for option buyers.",
      teachingPoint:
        "When implied volatility is at its 90th percentile or higher, option buyers are paying a significant premium for uncertainty. After an earnings event, that uncertainty resolves and IV collapses. Even directionally correct calls can lose money. In very high IV environments, selling premium (defined risk) or staying out is often the professional choice.",
    },
  },
  {
    id: "spy-opening-range-breakout",
    title: "SPY Opening Range Breakout",
    symbol: "SPY",
    setup:
      "It's 9:45 AM. SPY opened at $448.20 and has been consolidating in a 40-cent range ($447.90–$448.30) for the first 15 minutes. Volume is picking up. Futures were flat overnight. No major economic data today. IV rank is at the 18th percentile — options are cheap relative to history.",
    currentPrice: 448.1,
    impliedVolatility: 14,
    ivRank: 18,
    daysToExpiration: 3,
    difficulty: "Beginner",
    marketContext:
      "Low IV environment. Clean opening range forming. No news catalysts. Volume building.",
    choices: [
      { id: "buy-call", label: "Buy Call above $448.30 (Breakout Play)", strategy: "Buy Call", maxRisk: 250 },
      { id: "buy-put", label: "Buy Put below $447.90 (Breakdown Play)", strategy: "Buy Put", maxRisk: 250 },
      { id: "debit-spread", label: "Buy Debit Spread (Defined Cost)", strategy: "Debit Spread", maxRisk: 200 },
      { id: "no-trade", label: "Wait — Setup Not Yet Triggered", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove: "SPY breaks above $448.30 on above-average volume and trends to $451.80 by midday. The breakout holds.",
      percentChange: 0.82,
      bestChoiceId: "buy-call",
      explanation:
        "This was a textbook opening range breakout with favorable conditions: low IV (cheap options), no news interference, building volume, and a clean range. A call above the breakout level captured a 3.7-point move in SPY. With IV at only 18%, options were not overpriced and IV crush was not a concern. The debit spread was also a sound defined-risk alternative. No Trade was premature — the setup was valid once it triggered.",
      teachingPoint:
        "Low IV environments favor option buying strategies. When options are cheap (low IV rank), you get leverage without overpaying for uncertainty. Contrast this with earnings plays where IV is high: in low-IV breakout setups, the premium is fair and the risk/reward is more favorable for buyers.",
    },
  },
  {
    id: "nvda-momentum-reversal",
    title: "NVDA Momentum Reversal",
    symbol: "NVDA",
    setup:
      "NVDA has run up 34% in the last 3 weeks following an AI chip announcement. The stock is at $620 and RSI is at 87 — deeply overbought on the daily chart. Today it gapped up another 2% at the open, surging to $636 in the first 30 minutes. Volume is 3x average. No fundamental catalyst today. Just momentum.",
    currentPrice: 636,
    impliedVolatility: 58,
    ivRank: 65,
    daysToExpiration: 14,
    difficulty: "Intermediate",
    marketContext:
      "Extended uptrend. RSI 87. Parabolic price action. No new catalyst. High IV. Volume spike.",
    choices: [
      { id: "buy-call", label: "Chase the Momentum (Buy Call)", strategy: "Buy Call", maxRisk: 500 },
      { id: "buy-put", label: "Fade the Move (Buy Put)", strategy: "Buy Put", maxRisk: 400 },
      { id: "sell-spread", label: "Sell Call Credit Spread (Range-Bound / Bearish)", strategy: "Credit Spread", maxRisk: 300 },
      { id: "no-trade", label: "No Trade — Let It Play Out", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove: "NVDA reverses sharply from $636, closing the day at $601 — a 5.5% reversal from the intraday high.",
      percentChange: -5.5,
      bestChoiceId: "buy-put",
      explanation:
        "Parabolic moves that gap up on no new catalyst, with RSI above 85 and volume spikes, are classic reversal setups. NVDA's intraday reversal of 5.5% caught momentum buyers off guard. The put play was the best single-leg choice. However, the Credit Spread was also intelligent — IV at 65% made selling premium attractive. Chasing momentum (buying calls at the high) was the most dangerous choice.",
      teachingPoint:
        "Extended moves with no new catalyst, combined with extremely overbought conditions (RSI > 80), often produce sharp mean-reversion moves. Buying into vertical momentum is one of the most common and costly beginner mistakes. The market does not go up because you bought it.",
    },
  },
  {
    id: "aapl-low-vol-breakout",
    title: "AAPL Low Volatility Breakout",
    symbol: "AAPL",
    setup:
      "AAPL has been consolidating in a tight 4-point range ($182–$186) for 18 days. The daily candles are getting smaller. Volume has been declining throughout the consolidation. IV rank is at 8% — the lowest it has been in a year. The stock is sitting right at its 50-day moving average. Earnings are 6 weeks away.",
    currentPrice: 184.5,
    impliedVolatility: 12,
    ivRank: 8,
    daysToExpiration: 30,
    difficulty: "Beginner",
    marketContext:
      "Extended consolidation. Declining volume. IV rank at 8% (extremely cheap options). No near-term catalyst.",
    choices: [
      { id: "buy-call", label: "Buy Call (Anticipate Breakout)", strategy: "Buy Call", maxRisk: 200 },
      { id: "buy-put", label: "Buy Put (Anticipate Breakdown)", strategy: "Buy Put", maxRisk: 200 },
      { id: "debit-spread", label: "Buy Debit Spread", strategy: "Debit Spread", maxRisk: 150 },
      { id: "no-trade", label: "Wait for the Breakout to Confirm", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove:
        "AAPL breaks above $186 resistance on above-average volume and rallies to $194 over the next 2 weeks. Implied volatility expands from 12% to 22% as the stock moves.",
      percentChange: 5.1,
      bestChoiceId: "buy-call",
      explanation:
        "This was an ideal setup for buying options: IV at only 8% (cheapest in a year), consolidation complete, declining volume (classic 'spring loading'), and 30 days until expiration. The breakout produced a 5% move AND implied volatility expanded — both working in the call buyer's favor. The call benefited from both delta (price move) and vega (IV expansion). This combination — low IV before an anticipated move — is one of the best setups for option buyers.",
      teachingPoint:
        "Volatility expansion works in favor of option buyers. When IV is at a multi-year low and a breakout occurs, IV tends to expand as the market becomes uncertain about the new range. This 'vega tailwind' adds to the premium value on top of the directional move. Low IV environments are when buying options is most efficient.",
    },
  },
  {
    id: "qqq-trend-day",
    title: "QQQ Trend Day",
    symbol: "QQQ",
    setup:
      "QQQ opened with a gap up of 1.2%, immediately holding above the gap, and has been trending upward every 15 minutes since the open. It's 11 AM. QQQ is at $385 and up $4.80 on the day. Volume is 1.8x average. The VIX is down 12% from yesterday. SPY and Dow are both up similarly — broad market strength.",
    currentPrice: 385,
    impliedVolatility: 16,
    ivRank: 22,
    daysToExpiration: 1,
    difficulty: "Beginner",
    marketContext:
      "Gap-up open. Holding above gap. Broad market strength. VIX collapsing. Trending price action.",
    choices: [
      { id: "buy-call", label: "Buy Call (Ride the Trend)", strategy: "Buy Call", maxRisk: 200 },
      { id: "buy-put", label: "Fade the Strength (Buy Put)", strategy: "Buy Put", maxRisk: 200 },
      { id: "no-trade", label: "Missed the Move — No Trade", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove:
        "QQQ continues trending to $389.40, closing up 2.4% on the session. The trend held all day with no major pullback.",
      percentChange: 2.4,
      bestChoiceId: "buy-call",
      explanation:
        "Trend days — characterized by a gap up, holding above the gap, broad market confirmation, and declining VIX — have a directional bias that often persists all day. Fading a trend day is one of the most costly mistakes a beginner makes. The call at 11 AM still captured $4+ of further movement. 'No Trade' because you 'missed the open' is also a common mistake — trend days often offer multiple entry opportunities throughout the session.",
      teachingPoint:
        "On a confirmed trend day, the most important discipline is to avoid fading the move. The market tells you the direction — your job is to align with it. A gap up with broad confirmation, rising tape, and declining VIX is not a shorting opportunity.",
    },
  },
  {
    id: "spy-chop-day",
    title: "SPY Chop Day",
    symbol: "SPY",
    setup:
      "SPY opened flat and has been oscillating between $444.50 and $446.20 all morning. It's 1 PM. The stock has reversed 6 times in 3 hours. Volume is below average. VIX is flat. No major news. No pattern forming. The 5-minute chart looks like random noise.",
    currentPrice: 445.3,
    impliedVolatility: 15,
    ivRank: 20,
    daysToExpiration: 0,
    difficulty: "Beginner",
    marketContext:
      "No trend. Choppy price action. Below-average volume. No directional bias. Same-day expiration.",
    choices: [
      { id: "buy-call", label: "Buy 0DTE Call (Bullish Bet on Chop)", strategy: "Buy Call", maxRisk: 150 },
      { id: "buy-put", label: "Buy 0DTE Put (Bearish Bet on Chop)", strategy: "Buy Put", maxRisk: 150 },
      { id: "no-trade", label: "No Trade — Wait for a Setup", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove: "SPY closes the day at $445.10 — essentially flat. Both calls and puts expire worthless.",
      percentChange: -0.04,
      bestChoiceId: "no-trade",
      explanation:
        "There was no setup here. Buying options on a chop day — especially same-day expiration (0DTE) in a directionless market — is one of the fastest ways to lose money. The trade has no edge: no directional bias, no catalyst, high time decay (0DTE options lose value every minute), and random noise price action. Professional traders sit out chop days. Patience is a position.",
      teachingPoint:
        "Not trading is a trading decision. In choppy, range-bound, low-volume markets, the best trade is often no trade. Forcing a trade because you feel you 'need' to do something is a psychological error. The market owes you nothing. Your edge only applies in specific conditions — wait for those conditions.",
    },
  },
  {
    id: "fomc-volatility-event",
    title: "FOMC Volatility Event",
    symbol: "SPY",
    setup:
      "The Federal Reserve announces its rate decision at 2 PM today. The market has been flat all morning in anticipation. SPY is at $447. Futures are pricing a 75% probability of a 25bps rate cut and a 25% probability of a hold. IV rank is at 78% — significantly elevated ahead of the announcement. Options are expensive.",
    currentPrice: 447,
    impliedVolatility: 42,
    ivRank: 78,
    daysToExpiration: 1,
    difficulty: "Advanced",
    marketContext:
      "FOMC meeting today at 2 PM. Market pricing 75% cut probability. IV at 78th percentile. Elevated premiums.",
    choices: [
      { id: "buy-call", label: "Buy Call (Bet on Rate Cut Rally)", strategy: "Buy Call", maxRisk: 400 },
      { id: "buy-put", label: "Buy Put (Bet on Sell-the-News)", strategy: "Buy Put", maxRisk: 400 },
      { id: "iron-condor", label: "Iron Condor (Range Play)", strategy: "Iron Condor", maxRisk: 250 },
      { id: "no-trade", label: "No Trade — Avoid the Event", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove:
        "The Fed cuts 25bps as expected. SPY initially rallies to $449.80, then reverses to close at $444.20 — below where it opened.",
      percentChange: -0.63,
      bestChoiceId: "no-trade",
      explanation:
        "The Fed delivered exactly what the market expected — and SPY still ended lower. This is a classic 'sell the news' reaction after the expected event was 'priced in.' Both long calls and long puts had their extrinsic value destroyed by IV crush after the announcement. The Iron Condor had merit but was risky given the magnitude of the reversal. The highest-probability outcome was no trade or very small defined risk. FOMC days are not edge days for directional option buyers.",
      teachingPoint:
        "When IV is at its 75th percentile or higher AND a binary event is imminent, option buyers face a double headwind: they need to be directionally correct AND survive IV crush. Even professionals struggle to find consistent edge around FOMC. The clearest lesson: elevated IV before a known event favors selling, not buying. And the highest-discipline choice is often simply waiting.",
    },
  },
  {
    id: "gap-up-trap",
    title: "Gap Up Trap",
    symbol: "NVDA",
    setup:
      "NVDA reports an earnings beat after hours. The stock gaps up 9% at the open from $580 to $632. It's 9:32 AM. Social media is flooded with excitement. Retail traders are piling into calls. The stock has already exceeded the $30 implied move priced into the options. IV has collapsed post-earnings from 65% to 28%.",
    currentPrice: 632,
    impliedVolatility: 28,
    ivRank: 30,
    daysToExpiration: 5,
    difficulty: "Advanced",
    marketContext:
      "Post-earnings gap up. Exceeded implied move. IV collapsed. Retail FOMO. Extended price action at the open.",
    choices: [
      { id: "buy-call", label: "Buy Call (Chase the Gap)", strategy: "Buy Call", maxRisk: 500 },
      { id: "buy-put", label: "Buy Put (Fade the Gap)", strategy: "Buy Put", maxRisk: 400 },
      { id: "no-trade", label: "No Trade — Wait for Consolidation", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove:
        "NVDA opens at $632, runs briefly to $641, then reverses to close the session at $603 — a 4.6% fade from the open.",
      percentChange: -4.6,
      bestChoiceId: "no-trade",
      explanation:
        "This was a classic gap-up trap. The earnings result was already priced in at the open. IV had already collapsed (from 65% to 28%), so buying calls was expensive relative to the morning. The gap-up exceeded the expected move — a warning sign that all the good news was reflected in the price. Buying calls at the open chased an already-extended move into a crowded trade. Fading the gap (put) worked, but was high-risk and required conviction. The disciplined answer: wait for the gap to consolidate, let the euphoria settle, and look for a re-entry with a cleaner setup.",
      teachingPoint:
        "Gap-up traps occur when retail enthusiasm causes an extended open after a catalyst. By the time the news is public and everyone is excited, the move is often complete. The professional move is patience: wait for the initial volatility to subside, identify where support and resistance have formed in the new range, and then re-evaluate with a clear head.",
    },
  },
  {
    id: "credit-spread-risk",
    title: "Credit Spread Risk Management",
    symbol: "SPY",
    setup:
      "You sold a SPY $448/$451 call credit spread for $1.20 credit (max profit $120/contract). SPY was at $445 when you placed the trade 10 days ago. Now SPY is at $449.80 — right between your strikes, 4 days until expiration. Your position is currently worth $2.40 (a loss of $120). SPY has been trending up steadily.",
    currentPrice: 449.8,
    impliedVolatility: 16,
    ivRank: 20,
    daysToExpiration: 4,
    difficulty: "Intermediate",
    marketContext:
      "You are in a losing credit spread. SPY is between your strikes. Trend is upward. 4 days to expiration.",
    choices: [
      { id: "buy-call", label: "Hold and Hope SPY Reverses", strategy: "No Trade", maxRisk: 180 },
      { id: "buy-put", label: "Close the Spread Now (Take the Loss)", strategy: "No Trade", maxRisk: 120 },
      { id: "sell-spread", label: "Roll to a Wider Spread (Manage the Trade)", strategy: "Credit Spread", maxRisk: 250 },
      { id: "no-trade", label: "Close and Accept the Defined Loss", strategy: "No Trade", maxRisk: 120 },
    ],
    outcome: {
      marketMove: "SPY continues to $453 by expiration — above both strikes. The spread expires at full loss ($300 - $120 credit = $180 net loss).",
      percentChange: 0.71,
      bestChoiceId: "buy-put",
      explanation:
        "Holding and hoping is the most dangerous response to a losing spread in an uptrend. The trend was clearly against the position. Closing at a $120 loss (the current cost to close) would have been the disciplined choice — much better than the $180 max loss that occurred. The key insight: your max loss was defined when you entered. Taking a 50% loss of max loss is an acceptable outcome. Holding until expiration in an adverse trend turns a manageable loss into the worst possible outcome.",
      teachingPoint:
        "Credit spreads have defined risk, but that does not mean you should always hold until expiration. A common guideline: if the spread reaches 50-200% of the credit received as a loss, close it. Taking a controlled loss today prevents a worse loss tomorrow. 'Hold and hope' is not a risk management strategy — it is a psychological avoidance of the reality of a losing trade.",
    },
  },
  {
    id: "no-trade-discipline",
    title: "No Trade Discipline",
    symbol: "AAPL",
    setup:
      "It's 10 AM on a Tuesday. AAPL has been flat for 3 days. No earnings due for 6 weeks. No news. The options chain shows low volume and wide spreads. IV rank is at 50% — not particularly high or low. You haven't traded in 3 days and feel the urge to do something. Your account is slightly up this month.",
    currentPrice: 189.3,
    impliedVolatility: 21,
    ivRank: 50,
    daysToExpiration: 21,
    difficulty: "Beginner",
    marketContext:
      "No catalyst. No setup. Normal IV. Wide spreads. You are feeling impatient after 3 days without a trade.",
    choices: [
      { id: "buy-call", label: "Buy a Call — Something Might Happen", strategy: "Buy Call", maxRisk: 200 },
      { id: "buy-put", label: "Buy a Put — It Can't Stay Flat Forever", strategy: "Buy Put", maxRisk: 200 },
      { id: "no-trade", label: "No Trade — Wait for a Real Setup", strategy: "No Trade", maxRisk: 0 },
    ],
    outcome: {
      marketMove: "AAPL remains flat for 2 more weeks, eventually drifting down $1.80 to $187.50. No significant move occurred.",
      percentChange: -0.95,
      bestChoiceId: "no-trade",
      explanation:
        "There was no edge in this trade — no catalyst, no setup, no directional bias, and options with wide spreads at neutral IV. This scenario captures one of the most dangerous psychological states in trading: the urge to trade when there is nothing to trade. Professional traders maintain their standard and only take trades that meet their written criteria. Forcing trades out of boredom or impatience is a character flaw in a trader that compounds into capital losses over time.",
      teachingPoint:
        "The most disciplined response to 'no setup' is 'no trade.' Boredom, impatience, and the feeling that you need to be 'doing something' are emotional states, not trading signals. Your written trading plan should include a clear statement of the conditions required for a trade. If those conditions are not present, the correct answer is always to wait. Protecting your capital on no-edge days is exactly as important as capturing gains on high-edge days.",
    },
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
