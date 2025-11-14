# IPL Auction Dashboard - Complete Setup & Usage Guide

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Detailed Setup](#detailed-setup)
3. [Using the Dashboard](#using-the-dashboard)
4. [Advanced Configuration](#advanced-configuration)
5. [Troubleshooting](#troubleshooting)
6. [PWA Installation](#pwa-installation)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to `http://localhost:3000` (or 3001 if 3000 is busy)

### Step 4: Start Auction
Click **"Start Auction"** button in the controls panel

You're ready to go! 🎉

---

## 📖 Detailed Setup

### System Requirements
- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Disk Space**: ~200MB for dependencies

### Installation Steps

1. **Navigate to Project Directory**
   ```bash
   cd /Users/vishale/ipl
   ```

2. **Install All Dependencies**
   ```bash
   npm install
   ```
   
   This installs:
   - Next.js 16.0.3
   - React 19.2.0
   - TypeScript 5.x
   - Tailwind CSS 4
   - Framer Motion (animations)
   - idb (IndexedDB wrapper)

3. **Verify Installation**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ✓ Ready in Xms
   ○ Local: http://localhost:3000
   ```

4. **Build for Production (Optional)**
   ```bash
   npm run build
   npm start
   ```

---

## 🎮 Using the Dashboard

### Dashboard Overview

The interface is divided into 4 main sections:

#### 1. **Auction Controls (Left Panel)**
- Start/Pause/Resume buttons
- Reset auction
- Progress tracker
- Quick stats

#### 2. **Current Player Panel (Center Top)**
- Player photo (initials)
- Name and country
- Base price
- Current bid (live updating)
- Stats (matches, runs, wickets, etc.)
- IPL history

#### 3. **Live Bidding Panel (Center Middle)**
- Current highest bid display
- Bid increment buttons (+0.25, +0.5, +1, +2, +5 Cr)
- Team selection grid
- Action buttons:
  - **Raise Bid**: Increase bid by increment
  - **Sold!**: Finalize player purchase
  - **Unsold**: Mark player as unsold
  - **Undo**: Revert last action

#### 4. **Teams Panel (Right)**
- All 10 teams with:
  - Remaining purse
  - Total spent
  - Players count
  - Recent purchases
  - Visual purse bars
  - Active bidder highlight

#### 5. **Next Player Preview**
- Shows upcoming player
- Name, role, country
- Base price

#### 6. **History Panel (Bottom)**
- **Sold Tab**: All purchased players with prices
- **Unsold Tab**: Players that didn't sell
- Summary statistics

---

## 🎯 Step-by-Step Auction Flow

### Starting an Auction

1. **Initialize**
   - Open dashboard
   - Verify all 10 teams are shown
   - Check first player is displayed

2. **Start**
   - Click **"Start Auction"** in controls
   - Status changes to 🔴 LIVE
   - Current bid initializes to base price

### Conducting Bidding

3. **Place First Bid**
   - Click on a team (e.g., MI)
   - Or use increment buttons (+0.25 Cr, etc.)
   - Current bid updates
   - Team is highlighted in green

4. **Raise Bid**
   - Click another team to switch bidder
   - Or click **"Raise Bid"** to increase current team's bid
   - Bid increases by selected increment

5. **Finalize Player**
   
   **Option A: Sold**
   - Click **"Sold!"** button
   - Player assigned to currently bidding team
   - Team's purse deducted
   - Automatically moves to next player
   
   **Option B: Unsold**
   - Click **"Unsold"** button
   - Player added to unsold list
   - Moves to next player
   - No purse changes

6. **Undo Mistakes**
   - Click **"Undo"** to revert last action
   - Can undo up to 10 actions
   - State completely restored

### Pausing and Resuming

7. **Pause Auction**
   - Click **"Pause"** in controls
   - All bidding buttons disabled
   - Status shows ⏸ PAUSED

8. **Resume**
   - Click **"Resume"**
   - Bidding re-enabled
   - Status back to 🔴 LIVE

### Completing Auction

9. **Final Player**
   - When all players processed
   - "Next Player" shows "Auction Complete"
   - Review history panel for full results

10. **Reset for New Auction**
    - Click **"Reset Auction"**
    - Confirm dialog appears
    - All teams reset to initial purse
    - All players back to queue
    - History cleared

---

## ⚙️ Advanced Configuration

### Customizing Team Purse

Edit `data/teams.json`:
```json
{
  "id": "mi",
  "name": "Mumbai Indians",
  "initialPurse": 150  // Change from 100 to 150 Cr
}
```

### Adding New Players

Add to `data/players.json`:
```json
{
  "id": "p101",
  "name": "New Player",
  "role": "All-Rounder",
  "country": "India",
  "basePrice": 1.5,
  "stats": {
    "matches": 50,
    "runs": 1200,
    "wickets": 30,
    "average": 28.5,
    "strikeRate": 145.2,
    "economy": 8.1
  },
  "iplHistory": ["MI", "CSK"]
}
```

### Changing Bid Increments

Edit `components/LiveBiddingPanel.tsx`:
```typescript
const incrementOptions = [0.1, 0.25, 0.5, 1.0]; // Custom increments
```

### Default Bid Increment

Edit `lib/db.ts`:
```typescript
bidIncrement: 0.5, // Change from 0.25 to 0.5
```

### Modifying Team Count

1. Edit `data/teams.json` to add/remove teams
2. Update UI grid in `components/TeamsPanel.tsx` if needed
3. Adjust team selector grid in `components/LiveBiddingPanel.tsx`

---

## 🔧 Troubleshooting

### Issue: Port 3000 Already in Use

**Solution:**
The app automatically switches to 3001. Or specify custom port:
```bash
PORT=3002 npm run dev
```

### Issue: Page Doesn't Load Data

**Symptoms:** Blank teams or players

**Solution:**
1. Check browser console for errors
2. Clear IndexedDB:
   - Open DevTools → Application → Storage
   - Clear IndexedDB → `ipl-auction-db`
3. Refresh page

### Issue: State Not Persisting

**Symptoms:** Data lost on refresh

**Solution:**
1. Verify IndexedDB support:
   - Open DevTools → Application → IndexedDB
   - Look for `ipl-auction-db`
2. Check browser privacy settings
3. Disable incognito mode

### Issue: Animations Laggy

**Solution:**
1. Close unnecessary tabs
2. Update browser to latest version
3. Disable hardware acceleration if needed
4. Reduce browser extensions

### Issue: Teams Not Syncing Across Tabs

**Symptoms:** Changes in one tab don't appear in another

**Solution:**
1. Verify BroadcastChannel support
2. Ensure both tabs are same origin
3. Check browser console for errors
4. Refresh all tabs

### Issue: Build Fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## 📱 PWA Installation

### Desktop (Chrome/Edge)

1. Open auction dashboard
2. Look for install icon (➕) in address bar
3. Click → Install
4. App opens in standalone window
5. Works offline!

### Mobile (Chrome/Safari)

#### Android (Chrome)
1. Open dashboard in Chrome
2. Tap menu (⋮)
3. Select "Add to Home Screen"
4. Name the app → Add
5. Icon appears on home screen

#### iOS (Safari)
1. Open dashboard in Safari
2. Tap Share button (□↑)
3. Scroll and tap "Add to Home Screen"
4. Name the app → Add
5. Icon appears on home screen

### Benefits of PWA Installation
- ✅ Works completely offline
- ✅ Faster load times
- ✅ App-like experience
- ✅ No browser chrome
- ✅ Home screen icon

---

## 📊 Data Management

### Exporting Auction Results

Currently manual (future enhancement):
1. Open DevTools → Console
2. Run:
   ```javascript
   // Get all sold players
   const db = await indexedDB.open('ipl-auction-db', 1);
   // Copy state object
   ```

### Backing Up Data

IndexedDB is stored in browser. To backup:
1. Export state manually before reset
2. Take screenshots of final results
3. Use browser's export functionality

### Clearing All Data

```javascript
// In browser console
indexedDB.deleteDatabase('ipl-auction-db');
// Then refresh page
```

---

## 🎓 Tips & Best Practices

### For Auctioneers

1. **Test Run**: Do a practice auction first
2. **Screen Share**: Use large display for participants
3. **Internet**: Not required, but useful for reference
4. **Backup**: Keep browser tab open as backup
5. **Undo**: Don't hesitate to undo mistakes

### For Organizers

1. **Customize Data**: Add/edit players before event
2. **Set Rules**: Define increment rules beforehand
3. **Time Limits**: Set external timer if needed
4. **Record**: Screen record for post-event review
5. **Multiple Screens**: Mirror display for large venues

### Performance Tips

1. Close unnecessary browser tabs
2. Use modern browser (Chrome/Edge recommended)
3. Clear browser cache if sluggish
4. Disable browser extensions during auction
5. Use incognito for fresh start (note: no persistence)

---

## 🆘 Getting Help

### Quick Help
- Check this guide's Troubleshooting section
- Review README.md
- Check browser console for errors

### Reporting Issues
Open an issue with:
- Browser and version
- Steps to reproduce
- Screenshots if applicable
- Console errors (if any)

---

## 🔄 Updating the Application

```bash
# Pull latest changes
git pull origin main

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

---

**Happy Auctioning! 🏏**

For questions or feature requests, please open an issue on GitHub.
