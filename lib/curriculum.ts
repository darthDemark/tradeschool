import type { Course, Lesson } from "./types";

// ============================================================
// TRADE SCHOOL — Full Curriculum Data
// 12 courses, 12 real beginner lessons with quizzes
// ============================================================

const lessons: Lesson[] = [
  // ── COURSE 1: Market Foundations ────────────────────────────────────────────
  {
    id: "what-is-the-stock-market",
    courseId: "market-foundations",
    order: 1,
    title: "What Is the Stock Market?",
    summary: "Learn how stock markets function, who participates, and why price is always determined by the collective action of buyers and sellers.",
    content: `## What Is the Stock Market?

The stock market is a network of exchanges where buyers and sellers trade shares of publicly listed companies. In the United States, the two primary exchanges are the **New York Stock Exchange (NYSE)** and the **NASDAQ**.

### What Is a Share?

When a company goes public through an IPO (Initial Public Offering), it divides ownership into millions of equal units called **shares**. Owning shares makes you a part-owner of that business. If the company grows and becomes more profitable, your shares increase in value.

### Who Participates?

Markets have many participants with different goals:

- **Retail investors** — individuals buying and selling for personal accounts
- **Institutional investors** — large funds managing billions (pensions, hedge funds, mutual funds)
- **Market makers** — firms that provide liquidity by always being willing to buy or sell
- **Algorithms** — automated trading systems executing millions of trades per day

### How Is Price Determined?

Price is determined by **supply and demand** at every moment. If more people want to buy a stock than sell it, the price rises. If more people want to sell than buy, the price falls.

There is no central authority setting prices. The market is a continuous auction — every transaction reflects a negotiated price between a willing buyer and a willing seller.

### Why This Matters for Options Traders

Options derive their value from the underlying stock price. To trade options intelligently, you must first understand what drives stock prices. Every news event, earnings report, Fed announcement, or shift in sentiment changes the supply-and-demand balance — and therefore the price.

> **Key insight:** The market is not random noise. It is the aggregate of millions of decisions made by participants with different information, timeframes, and motivations. Your job as a trader is to identify situations where the probabilities favor a directional move or a range-bound outcome.`,
    keyTerms: [
      { term: "Stock Market", definition: "A marketplace where shares of publicly listed companies are bought and sold." },
      { term: "Share", definition: "A unit of ownership in a company." },
      { term: "NYSE", definition: "New York Stock Exchange — the world's largest stock exchange by market capitalization." },
      { term: "Market Maker", definition: "A firm that provides liquidity by continuously quoting buy and sell prices." },
      { term: "Supply and Demand", definition: "The fundamental force that determines price in any market." },
      { term: "IPO", definition: "Initial Public Offering — the process by which a private company becomes publicly traded." },
    ],
    quiz: [
      {
        id: "sm-q1",
        question: "What fundamentally determines the price of a stock at any given moment?",
        choices: ["The company's CEO", "Supply and demand from buyers and sellers", "The Federal Reserve", "The stock exchange"],
        correctAnswer: "Supply and demand from buyers and sellers",
        explanation: "Price is determined by the continuous negotiation between buyers and sellers. More buyers than sellers pushes price up; more sellers than buyers pushes price down.",
      },
      {
        id: "sm-q2",
        question: "What is a share of stock?",
        choices: ["A loan to a company", "A unit of ownership in a company", "A bond issued by a company", "A currency exchange instrument"],
        correctAnswer: "A unit of ownership in a company",
        explanation: "When you buy a share, you become a fractional owner of that business. You participate in its gains and losses.",
      },
      {
        id: "sm-q3",
        question: "What is the role of a market maker?",
        choices: ["To set stock prices", "To regulate trading activity", "To provide liquidity by always quoting buy and sell prices", "To manage hedge funds"],
        correctAnswer: "To provide liquidity by always quoting buy and sell prices",
        explanation: "Market makers ensure that there is always someone to buy from or sell to, making the market liquid and functional.",
      },
      {
        id: "sm-q4",
        question: "Why is understanding stock market mechanics important for options traders?",
        choices: ["Options are completely unrelated to stocks", "Options derive their value from the underlying stock price", "The stock market determines options expiration dates", "Market makers set options premiums directly"],
        correctAnswer: "Options derive their value from the underlying stock price",
        explanation: "Options are contracts based on an underlying asset — usually a stock. Changes in the stock price directly affect the value of every option contract on that stock.",
      },
    ],
  },
  {
    id: "what-moves-price",
    courseId: "market-foundations",
    order: 2,
    title: "What Moves Price?",
    summary: "Understand the catalysts that drive stock prices: earnings, news, sentiment, interest rates, and the role of expectations.",
    content: `## What Moves Price?

Price moves when information changes the balance between buyers and sellers. Understanding these catalysts is essential for options traders who must anticipate not just whether something will happen — but when.

### 1. Earnings Reports

Every quarter, public companies report their financial results. These reports reveal whether the company is growing, shrinking, or stagnant. Markets react based on whether results beat or miss **expectations**, not whether they are good or bad in absolute terms.

> A company can report record profits and still have its stock fall — if the market expected even higher profits. This is called a **disappointment rally** in reverse, or a "sell the news" event.

### 2. Macroeconomic Data

Reports like the **Consumer Price Index (CPI)**, **Non-Farm Payrolls (NFP)**, and **Federal Reserve decisions** on interest rates move entire markets. When the Fed raises rates, borrowing becomes more expensive, which generally pressures growth stocks.

### 3. News and Geopolitics

Wars, trade disputes, regulatory actions, and CEO statements can move individual stocks dramatically. These are often the least predictable catalysts.

### 4. Market Sentiment

Sentiment is the collective emotional state of market participants. During bull markets, sentiment is optimistic — investors buy even bad news. During bear markets, sentiment is fearful — investors sell even good news.

### 5. Institutional Order Flow

When a large fund needs to buy or sell millions of shares, it moves price. Watching unusual volume or options activity can sometimes reveal institutional footprints before a move happens.

### The Role of Expectations

The most important concept: **markets price in expectations**. By the time a news event is public knowledge, the market has often already moved to reflect it.

As an options trader, your goal is to identify situations where you believe the market's expectation is wrong — or where the structure of the trade protects you regardless of which way price moves.`,
    keyTerms: [
      { term: "Earnings Report", definition: "A quarterly filing revealing a company's revenues, expenses, and profit." },
      { term: "Expectations", definition: "What the market has already priced in — the consensus forecast for a future event." },
      { term: "Sell the News", definition: "A phenomenon where a stock falls after positive news because the news was already priced in." },
      { term: "CPI", definition: "Consumer Price Index — a measure of inflation tracked closely by the Fed and markets." },
      { term: "Sentiment", definition: "The overall emotional disposition of market participants — optimistic or fearful." },
      { term: "Order Flow", definition: "The stream of buy and sell orders entering the market from all participants." },
    ],
    quiz: [
      {
        id: "wmp-q1",
        question: "A company reports record profits, but its stock falls. What is the most likely explanation?",
        choices: ["The earnings were actually negative", "The stock market malfunctioned", "The market had expected even higher profits", "Market makers manipulated the price"],
        correctAnswer: "The market had expected even higher profits",
        explanation: "Markets price in expectations. If a company reports record profits but the market expected even more, the stock can fall on the 'disappointment.'",
      },
      {
        id: "wmp-q2",
        question: "What does 'sell the news' mean?",
        choices: ["Selling a stock when news is released", "A stock falling after positive news because the news was already priced in", "Selling bad news stocks short", "A strategy to exit before earnings"],
        correctAnswer: "A stock falling after positive news because the news was already priced in",
        explanation: "'Buy the rumor, sell the news' is a common market phenomenon where anticipation drives the price up, and the actual event causes profit-taking.",
      },
      {
        id: "wmp-q3",
        question: "Why does Federal Reserve interest rate policy matter to stock traders?",
        choices: ["The Fed directly sets stock prices", "Rate changes affect borrowing costs and valuation of future earnings", "The Fed controls which stocks can be listed", "Higher rates always cause stocks to rise"],
        correctAnswer: "Rate changes affect borrowing costs and valuation of future earnings",
        explanation: "When rates rise, the cost of borrowing increases, and future cash flows are discounted more heavily — both of which generally pressure stock valuations.",
      },
    ],
  },
  // ── COURSE 2: Options Fundamentals ──────────────────────────────────────────
  {
    id: "what-is-an-option",
    courseId: "options-fundamentals",
    order: 1,
    title: "What Is an Option?",
    summary: "Understand the fundamental structure of an options contract: the right, not the obligation, to buy or sell.",
    content: `## What Is an Option?

An **option** is a financial contract that gives the buyer the **right, but not the obligation**, to buy or sell an underlying asset at a specific price, before or on a specific date.

Every options contract represents **100 shares** of the underlying stock.

### The Two Sides of Every Contract

Every options contract has two parties:

1. **The Buyer (Long)** — pays a premium, receives the right to exercise
2. **The Seller (Short / Writer)** — receives the premium, accepts the obligation if the buyer exercises

The buyer's maximum loss is always limited to the premium paid. The seller's risk can be theoretically unlimited (for naked positions).

### Why Options Exist

Options were created for two primary purposes:

**1. Hedging** — institutional investors use options to protect large stock portfolios against downside risk, like insurance.

**2. Speculation** — traders use options to make directional bets with leveraged exposure and defined risk.

### The Power of Leverage

Because you control 100 shares for a fraction of the cost, options provide significant leverage. A $400 premium on one call contract controls $40,000 worth of stock (if the stock is at $400).

This leverage magnifies both gains and losses.

### The Hidden Risk: Time Decay

Unlike stocks, options have an expiration date. Every day that passes, a portion of an option's value erodes — this is called **time decay** (or Theta). If the stock does not move enough in your direction by expiration, you lose your entire premium.

> Options are not stocks with extra risk. They are a completely different instrument with a completely different risk profile. Most beginners lose money on options because they treat them like lottery tickets. They are not.`,
    keyTerms: [
      { term: "Option", definition: "A contract giving the buyer the right, not obligation, to buy or sell 100 shares at a set price before expiration." },
      { term: "Premium", definition: "The price paid to purchase an option contract." },
      { term: "Buyer (Long)", definition: "The party who pays the premium and receives the right to exercise." },
      { term: "Seller (Short)", definition: "The party who receives the premium and accepts the obligation if the buyer exercises." },
      { term: "Time Decay", definition: "The daily erosion of an option's value as expiration approaches." },
      { term: "Leverage", definition: "Controlling a large position with a smaller capital outlay." },
    ],
    quiz: [
      {
        id: "wio-q1",
        question: "How many shares does one standard options contract represent?",
        choices: ["1", "10", "100", "1000"],
        correctAnswer: "100",
        explanation: "One standard options contract controls 100 shares of the underlying stock.",
      },
      {
        id: "wio-q2",
        question: "What is the maximum loss for the buyer of an option?",
        choices: ["Unlimited", "The strike price", "The premium paid", "The full value of 100 shares"],
        correctAnswer: "The premium paid",
        explanation: "An option buyer's risk is always limited to the premium they paid. If the option expires worthless, they lose that premium and nothing more.",
      },
      {
        id: "wio-q3",
        question: "What is time decay in options?",
        choices: ["The time it takes to execute an order", "The daily erosion of an option's value as expiration approaches", "The time between buying and selling", "Interest charged on options positions"],
        correctAnswer: "The daily erosion of an option's value as expiration approaches",
        explanation: "Options have a finite lifespan. Every day that passes reduces the time value component of the premium, regardless of stock movement.",
      },
      {
        id: "wio-q4",
        question: "What is the primary difference between using options for hedging vs. speculation?",
        choices: ["Hedging uses calls; speculation uses puts", "Hedging protects existing positions; speculation makes directional bets", "There is no difference", "Speculation is always illegal"],
        correctAnswer: "Hedging protects existing positions; speculation makes directional bets",
        explanation: "Institutions use options as insurance against losses in their stock holdings. Traders use them to express a directional view with defined, limited risk.",
      },
    ],
  },
  {
    id: "what-is-a-call-option",
    courseId: "options-fundamentals",
    order: 2,
    title: "What Is a Call Option?",
    summary: "Learn the mechanics of a call option — the right to buy — and how to think about when buying calls makes sense.",
    content: `## What Is a Call Option?

A **call option** gives the buyer the right to **buy** 100 shares of a stock at the strike price, before or on the expiration date.

You buy a call when you believe the stock will go up.

### A Concrete Example

**Setup:** Apple (AAPL) is trading at $180.

You buy 1 AAPL $185 call expiring in 30 days for $4.00 premium.

- **Total cost:** $4.00 × 100 = **$400** (your maximum loss)
- **Break-even price:** $185 + $4.00 = **$189** (at expiration)

**Scenario A:** AAPL rises to $200 at expiration.
- Your call is worth $200 - $185 = $15.00 per share
- Total value: $15 × 100 = $1,500
- Profit: $1,500 - $400 = **+$1,100 (275% return)**

**Scenario B:** AAPL stays at $183 at expiration.
- Your call expires worthless (stock below strike)
- Loss: **-$400 (100% of premium)**

### In-the-Money vs. Out-of-the-Money

- **ITM (In the Money):** Strike price is below current stock price. The call has intrinsic value.
- **OTM (Out of the Money):** Strike price is above current stock price. The call is pure time value.
- **ATM (At the Money):** Strike price equals current stock price.

### The Most Common Beginner Mistake

Buying calls right before earnings announcements. Even when the stock moves in your direction, **implied volatility collapses** after the event — this is called IV crush. The stock goes up, but your call loses value anyway.

Professional traders know: before an earnings event, implied volatility inflates option premiums. After the event — whether the results are good or bad — that volatility collapses, destroying the time value you paid for.`,
    keyTerms: [
      { term: "Call Option", definition: "Gives the buyer the right to buy 100 shares at the strike price before expiration." },
      { term: "Strike Price", definition: "The predetermined price at which the option can be exercised." },
      { term: "Break-Even", definition: "The stock price at which a trade neither profits nor loses at expiration." },
      { term: "In the Money (ITM)", definition: "A call is ITM when the stock price is above the strike price." },
      { term: "Out of the Money (OTM)", definition: "A call is OTM when the stock price is below the strike price." },
      { term: "IV Crush", definition: "A sharp drop in implied volatility after a known event, reducing option premiums." },
    ],
    quiz: [
      {
        id: "wica-q1",
        question: "You buy a $200 call on NVDA for $6.00. What is your break-even price at expiration?",
        choices: ["$194", "$200", "$206", "$212"],
        correctAnswer: "$206",
        explanation: "Break-even = Strike + Premium = $200 + $6.00 = $206. The stock must be above $206 at expiration for you to profit.",
      },
      {
        id: "wica-q2",
        question: "Why might a call option lose value even if the stock goes up after earnings?",
        choices: ["Options always expire worthless", "Time decay accelerates after earnings", "Implied volatility collapses after the event (IV crush)", "The market closes during earnings"],
        correctAnswer: "Implied volatility collapses after the event (IV crush)",
        explanation: "Before earnings, IV inflates premiums to reflect uncertainty. After the event, that uncertainty is resolved and IV collapses — reducing option values even if the stock moved in your favor.",
      },
      {
        id: "wica-q3",
        question: "A $150 strike call on a stock trading at $155 is considered:",
        choices: ["Out of the money", "At the money", "In the money", "Worthless"],
        correctAnswer: "In the money",
        explanation: "A call is in the money when the stock price is above the strike price. Here, $155 stock price > $150 strike, so it has $5 of intrinsic value.",
      },
    ],
  },
  {
    id: "what-is-a-put-option",
    courseId: "options-fundamentals",
    order: 3,
    title: "What Is a Put Option?",
    summary: "Understand put options — the right to sell — and how traders use them to profit from falling prices or hedge existing positions.",
    content: `## What Is a Put Option?

A **put option** gives the buyer the right to **sell** 100 shares at the strike price, before or on the expiration date.

You buy a put when you believe the stock will go down — or to protect a stock position you already own.

### A Concrete Example

**Setup:** Tesla (TSLA) is trading at $250. You believe it will fall.

You buy 1 TSLA $240 put expiring in 21 days for $8.00.

- **Total cost:** $8.00 × 100 = **$800** (your maximum loss)
- **Break-even price at expiration:** $240 - $8.00 = **$232**

**Scenario A:** TSLA falls to $210 at expiration.
- Your put is worth $240 - $210 = $30.00 per share
- Total value: $30 × 100 = $3,000
- Profit: $3,000 - $800 = **+$2,200**

**Scenario B:** TSLA rises to $260 at expiration.
- Your put expires worthless (you wouldn't sell at $240 when market is at $260)
- Loss: **-$800**

### Puts as Insurance

Institutions that own large stock portfolios buy puts to limit downside exposure — exactly like purchasing insurance. This is called a **protective put**.

If you own 500 shares of AAPL and buy 5 put contracts at the $180 strike, you have guaranteed yourself the right to sell at $180 — no matter how far the stock falls.

### Put Options vs. Short Selling

Both strategies profit from falling prices, but they are fundamentally different:

| | Short Selling | Buying Puts |
|---|---|---|
| Max Loss | Unlimited (stock can rise infinitely) | Limited to premium paid |
| Max Gain | Limited (stock can only fall to zero) | Strike minus premium |
| Capital Required | Significant (margin) | Just the premium |

For most retail traders and all beginners, buying puts is the safer way to express a bearish view.`,
    keyTerms: [
      { term: "Put Option", definition: "Gives the buyer the right to sell 100 shares at the strike price before expiration." },
      { term: "Protective Put", definition: "Buying puts against stock you own to limit downside losses, like insurance." },
      { term: "Bearish", definition: "Expecting a stock or market to fall in price." },
      { term: "Short Selling", definition: "Borrowing and selling shares you don't own, hoping to buy them back cheaper." },
    ],
    quiz: [
      {
        id: "wipa-q1",
        question: "You buy a $180 put on AAPL for $5.00. What is your maximum loss?",
        choices: ["$18,000", "$1,800", "$500", "$17,500"],
        correctAnswer: "$500",
        explanation: "The maximum loss for a put buyer is always the premium paid: $5.00 × 100 shares = $500.",
      },
      {
        id: "wipa-q2",
        question: "Why might an investor who owns stock buy put options?",
        choices: ["To increase leverage", "To profit if the stock doubles", "To protect against downside losses, like insurance", "To avoid paying taxes"],
        correctAnswer: "To protect against downside losses, like insurance",
        explanation: "A protective put guarantees you can sell your shares at the strike price, limiting losses if the stock falls significantly.",
      },
      {
        id: "wipa-q3",
        question: "Compared to short selling, buying puts has what key advantage?",
        choices: ["Unlimited profit potential", "Defined, limited maximum loss", "No premium cost", "Profits from rising prices"],
        correctAnswer: "Defined, limited maximum loss",
        explanation: "When you buy a put, your maximum loss is the premium paid. Short selling carries unlimited loss risk since a stock can theoretically rise without limit.",
      },
    ],
  },
  {
    id: "strike-price-explained",
    courseId: "calls-and-puts",
    order: 1,
    title: "Strike Price Explained",
    summary: "Master the concept of the strike price — the most fundamental decision when selecting an options contract.",
    content: `## Strike Price Explained

The **strike price** (also called the **exercise price**) is the predetermined price at which an option gives you the right to buy (call) or sell (put) the underlying stock.

Selecting the right strike price is one of the most consequential decisions in options trading.

### Strike Price and Moneyness

Every strike price has a relationship to the current stock price, called its **moneyness**:

| Moneyness | Call Option | Put Option |
|---|---|---|
| **In the Money (ITM)** | Strike < Stock Price | Strike > Stock Price |
| **At the Money (ATM)** | Strike ≈ Stock Price | Strike ≈ Stock Price |
| **Out of the Money (OTM)** | Strike > Stock Price | Strike < Stock Price |

### How Strike Price Affects Cost

**Deeper ITM = Higher Premium, More Protection**
An ITM call with a $440 strike on SPY trading at $450 costs more, but it already has $10 of intrinsic value and requires less stock movement to profit.

**Further OTM = Lower Premium, Requires More Movement**
An OTM call with a $480 strike costs much less, but SPY must rise significantly for you to profit. OTM options expire worthless more often.

### The Probability Connection

Strike price selection is fundamentally about probability:

- **ITM options**: Higher probability of being worth something at expiration. Higher cost.
- **OTM options**: Lower probability of finishing in the money. Lower cost, but lose money more often.

Delta (which we cover in a later lesson) gives you a rough estimate of the probability an option will finish in the money. A 0.30 delta call has approximately a 30% chance of expiring in the money.

### The Beginner's Temptation

New traders are drawn to far OTM options because they are cheap. A $2 option that could become $20 sounds attractive. But this ignores the probability — that option might only have a 5-10% chance of expiring in the money.

Buying far OTM options repeatedly is a fast way to lose a large portion of your capital through small, frequent losses.`,
    keyTerms: [
      { term: "Strike Price", definition: "The price at which an option buyer has the right to buy (call) or sell (put) shares." },
      { term: "Moneyness", definition: "The relationship between the strike price and the current stock price (ITM, ATM, OTM)." },
      { term: "Intrinsic Value", definition: "The in-the-money amount of an option — the immediate exercisable value." },
      { term: "Delta", definition: "A measure of how much an option's price moves per $1 move in the stock; also approximates probability of finishing ITM." },
    ],
    quiz: [
      {
        id: "spe-q1",
        question: "SPY is trading at $450. A call with a $445 strike is considered:",
        choices: ["Out of the money", "At the money", "In the money", "Expired"],
        correctAnswer: "In the money",
        explanation: "A call is in the money when the stock price ($450) is above the strike price ($445). This call has $5 of intrinsic value.",
      },
      {
        id: "spe-q2",
        question: "Why do far out-of-the-money options cost less but lose money more often?",
        choices: ["They have longer expirations", "They require a very large stock move to become profitable, so the probability of expiring worthless is high", "Market makers charge lower fees for them", "They have more intrinsic value"],
        correctAnswer: "They require a very large stock move to become profitable, so the probability of expiring worthless is high",
        explanation: "OTM options are cheap because the probability of the stock reaching the strike price is lower. The premium reflects that lower probability.",
      },
      {
        id: "spe-q3",
        question: "What does a 0.30 delta approximately indicate about an OTM option?",
        choices: ["It will move $0.30 per $1 stock move and has roughly a 30% chance of expiring ITM", "The stock will move 30% in the next week", "The option costs $0.30", "It has 30 days to expiration"],
        correctAnswer: "It will move $0.30 per $1 stock move and has roughly a 30% chance of expiring ITM",
        explanation: "Delta serves dual purpose: it measures price sensitivity to stock movement, and it approximates the probability of the option finishing in the money at expiration.",
      },
    ],
  },
  {
    id: "expiration-explained",
    courseId: "calls-and-puts",
    order: 2,
    title: "Expiration Explained",
    summary: "Learn how expiration dates work, why they matter, and how to choose the right timeframe for your trade.",
    content: `## Expiration Explained

Every options contract has an **expiration date** — the final day on which the contract is valid. After expiration, the option ceases to exist.

If an option is not in the money at expiration, it expires **worthless** and the buyer loses their entire premium.

### How Expiration Works

For equity options in the U.S., options typically expire on the **third Friday of each month** (monthly options) or each **Friday** (weekly options, also called "Weeklys").

At expiration:
- **ITM options** may be exercised automatically (for calls: you receive shares; for puts: you sell shares)
- **OTM options** expire worthless with no action required

Most retail traders close their positions before expiration — they rarely exercise options.

### Time Value and Theta

The longer the time until expiration, the more time value an option has — and the more expensive it is.

As expiration approaches, time value evaporates. This rate of decay is measured by **Theta**. A -0.05 Theta means the option loses approximately $5 per day (0.05 × 100 shares).

Theta decay accelerates as expiration approaches — it is not linear. An option loses time value much faster in its final 2 weeks than in its first month.

### Choosing an Expiration

**Too short (0-7 days):** Maximum time decay. Options can go to zero quickly. High risk for buyers.

**30-45 days:** Often considered the "sweet spot" for many strategies. Enough time for the trade to work, while premium is still elevated enough to be meaningful.

**60-90+ days:** More time for your thesis to play out. Slower time decay. More expensive upfront.

### The Tradeoff

- Longer expiration = more time = higher cost = slower decay
- Shorter expiration = less time = cheaper = faster decay

Buyers generally want more time. Sellers generally want less time (faster decay favors them).`,
    keyTerms: [
      { term: "Expiration Date", definition: "The date on which an options contract expires and becomes void." },
      { term: "Time Value", definition: "The portion of an option's premium that reflects the time remaining until expiration." },
      { term: "Theta", definition: "The rate at which an option loses value each day due to time passing; always negative for option buyers." },
      { term: "Weekly Options (Weeklys)", definition: "Options that expire each Friday, offering short-duration trading opportunities." },
    ],
    quiz: [
      {
        id: "ee-q1",
        question: "What happens to an out-of-the-money option at expiration?",
        choices: ["It converts to stock automatically", "It expires worthless and the buyer loses their premium", "It rolls to the next month", "The exchange refunds 50% of the premium"],
        correctAnswer: "It expires worthless and the buyer loses their premium",
        explanation: "OTM options have no intrinsic value. At expiration, they cease to exist and the buyer loses the full premium paid.",
      },
      {
        id: "ee-q2",
        question: "Theta is -0.08. What does this mean for an option holder each day?",
        choices: ["The option gains $8 per day", "The option loses approximately $8 per day in time value", "The delta changes by 0.08", "The implied volatility drops 8%"],
        correctAnswer: "The option loses approximately $8 per day in time value",
        explanation: "Theta of -0.08 means the option loses $0.08 per share per day. With 100 shares per contract, that's approximately $8 per day in time value decay.",
      },
      {
        id: "ee-q3",
        question: "Why do options sellers generally prefer shorter expirations?",
        choices: ["Shorter expirations have higher premiums", "Theta decay is faster near expiration, benefiting sellers who collect premium", "Shorter expirations are less regulated", "They have higher delta values"],
        correctAnswer: "Theta decay is faster near expiration, benefiting sellers who collect premium",
        explanation: "Option sellers collect premium and profit as that premium decays. Faster decay (near expiration) means they keep their collected premium sooner.",
      },
    ],
  },
  {
    id: "premium-explained",
    courseId: "premiums",
    order: 1,
    title: "Premium Explained",
    summary: "Understand what you are actually paying for when you buy an option — and what you are selling when you write one.",
    content: `## Premium Explained

The **premium** is the price you pay to buy an options contract. It is quoted per share, but since one contract = 100 shares, you multiply by 100 to get your total cost.

If a call option has a premium of $3.50, the total cost for one contract is **$350**.

### The Two Components of Premium

Every option's premium is composed of two parts:

**1. Intrinsic Value**
The amount the option is in the money. A call with a $440 strike on a $450 stock has $10 of intrinsic value.

*Intrinsic value cannot be less than zero.*

**2. Extrinsic Value (Time Value)**
Everything beyond intrinsic value. This includes time remaining until expiration and implied volatility.

**Total Premium = Intrinsic Value + Extrinsic Value**

An OTM option is composed entirely of extrinsic value — it has no intrinsic value.

### What Drives Premium Higher?

- **More time until expiration** → higher extrinsic value
- **Higher implied volatility** → higher extrinsic value
- **Deeper in the money** → more intrinsic value

### What Drives Premium Lower?

- **Time passing** (Theta decay)
- **Stock moving away from strike** (for buyers)
- **Implied volatility collapsing** after a known event

### Why This Matters

When you buy an option, you are buying both intrinsic and extrinsic value. The intrinsic value moves with the stock. The extrinsic value decays every day and collapses when volatility falls.

This is why an option can be "right" directionally but still lose money — because the extrinsic value paid was too high relative to the move that occurred.

Experienced traders track the **cost of premium** relative to **expected move** — and avoid overpaying for optionality.`,
    keyTerms: [
      { term: "Premium", definition: "The total price of an options contract, quoted per share; multiply by 100 for total cost." },
      { term: "Intrinsic Value", definition: "The in-the-money amount of an option — the immediate exercisable value." },
      { term: "Extrinsic Value", definition: "The time value and implied volatility component of an option's premium." },
      { term: "Time Decay", definition: "The daily erosion of extrinsic value as expiration approaches." },
    ],
    quiz: [
      {
        id: "pre-q1",
        question: "A call option has a $3.00 premium. What is the total cost of one contract?",
        choices: ["$3.00", "$30.00", "$300.00", "$3,000.00"],
        correctAnswer: "$300.00",
        explanation: "One contract controls 100 shares. $3.00 premium × 100 shares = $300 total cost.",
      },
      {
        id: "pre-q2",
        question: "An OTM option has $0 intrinsic value. What does its premium consist of?",
        choices: ["Only commission fees", "Entirely extrinsic value (time value and implied volatility)", "Intrinsic value plus dividends", "Nothing — OTM options have no value"],
        correctAnswer: "Entirely extrinsic value (time value and implied volatility)",
        explanation: "OTM options have no intrinsic value because the stock hasn't reached the strike yet. Their entire premium is extrinsic value.",
      },
      {
        id: "pre-q3",
        question: "If implied volatility collapses after an earnings event, what happens to option premiums?",
        choices: ["They increase significantly", "They remain unchanged", "They decrease because extrinsic value shrinks", "They convert to intrinsic value"],
        correctAnswer: "They decrease because extrinsic value shrinks",
        explanation: "Implied volatility is a key component of extrinsic value. When IV collapses, the extrinsic portion of premium drops sharply — this is IV crush.",
      },
    ],
  },
  {
    id: "intrinsic-vs-extrinsic",
    courseId: "premiums",
    order: 2,
    title: "Intrinsic vs. Extrinsic Value",
    summary: "Deep dive into the two components of options premium and why understanding them separates beginners from professionals.",
    content: `## Intrinsic vs. Extrinsic Value

Understanding the two components of options premium is perhaps the most important conceptual foundation for all options trading.

### Intrinsic Value

**Formula (Call):** Max(0, Stock Price − Strike Price)
**Formula (Put):** Max(0, Strike Price − Stock Price)

If a call has a $440 strike and the stock is at $450, the intrinsic value is $10.
If a call has a $460 strike and the stock is at $450, the intrinsic value is $0 (OTM).

Intrinsic value is the "real" money value of the option — what you'd receive if you exercised right now.

### Extrinsic Value

Everything beyond intrinsic value is extrinsic (also called "time value").

**Extrinsic Value = Premium − Intrinsic Value**

Extrinsic value exists because:
1. **Time remaining** — the stock could still move in your favor before expiration
2. **Implied volatility** — higher uncertainty commands a higher premium

### The Extrinsic Value Problem for Buyers

When you buy an option, you pay for both components. But intrinsic value is yours to keep only if the stock stays ITM. Extrinsic value disappears over time regardless of stock movement.

**Example:** You pay $12 for an option with $6 intrinsic and $6 extrinsic. Even if the stock stays perfectly flat, you lose the $6 of extrinsic value by expiration.

This is why buying options and "holding for time" is a losing strategy. Time is your enemy as a buyer.

### The Extrinsic Value Opportunity for Sellers

Option sellers exploit extrinsic value. When you sell an option, you collect the premium — including the extrinsic value that will decay to zero over time.

If you sell a $3.00 OTM option (all extrinsic), and the stock stays out of the money until expiration, you keep all $3.00 ($300 per contract) as profit.

This is the core edge of premium selling strategies: theta works in your favor.`,
    keyTerms: [
      { term: "Intrinsic Value", definition: "The amount an option is in the money — immediately exercisable value." },
      { term: "Extrinsic Value", definition: "Premium beyond intrinsic value; consists of time value and implied volatility." },
      { term: "Premium Selling", definition: "Strategies that collect extrinsic value and profit as it decays over time." },
      { term: "Theta Decay", definition: "The time-based erosion of extrinsic value; favors sellers, hurts buyers." },
    ],
    quiz: [
      {
        id: "ive-q1",
        question: "A $150 call costs $12. The stock is at $158. What is the extrinsic value?",
        choices: ["$12", "$8", "$4", "$0"],
        correctAnswer: "$4",
        explanation: "Intrinsic value = $158 − $150 = $8. Extrinsic = Premium − Intrinsic = $12 − $8 = $4.",
      },
      {
        id: "ive-q2",
        question: "An OTM option you bought for $3.50 expires worthless. How much of the loss came from extrinsic value?",
        choices: ["$0", "$1.75", "$3.50", "Impossible to determine"],
        correctAnswer: "$3.50",
        explanation: "An OTM option has zero intrinsic value. Its entire premium is extrinsic. If it expires worthless, all $3.50 ($350 per contract) was extrinsic value that decayed.",
      },
      {
        id: "ive-q3",
        question: "Why is time the enemy of options buyers but a friend of options sellers?",
        choices: ["Sellers can exercise at any time", "Extrinsic value decays over time — sellers collected it upfront, buyers paid for it", "Buyers receive dividends over time", "Time increases intrinsic value"],
        correctAnswer: "Extrinsic value decays over time — sellers collected it upfront, buyers paid for it",
        explanation: "Sellers receive premium (including extrinsic value) immediately. As time passes, that extrinsic value disappears — which is profit for the seller and loss for the buyer.",
      },
    ],
  },
  {
    id: "bid-and-ask",
    courseId: "market-foundations",
    order: 3,
    title: "Bid and Ask",
    summary: "Understand the bid-ask spread — the hidden cost of every options trade and how to minimize it.",
    content: `## Bid and Ask

Every options contract has two prices at any given moment:

- **Bid:** The highest price a buyer is willing to pay
- **Ask:** The lowest price a seller is willing to accept

The difference between them is the **spread**.

### Example

AAPL $190 call:
- **Bid:** $3.40
- **Ask:** $3.60
- **Spread:** $0.20

When you buy, you pay the ask ($3.60). When you sell, you receive the bid ($3.40). The spread is the cost of immediate execution — it goes to the market maker.

### Why Spreads Matter

In options, wide spreads significantly increase your cost basis. A $0.50 spread on a single contract means you start the trade $50 behind — just because of the spread.

Multiply that across multiple contracts and the spread can be a substantial portion of your maximum risk.

### How to Minimize Spread Impact

**1. Trade liquid options.** Liquid options (SPY, QQQ, AAPL, NVDA) have tight spreads — often $0.01–$0.05 for ATM options.

**2. Use limit orders.** Never use market orders on options. Always use limit orders set near the midpoint of the spread.

**3. Check open interest.** High open interest indicates many active participants, which generally means tighter spreads.

**4. Avoid very short expirations on illiquid symbols.** OTM options on small-cap stocks can have spreads wider than the entire premium.

### The Midpoint

Skilled traders place orders at the **midpoint** of the spread and often get filled:

Midpoint = (Bid + Ask) / 2 = ($3.40 + $3.60) / 2 = **$3.50**

If you need to get filled quickly, move toward the ask (buying) or toward the bid (selling), sacrificing a few cents for speed.`,
    keyTerms: [
      { term: "Bid", definition: "The highest price a buyer is currently willing to pay." },
      { term: "Ask", definition: "The lowest price a seller is currently willing to accept." },
      { term: "Spread", definition: "The difference between the bid and ask — a transaction cost that goes to the market maker." },
      { term: "Midpoint", definition: "The average of the bid and ask; often where skilled traders target their limit orders." },
      { term: "Limit Order", definition: "An order to buy or sell at a specific price — used to avoid paying the full spread." },
    ],
    quiz: [
      {
        id: "baa-q1",
        question: "A call option has a bid of $2.80 and an ask of $3.20. What is the spread?",
        choices: ["$0.20", "$0.40", "$0.80", "$3.00"],
        correctAnswer: "$0.40",
        explanation: "Spread = Ask − Bid = $3.20 − $2.80 = $0.40. Per contract, that's $40 in transaction cost.",
      },
      {
        id: "baa-q2",
        question: "Why should you use limit orders instead of market orders when trading options?",
        choices: ["Market orders are illegal for options", "Limit orders execute faster", "Market orders can fill at terrible prices due to wide spreads", "Limit orders have no commission"],
        correctAnswer: "Market orders can fill at terrible prices due to wide spreads",
        explanation: "Options can have wide bid-ask spreads. A market order fills at whatever the current ask price is, potentially costing you much more than necessary.",
      },
      {
        id: "baa-q3",
        question: "What does high open interest on an option typically indicate?",
        choices: ["The option is about to expire", "The option is heavily traded with many active participants, generally meaning tighter spreads", "The option is more expensive", "The stock is about to report earnings"],
        correctAnswer: "The option is heavily traded with many active participants, generally meaning tighter spreads",
        explanation: "Open interest reflects the number of outstanding contracts. More participants create more liquidity, which tightens bid-ask spreads.",
      },
    ],
  },
  {
    id: "volume-and-open-interest",
    courseId: "market-foundations",
    order: 4,
    title: "Volume and Open Interest",
    summary: "Learn to read volume and open interest — two data points that reveal where real market activity is occurring.",
    content: `## Volume and Open Interest

When looking at an options chain, two columns tell you about market activity: **Volume** and **Open Interest (OI)**.

### Volume

**Volume** is the number of contracts traded on a given day. It resets to zero each morning.

High volume on a specific strike or expiration means many traders are actively interested in that level today. Unusual volume — significantly above the average — can indicate institutional positioning or informed speculation.

### Open Interest

**Open Interest** is the total number of outstanding (unclosed) contracts at that strike and expiration. Unlike volume, it does not reset daily.

OI increases when new contracts are opened and decreases when existing contracts are closed.

### How to Use Them Together

| Scenario | Interpretation |
|---|---|
| High Volume + Increasing OI | New positions opening — conviction |
| High Volume + Decreasing OI | Existing positions closing — distribution |
| Low Volume + Stable OI | Quiet — no new positioning |
| Spike in OI at specific strike | Significant institutional interest at that level |

### Max Pain Theory

**Max Pain** is the strike price where the maximum number of options expire worthless — causing the maximum financial pain to option buyers. Some traders believe stocks tend to gravitate toward max pain near expiration due to market maker hedging activity.

This is not a reliable trading signal on its own, but understanding where large OI concentrations exist helps you understand potential support and resistance levels.

### Practical Use

Before entering a trade, check the options chain for the strikes you are considering:
- Is there sufficient OI to ensure liquidity?
- Is volume spiking on your target strike for unusual reasons?
- Are large concentrations of OI at specific strikes that might act as magnets?`,
    keyTerms: [
      { term: "Volume", definition: "The number of option contracts traded during the current trading session; resets daily." },
      { term: "Open Interest (OI)", definition: "The total number of outstanding, unclosed option contracts at a specific strike and expiration." },
      { term: "Max Pain", definition: "The strike price at which the most options expire worthless, causing maximum loss to option buyers." },
      { term: "Unusual Options Activity", definition: "Volume significantly above average, often indicating institutional positioning." },
    ],
    quiz: [
      {
        id: "voi-q1",
        question: "What is the key difference between volume and open interest?",
        choices: ["Volume is for calls, OI is for puts", "Volume measures today's activity; OI measures all outstanding positions", "OI resets daily; volume does not", "They measure the same thing differently"],
        correctAnswer: "Volume measures today's activity; OI measures all outstanding positions",
        explanation: "Volume counts trades made today and resets each morning. Open interest counts all unclosed contracts and changes as positions are opened or closed.",
      },
      {
        id: "voi-q2",
        question: "High volume combined with increasing open interest suggests:",
        choices: ["Traders are closing positions", "New positions are being opened — increasing conviction at that strike", "The option is about to expire", "Volume and OI are always inversely related"],
        correctAnswer: "New positions are being opened — increasing conviction at that strike",
        explanation: "When both volume and OI increase together, it means new contracts are being created — traders are opening new positions, not just trading existing ones.",
      },
      {
        id: "voi-q3",
        question: "Why does high open interest at a specific strike matter to a trader?",
        choices: ["It guarantees the stock will reach that price", "It ensures instant fills at zero spread", "It indicates significant market interest and may act as a support or resistance level", "It means the option will expire in the money"],
        correctAnswer: "It indicates significant market interest and may act as a support or resistance level",
        explanation: "Large OI concentrations reveal where many participants have positioned. These levels often act as gravitational zones for price, especially near expiration.",
      },
    ],
  },
  {
    id: "introduction-to-risk",
    courseId: "risk-management",
    order: 1,
    title: "Introduction to Risk",
    summary: "The most important lesson in trading: position sizing, max loss rules, and why preservation of capital is paramount.",
    content: `## Introduction to Risk

The single most important skill in options trading is not finding the right trade. It is **managing risk** so that no single trade, no single day, and no single week can permanently damage your trading account or your psychology.

### The Fundamental Truth

Every professional trader — no matter how skilled — has losing trades. The goal is not to eliminate losses. The goal is to ensure that losses are small and manageable, and that winners, when they come, are large enough to cover them.

This is called having a **positive expected value** system.

### Position Sizing

Before entering any trade, define your maximum risk in dollars:

**Rule of 1%:** Never risk more than 1% of your total account on a single trade.

On a $25,000 account:
- Max risk per trade: **$250**
- This limits any single loss to 1% of capital

This sounds conservative. It is. But it ensures that even 10 consecutive losses — which will happen over the course of a trading career — only cost you 10% of your account. You can recover from that.

### Maximum Daily Loss

Establish a daily loss limit. Once you hit it, stop trading for the day.

**Suggested daily loss limit:** 3% of account

On a $25,000 account:
- Max daily loss: **$750**

When you are having a losing day, your judgment deteriorates. Revenge trading — trying to make back losses quickly — leads to larger, more reckless trades. The daily loss limit prevents this.

### The Two Types of Risk

**Defined Risk:** You know your maximum loss before you enter. Debit spreads, long calls, and long puts all have defined maximum risk.

**Undefined Risk:** Your maximum loss is theoretically unlimited or very large. Naked options selling and uncapped spreads carry undefined risk.

Beginners should only trade defined-risk structures until they understand the mechanics thoroughly.

### Why Preservation of Capital Is Paramount

A 50% account loss requires a **100% gain** just to break even. The math of drawdown is unforgiving:

| Drawdown | Gain Required to Recover |
|---|---|
| 10% | 11% |
| 25% | 33% |
| 50% | 100% |
| 75% | 300% |

Protect your capital first. The opportunity to trade tomorrow depends on having capital today.`,
    keyTerms: [
      { term: "Position Sizing", definition: "The process of determining how much capital to risk on a single trade." },
      { term: "1% Rule", definition: "Never risk more than 1% of total account value on any single trade." },
      { term: "Daily Loss Limit", definition: "A predefined maximum loss threshold per trading day; once reached, stop trading." },
      { term: "Defined Risk", definition: "A trade where the maximum possible loss is known before entry." },
      { term: "Expected Value", definition: "The average outcome of a trade multiplied by its probability — the foundation of systematic profitability." },
      { term: "Drawdown", definition: "The decline from a peak account value to a subsequent trough." },
    ],
    quiz: [
      {
        id: "itr-q1",
        question: "On a $25,000 account with a 1% risk rule, what is your maximum risk on any single trade?",
        choices: ["$250", "$500", "$1,000", "$2,500"],
        correctAnswer: "$250",
        explanation: "1% of $25,000 = $250 maximum risk per trade. This limits any single loss to 1% of your total capital.",
      },
      {
        id: "itr-q2",
        question: "Your account is down 50%. What percentage gain do you need just to break even?",
        choices: ["50%", "75%", "100%", "150%"],
        correctAnswer: "100%",
        explanation: "If you lose 50% of $25,000, you have $12,500. To get back to $25,000, you need to double your remaining capital — a 100% gain.",
      },
      {
        id: "itr-q3",
        question: "What is 'revenge trading' and why is it dangerous?",
        choices: ["Trading the same stock that caused a loss", "Trying to quickly recover losses through larger, more reckless trades", "A legal trading strategy involving pairs", "Trading after market hours"],
        correctAnswer: "Trying to quickly recover losses through larger, more reckless trades",
        explanation: "Revenge trading occurs when emotion (frustration, desperation) overrides discipline. Traders take larger risks to 'make it back,' which often results in larger losses.",
      },
      {
        id: "itr-q4",
        question: "What defines a 'defined risk' trade?",
        choices: ["Any trade with a stop loss", "A trade where the maximum possible loss is known before entry", "A trade that cannot lose money", "A trade reviewed by a professional"],
        correctAnswer: "A trade where the maximum possible loss is known before entry",
        explanation: "Defined risk structures (long calls, long puts, debit spreads) have a mathematically fixed maximum loss — the premium paid or the width of the spread minus the credit received.",
      },
    ],
  },
];

// ─── Courses ───────────────────────────────────────────────────────────────────
export const COURSES: Course[] = [
  {
    id: "market-foundations",
    title: "Market Foundations",
    description: "Understand how financial markets work: price discovery, market participants, order flow, and the mechanics underlying every trade.",
    level: "Beginner",
    semester: 1,
    lessons: lessons.filter((l) => l.courseId === "market-foundations"),
  },
  {
    id: "options-fundamentals",
    title: "Options Fundamentals",
    description: "Learn the core mechanics of options contracts — what they are, how they're priced, and why they exist.",
    level: "Beginner",
    semester: 2,
    lessons: lessons.filter((l) => l.courseId === "options-fundamentals"),
  },
  {
    id: "calls-and-puts",
    title: "Calls and Puts",
    description: "Master the two fundamental types of options contracts and how to use them directionally.",
    level: "Beginner",
    semester: 2,
    lessons: lessons.filter((l) => l.courseId === "calls-and-puts"),
  },
  {
    id: "premiums",
    title: "Premiums & Value",
    description: "Understand intrinsic and extrinsic value — the two components that determine every option's price.",
    level: "Beginner",
    semester: 2,
    lessons: lessons.filter((l) => l.courseId === "premiums"),
  },
  {
    id: "the-greeks",
    title: "The Greeks",
    description: "Master Delta, Gamma, Theta, and Vega — the four dimensions of options risk and sensitivity.",
    level: "Intermediate",
    semester: 3,
    lessons: [],
  },
  {
    id: "implied-volatility",
    title: "Implied Volatility",
    description: "The most misunderstood concept in options. Learn IV rank, IV percentile, and when to buy vs. sell premium.",
    level: "Intermediate",
    semester: 3,
    lessons: [],
  },
  {
    id: "reading-the-chain",
    title: "Reading the Options Chain",
    description: "Learn to read an options chain with precision — identifying opportunity, risk, and what the market is pricing in.",
    level: "Intermediate",
    semester: 3,
    lessons: [],
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description: "The foundation of professional trading. Position sizing, max loss rules, portfolio heat, and capital preservation.",
    level: "Beginner",
    semester: 4,
    lessons: lessons.filter((l) => l.courseId === "risk-management"),
  },
  {
    id: "trading-psychology",
    title: "Trading Psychology",
    description: "Emotional discipline, revenge trading, FOMO, loss aversion, and building professional mental habits.",
    level: "Intermediate",
    semester: 5,
    lessons: [],
  },
  {
    id: "day-trading-systems",
    title: "Day Trading Systems",
    description: "Build a repeatable trading system: pre-market prep, scanner criteria, entry signals, and exit management.",
    level: "Advanced",
    semester: 6,
    lessons: [],
  },
  {
    id: "professional-execution",
    title: "Professional Execution",
    description: "Combine everything: advanced spreads, portfolio management, and your written trading plan.",
    level: "Advanced",
    semester: 6,
    lessons: [],
  },
  {
    id: "building-a-trading-plan",
    title: "Building a Trading Plan",
    description: "Create your personal written trading plan — the document that governs every decision you make.",
    level: "Intermediate",
    semester: 5,
    lessons: [],
  },
];

export const ALL_LESSONS = lessons;

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getAllLessons(): Lesson[] {
  return lessons;
}
