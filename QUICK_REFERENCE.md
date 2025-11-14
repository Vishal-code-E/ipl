# IPL Auction Dashboard - Quick Reference

## 🚀 Quick Start
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## ⌨️ Key Actions

### Auction Flow
1. **Start** → Click "Start Auction"
2. **Bid** → Click team + increment button
3. **Sell** → Click "Sold!" button
4. **Unsold** → Click "Unsold" button
5. **Next** → Automatically moves to next player

### Controls
| Action | Button | Shortcut |
|--------|--------|----------|
| Start Auction | "Start Auction" | - |
| Pause | "Pause" | - |
| Resume | "Resume" | - |
| Raise Bid | "Raise Bid" | - |
| Sell Player | "Sold!" | - |
| Mark Unsold | "Unsold" | - |
| Undo | "Undo" | - |
| Reset | "Reset Auction" | - |

## 📊 Dashboard Layout

```
┌─────────────────────────────────────────────────────┐
│  IPL AUCTION DASHBOARD          🔴 LIVE  Player 5/100│
├──────────┬──────────────────────────┬────────────────┤
│          │                          │                │
│ CONTROLS │   CURRENT PLAYER         │    TEAMS       │
│          │   - Photo                │    - MI        │
│ ▶ Start  │   - Name: Virat Kohli   │    - CSK       │
│ ⏸ Pause  │   - Role: Batsman       │    - RCB       │
│ 🔄 Reset │   - Base: ₹2.0 Cr       │    - ...       │
│          │   - Bid:  ₹5.5 Cr       │                │
│ Progress │                          │    (Purse,     │
│ ▓▓░░░░   │   BIDDING PANEL          │     Players)   │
│ 5/100    │   - Team selector        │                │
│          │   - +0.25 +0.5 +1 +2 +5 │                │
│          │   - Raise | Sold | Unsold│                │
│          │                          │                │
│          │   NEXT PLAYER            │                │
│          │   - Preview card         │                │
├──────────┴──────────────────────────┴────────────────┤
│  HISTORY - Sold (50) | Unsold (5)                    │
│  - Player 1 → MI → ₹3.5 Cr                          │
│  - Player 2 → CSK → ₹7.0 Cr                         │
└──────────────────────────────────────────────────────┘
```

## 💰 Bidding Logic

### Increment Options
- **₹0.25 Cr** - Small increment
- **₹0.5 Cr** - Medium increment
- **₹1.0 Cr** - Standard increment
- **₹2.0 Cr** - Large increment
- **₹5.0 Cr** - Huge increment

### How Bidding Works
```
Base Price: ₹2.0 Cr
↓
Click MI + ₹0.5 Cr → Bid: ₹2.5 Cr (MI)
↓
Click CSK + ₹1.0 Cr → Bid: ₹3.5 Cr (CSK)
↓
Click "Raise Bid" → Bid: ₹4.0 Cr (CSK)
↓
Click "Sold!" → Player → CSK for ₹4.0 Cr
```

## 🎯 Team Purse Tracking

Each team starts with: **₹100 Cr**

```
Example:
MI purchases:
- Player 1: ₹5.0 Cr
- Player 2: ₹3.5 Cr
- Player 3: ₹8.0 Cr

Remaining Purse: ₹100 - ₹16.5 = ₹83.5 Cr
Total Spent: ₹16.5 Cr
Players: 3
```

## 🔄 Undo System

- Stores last **10 actions**
- Click "Undo" to revert
- Completely restores previous state
- Works for:
  - Bids
  - Sold players
  - Unsold players
  - Team purse changes

## 💾 Data Persistence

### What's Saved (IndexedDB)
✅ Auction state
✅ All bids
✅ Sold/Unsold players
✅ Team purses
✅ Current player index
✅ Bid history

### When It's Saved
- After every action
- Automatically
- Survives page refresh
- Persists across sessions

## 📱 Multi-Tab Sync

Open dashboard in multiple tabs:
1. Tab 1: Main auctioneer view
2. Tab 2: Display for audience
3. Tab 3: Backup view

All tabs **sync in real-time** (<100ms)

## 🎨 Status Indicators

| Status | Icon | Meaning |
|--------|------|---------|
| Not Started | ⚪ READY | Auction hasn't begun |
| Live | 🔴 LIVE | Auction in progress |
| Paused | ⏸ PAUSED | Auction paused |

## 📈 Quick Stats

### Available in Dashboard
- Current player index (e.g., 5/100)
- Total sold players
- Total unsold players
- Team-wise spending
- Remaining purse per team
- Players per team

## 🛠️ Customization Quick Guide

### Change Team Purse
```json
// data/teams.json
"initialPurse": 150  // Change from 100
```

### Add Player
```json
// data/players.json
{
  "id": "p101",
  "name": "New Player",
  "role": "Batsman",
  "country": "India",
  "basePrice": 1.5,
  "stats": { "matches": 50 }
}
```

### Modify Increments
```typescript
// components/LiveBiddingPanel.tsx
const incrementOptions = [0.1, 0.25, 0.5, 1.0, 2.0];
```

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Data not loading | Clear IndexedDB, refresh |
| Port 3000 busy | Use port 3001 (auto-switches) |
| State not syncing | Refresh all tabs |
| Animations laggy | Close other tabs, update browser |
| Build fails | `rm -rf .next && npm run build` |

## 📚 File Locations

```
Key Files:
├── app/page.tsx              # Main dashboard
├── hooks/useAuction.ts       # Auction logic
├── lib/db.ts                 # Database operations
├── components/               # UI components
├── data/players.json         # Player data (100)
└── data/teams.json           # Team data (10)
```

## ⚡ Performance Tips

1. Use Chrome/Edge (recommended)
2. Close unnecessary tabs
3. Disable browser extensions
4. Update to latest browser version
5. Clear cache if slow

## 🎓 Best Practices

### For Auctioneers
✅ Do a test run first
✅ Keep a backup tab open
✅ Use large display for participants
✅ Don't hesitate to undo mistakes
✅ Pause if needed

### For Organizers
✅ Customize data before event
✅ Set increment rules beforehand
✅ Test on actual display setup
✅ Screen record for review
✅ Have contingency plan

## 📞 Help & Support

- **Setup Issues**: Check SETUP_GUIDE.md
- **Feature Docs**: See FEATURES.md
- **Full Manual**: Read README.md
- **Questions**: Open GitHub issue

## 🔗 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code quality

# Database
# Clear all data (in browser console)
indexedDB.deleteDatabase('ipl-auction-db');
```

---

**Quick Tip**: Bookmark this page for instant reference during auctions! 🏏
