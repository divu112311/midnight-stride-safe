# Midnight Mile: walk home with confidence 🌙

**A women's safety companion for getting home at night.** Recognized at the **Google Maps Hackathon**.

Walking home after dark shouldn't mean texting a friend "I'm leaving now" and hoping for the best. Midnight Mile picks safer routes, points out places you can go for help, keeps you company along the way, and tells your trusted contacts when you've arrived, or when you haven't.

## Features

- **🗺️ Smart routes.** Route guidance scored for safety using lighting, foot traffic and crime data, not just the fastest path.
- **🏥 Safe spots.** Nearby police stations, hospitals and 24/7 stores along your route, one tap away.
- **🗣️ AI companion.** A voice companion that checks in and talks with you during the walk, with live journey progress and safety status.
- **✅ Auto check-in.** Arrival detection confirms you're home. If you don't check in, your trusted contacts are notified.
- **🚨 Emergency alert.** One tap sends an alert to your trusted contacts.

## User journey

```
Landing ──► Login (location permission) ──► Home: safety score + nearby safe spots
                                                  │
                                                  ▼
                                   Companion: live journey, voice companion, SOS
                                                  │
                                                  ▼
                                   Check-in: "You're safe!" → contacts notified
```

## Status

This is a hackathon prototype focused on the product experience and user flow. The safety scores, routes and companion messages are simulated in this version. A production version would connect to the Google Maps Platform (Directions and Places), real safety data sources, and an LLM voice agent.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router and the browser Geolocation API.

## Running locally

```bash
npm install
npm run dev
```

---

Built by **Divya Mahajan** · [Website](https://divu112311.github.io) · [LinkedIn](https://www.linkedin.com/in/divyamahajan11)
