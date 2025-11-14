# IPL Live Auction Dashboard

A fully interactive, **offline-first** IPL auction simulation dashboard built with Next.js, TypeScript, and Tailwind CSS. Perfect for college events, gaming leagues, or real auction practice.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Functionality
- **Single Master Dashboard**: Complete auctioneer control interface
- **Real-time Bidding**: Live bid updates with team highlighting
- **Player Database**: 100+ IPL players from 2010-2025 with comprehensive stats
- **10 IPL Teams**: Complete with purse management and player tracking
- **Offline-First**: Full functionality without internet connection
- **Multi-tab Sync**: BroadcastChannel API for seamless state synchronization

### 🎨 UI/UX
- **Clean White Design**: Professional white background with black text
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Works on mobile, tablet, and desktop
- **Live Status Indicators**: Visual feedback for bidding status
- **Progress Tracking**: Real-time auction progress visualization

### 🔧 Auction Features
- **Flexible Bidding**: Multiple increment options (0.25, 0.5, 1, 2, 5 Cr)
- **Team Selection**: Quick team selection for placing bids
- **Sell/Unsold Actions**: Mark players as sold or unsold
- **Undo Functionality**: Revert last 10 actions
- **Purse Validation**: Automatic purse availability checks
- **History Tracking**: Complete sold/unsold player history

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd /Users/vishale/ipl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
ipl/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── AuctionControls.tsx  # Start/Pause/Reset controls
│   ├── CurrentPlayerPanel.tsx # Player details display
│   ├── LiveBiddingPanel.tsx # Bidding interface
│   ├── TeamsPanel.tsx       # Teams overview
│   ├── NextPlayerPreview.tsx # Next player card
│   └── HistoryPanel.tsx     # Sold/Unsold history
├── hooks/
│   └── useAuction.ts        # Main auction logic hook
├── lib/
│   ├── db.ts                # IndexedDB wrapper
│   └── sync.ts              # BroadcastChannel sync
├── types/
│   └── index.ts             # TypeScript definitions
├── data/
│   ├── players.json         # 100 IPL players dataset
│   └── teams.json           # 10 IPL teams
└── package.json
```

## 🎮 How to Use

### Starting an Auction

1. **Start Auction**: Click "Start Auction" in the controls panel
2. **Select Team**: Click on a team to place a bid
3. **Adjust Bid**: Use increment buttons or "Raise Bid" to increase
4. **Sell Player**: Click "Sold!" when bidding is complete
5. **Or Mark Unsold**: Click "Unsold" if no bids
6. **Continue**: Automatically moves to next player

### Key Actions

- **Raise Bid**: Increase current bid by increment
- **Sold**: Assign player to currently bidding team
- **Unsold**: Mark player as unsold, move to next
- **Undo**: Revert last action (up to 10 steps)
- **Pause/Resume**: Pause and resume auction
- **Reset**: Start fresh auction (with confirmation)

### Purse Management

- Each team starts with ₹100 Cr
- Real-time purse tracking
- Automatic validation prevents overbidding
- Visual progress bars show remaining purse

## 🔧 Technical Details

### Offline Storage
- **IndexedDB**: Persistent state storage
- **Auto-save**: State saved on every action
- **Page Refresh**: Complete state recovery
- **No Backend**: Fully client-side

### Multi-tab Synchronization
- **BroadcastChannel API**: Cross-tab communication
- **Real-time Updates**: <100ms sync latency
- **State Consistency**: All tabs stay in sync

### Performance
- **60 FPS Animations**: Smooth UI transitions
- **Optimized Rendering**: React performance best practices
- **Lazy Loading**: Efficient component loading

## 📊 Data Structure

### Player Object
```typescript
{
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  country: string;
  basePrice: number; // in Crores
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    average?: number;
    strikeRate?: number;
    economy?: number;
  };
  iplHistory?: string[];
}
```

### Team Object
```typescript
{
  id: string;
  name: string;
  shortName: string;
  logo: string; // emoji
  color: string; // hex color
  initialPurse: number; // default 100 Cr
}
```

## 🎨 Customization

### Modify Team Purse
Edit `data/teams.json` and change `initialPurse` values.

### Add More Players
Add player objects to `data/players.json` following the schema.

### Change Bid Increments
Modify `incrementOptions` in `components/LiveBiddingPanel.tsx`.

### Adjust Animations
Edit animation settings in component files using Framer Motion props.

## 🌐 Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Requires IndexedDB and BroadcastChannel API support

## 🔜 Future Enhancements

- [ ] PWA Support with service workers
- [ ] Dark mode toggle
- [ ] Sound effects for bids/sold
- [ ] Export results as PDF/JSON
- [ ] Drag & drop player queue reordering
- [ ] Custom player addition form
- [ ] Multiple auction modes
- [ ] Real IPL team themes/branding

## 🐛 Known Issues

- CSS warning about `@theme` directive (cosmetic, doesn't affect functionality)
- Port 3000 conflict auto-switches to 3001

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📧 Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ for IPL auction enthusiasts

**Tech Stack**: Next.js 16 • React 19 • TypeScript 5 • Tailwind CSS 4 • Framer Motion • IndexedDB

