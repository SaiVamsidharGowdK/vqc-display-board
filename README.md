# 🛕 Tirumala VQC-2 Srivari Darshanam Live Display Board

A high-contrast, hyper-scannable real-time dashboard UI built with **React** and **Tailwind CSS**, designed for a **55-inch+ outdoor LED Display Board** mounted inside the **Vaikuntam Queue Complex (VQC-2, Compartment #16)** at Tirumala Tirupati Devasthanams (TTD).

The display board informs 300+ waiting devotees about their exact compartment status, accurate live countdown timer, **Srivari Darshanam** status, expected Darshan time, and automated door-unlatching audio/visual alerts. It is engineered for optimal legibility from 20–30 feet away in high-density, high-stress outdoor environments.

---

## ✨ Features & Architecture

### 1. 🛕 Header Section with Divine Artwork
- **Lord Venkateswara Swamy Portrait**: Divine portrait with golden glowing frame, active beacon indicator, and `OM NAMO VENKATESAYA` badge.
- **Compartment Tag**: High-visibility badge (`VQC-2 | COMPARTMENT #16`) with batch capacity statistics (`320 Devotees | SD-401 to SD-720`).
- **Live System Clock**: Digital `HH:MM:SS AM/PM` IST clock in high-contrast cyan LED typography.
- **Active Service Badge**: `SARVA DARSHAN BATCH` identifier.

### 2. 🟢 Srivari Darshanam Status Banner
Dynamic status banner supporting 3 real-time operational states:
- **🟢 Normal Movement**: `SRIVARI DARSHANAM STATUS: QUEUE MOVING NORMAL` (`~2,800 Devotees/Hr`).
- **🔴 Seva Hold**: `SRIVARI DARSHANAM STATUS: QUEUE STOPPED (Tiruppavada Seva)` (`Est. Finish: 06:15 AM`).
- **🟡 Protocol Hold**: `SRIVARI DARSHANAM STATUS: PROTOCOL HOLD` (`VIP Break Clearance, +15 mins`).

### 3. ⏱️ Central Hero Countdown Block
- **Massive 55" Monospace Readout**: Giant zero-shift readout (`00 : 24 : 15`) with `HOURS`, `MINUTES`, and `SECONDS` labels.
- **Expected Time to Darshan**: Live estimated Darshan timestamp (`EXPECTED TIME TO DARSHAN: 02:30:00 PM`).
- **Re-Entry Cutoff Badge**: Tracks 10-minute prior cutoff (`RE-ENTRY CUTOFF: 02:20:00 PM`).
- **Assembly Warning**: Triggers bouncing warning banner when countdown reaches `<= 00:02:00`.

### 4. 🔔 Automated Door Release & Audio Alarm Overlay (`00:00:00`)
- **Strobe Red Overlay**: Full-screen background shifts to flashing high-contrast Alert Red.
- **Pulsing Headline**: `🔔 COMPARTMENT DOOR UNLATCHING NOW — PROCEED FOR SRIVARI DARSHANAM`.
- **Web Audio API Synthesizer**: Plays multi-tone temple gate siren and displays animated soundwaves equalizer.

### 5. 📢 Multilingual Facility Ticker
- Continuous marquee ticker providing critical devotee updates (Free milk/food at Counter B, re-entry passes, token guidance).
- Instant language switching: **English**, **Telugu (తెలుగు)**, and **Hindi (हिंदी)**.

### 6. ⚙️ Interactive Debug & Control Panel
- State switches: Green Normal, Yellow Protocol, Red Seva Hold.
- Timer Fast-Forward shortcuts (`24m 15s`, `02m 00s` assembly warning, `00m 00s` door unlatch).
- Pause/Resume, +15 Min extension, Audio chime test, and 55" LED matrix grid simulator.

---

## 🚀 Quick Start & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SaiVamsidharGowdK/vqc-display-board.git
   cd vqc-display-board
   ```

2. **Run locally via Python HTTP Server**:
   ```bash
   python -m http.server 8899
   ```

3. **Open in Browser**:
   Navigate to `http://localhost:8899` in your web browser.

---

## 🎨 Color Palette & Typography

- **Background**: Deep Navy (`#0B1120`) for outdoor light absorption and extreme contrast.
- **Active Green**: Vivid Neon (`#10B981`) for queue movement.
- **Warning Yellow**: Amber Gold (`#F59E0B`) for assembly warnings and protocol holds.
- **Alert Red**: High-Strobe Red (`#EF4444`) for rituals and door unlatching.
- **Typography**: Inter (Body & Headers) + Share Tech Mono & JetBrains Mono (Clocks & Timers).

---

## 📜 License

Distributed under the MIT License. Open for TTD devotee queue management implementations.
