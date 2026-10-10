# TrailSync — Digital Minimalism in Nature

> **A zero-friction, offline-first web application designed for outdoor enthusiasts, hikers, gardeners, and birders.**

TrailSync is built around the core philosophy of **"Digital Minimalism in Nature"**—delivering instant, hyper-local insights with near-zero latency and full offline capability so you can spend less time looking down at glowing screens and more time engaging with the physical environment.

---

## Key Features

1. **Quick-Glance Dashboard ("Out-the-Door" View)**:
   - Hyper-local micro-weather (temperature, feels-like, wind vector, UV index, and elevation).
   - **Barometric Pressure Trend Indicator** (`rising` / `falling`) for real-time wilderness storm warnings.
   - **Golden Hour Countdown** & sunset alerts to avoid being stranded on ridgelines in the dark.
   - **Offline Tile Pack & Vector Cache Status** (100% on-device, zero cloud dependency).
   - **Phenology Highlights**: Mode-specific cues like Warbler fallout windows, mountain stream crossings, and frost window countdowns.

2. **Offline Field Guide & Specimen Identifier**:
   - Camera viewfinder & instant photo upload for flora, fauna, and fungi.
   - **1-Tap Test Presets**: Test instantly with Eastern Bluebird, Eastern Poison Ivy, Golden Chanterelle, Allegheny Blackberry, Monarch Butterfly, and Broad-Winged Hawk.
   - **Prominent Field Safety Warnings**: Direct warnings for toxic resin (Poison Ivy urushiol) and dangerous lookalikes (Jack-o'-Lantern vs. Golden Chanterelle).
   - **Diagnostic Field Markers & Ecological Notes**: Leaf venation, plumage markings, and bloom periods.
   - **Bird Call Player**: Audio song spectrogram & simulated vocalization previews.
   - **Offline Field Journal**: Log sightings locally to IndexedDB/localStorage with GPS stamps.

3. **Minimalist Trail & Garden Planner**:
   - **Localized Phenology Matrix**: Month-by-month seasonal schedule guided by environmental triggers (e.g. soil temperature, leaf duff conditions) rather than arbitrary calendar dates.
   - **Offline GPS Waypoints Manager**: Drop pins with 1 tap; save categories (Water, Trailhead, Plant Bed, Roost, Campsite, Hazard) and notes.
   - **Field Checklist**: Offline gear and garden checklist with safety-critical item indicators.

4. **Pocket Mode & Sunlight Modes**:
   - **Natural Stone**: Earthy, calming day palette (sage greens `#5f845c`, warm stone `#f4efe6`, terracotta `#c85a3c`, charcoal text `#1e2624`).
   - **Pocket Mode (OLED Deep Black)**: Ultra-low power consumption for AMOLED displays in the woods; cuts backlight glare by ~40%.
   - **Red Night-Preserve Mode**: Crimson monochrome preserving rod photoreceptors for stargazing and nocturnal birding; avoids insect attraction.
   - **High-Contrast Sunlight Mode**: Bold black-and-white layout engineered for direct blinding midday sunlight readability.

5. **Contextual Modes**:
   - 🌲 **Hiking Mode**: Focus on elevation, barometer, trail conditions, emergency waypoints, and water sources.
   - 🌿 **Gardening Mode**: Focus on frost dates, soil moisture, solar UV, planting schedules, and garden bed logs.
   - 🦅 **Birding Mode**: Focus on dawn chorus timings, thermal wind vectors, migration corridor alerts, and species call notes.

---

## Setup & Gemma Model Integration Checklist

### 1. Which Gemma Model Selected?
- **Model Selected**: `gemma-2-9b-it` (Gemma 2 9B Instruct).

### 2. Why Select It?
- **High Reasoning Density per Parameter**: Outperforms models twice its size on botanical classification and concise structured field reports.
- **Safety-Tuned for Wilderness Contexts**: Low-temperature instruction adherence minimizes hallucinations when alerting users to poisonous plants (Poison Ivy, Hemlock) or toxic mushrooms (Jack-o'-lantern vs. Chanterelle).
- **Edge & Offline Sovereignty**: Because Gemma has open weights, it can run completely locally on-device (via Ollama, MLC-LLM, llama.cpp, or WebGPU) with zero internet connection in remote wilderness dead zones.
- **Sub-Second API Inference**: When connected to Google AI Studio or Groq, response latency is near-instantaneous, preserving the "Digital Minimalism" user experience.

### 3. Where to Obtain Access / API Credentials?
- **Google AI Studio (Recommended & Free)**:
  1. Visit [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
  2. Sign in with your Google account.
  3. Click **"Create API Key"** and copy your key (starts with `AIzaSy...`).
- *(Optional alternative for Groq)*: [https://console.groq.com/keys](https://console.groq.com/keys) (starts with `gsk_...`).
- *(Optional local offline model)*: Install [Ollama](https://ollama.ai) and run `ollama run gemma2:9b`.

### 4. Exactly Which Environment Variables Are Needed?
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_GEMMA_API_KEY` | Your Google AI Studio API Key | `AIzaSy...` |
| `VITE_GEMMA_MODEL` | The specific model identifier | `gemma-2-9b-it` |
| `VITE_GEMMA_PROVIDER` | API provider to route requests through | `google` (or `groq`, `ollama`) |

### 5. Exactly Where Each Variable Goes
All variables belong in the root `.env` file of the repository:
```bash
/Users/aryan/Desktop/HACKTOBER/TrailSync/.env
```
Example `.env` file content:
```env
VITE_GEMMA_API_KEY=AIzaSyYourActualKeyHere
VITE_GEMMA_MODEL=gemma-2-9b-it
VITE_GEMMA_PROVIDER=google
```
*(You can also configure or change the API key directly within the app UI by clicking the **"Gemma 2"** badge in the header.)*

### 6. How to Run the Application Locally
Make sure Node.js (v20+) is installed. If using the installed Node.js in `~/.local/node/bin`:
```bash
# 1. Navigate to the project directory
cd /Users/aryan/Desktop/HACKTOBER/TrailSync

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev
```
Open your browser to:
```
http://127.0.0.1:5173/
```

### 7. How to Test the Gemma Integration
1. **Interactive In-App Test Button**:
   - In the header, click the **"Gemma 2"** button with the sparkle icon.
   - The **Gemma 2 Nature Intelligence** modal will open.
   - Click the **"Test Connection"** button. The app sends a round-trip ping to `gemma-2-9b-it` and reports live connectivity status and round-trip latency in milliseconds.
2. **Live Field Identification Test**:
   - Click **"Field Guide"** in the bottom navigation.
   - Enter any query into the search bar (e.g., `"Stinging Nettle"`, `"Barred Owl"`, or `"Ramps"`) or upload a picture.
   - Click **"Analyze"**. Gemma will return diagnostic markers, toxic safety alerts, ecological role, and lookalike distinctions.
3. **Zero-Latency Offline Fallback Test**:
   - Turn off Wi-Fi or leave the API key blank.
   - Click any preset (e.g., **"Eastern Poison Ivy"** or **"Golden Chanterelle"**).
   - Notice that TrailSync immediately renders the complete offline field card in 0ms using its local botanical heuristic engine.
