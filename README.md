# 🚀 SystemObserverWidget

![GitHub repo](https://img.shields.io/github/repo-size/KobaruAkiba/SystemObserverWidget)
![Platform](https://img.shields.io/badge/platform-Windows-blue)
![Status](https://img.shields.io/badge/status-in%20development-orange)
[![CodeQL Advanced](https://github.com/KobaruAkiba/SystemObserverWidget/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/KobaruAkiba/SystemObserverWidget/actions/workflows/codeql.yml)

A lightweight, no-nonsense, open-source **Electron widget** for real-time system monitoring — no bloated dashboards, no hidden daemons, just straight-up data.

> *"Think of it as your system's vital signs monitor — without the hospital smell."*

---

## 📚 Table of Contents

- [🔍 What Is This?](#-what-is-this)
- [✨ Features](#-features)
  - [🧰 What You Get](#-what-you-get)
  - [🛠️ How It Works](#️-how-it-works)
  - [🧪 Compatibility](#-compatibility)
  - [🧑‍💻 How To Use It](#-how-to-use-it)
  - [📡 Under The Hood](#-under-the-hood)
- [🔧 Installation](#-installation)
- [🗺️ Roadmap (Sneak Peek)](#️-roadmap-sneak-peek)
- [🤝 Contribute / Feedback](#-contribute--feedback)
- [👋 Final Words](#-final-words)

---

## 🔍 What Is This?

**SystemObserverWidget** is a minimalistic system monitor built using **Electron** and **Lit**. It's designed to live quietly on your desktop, giving you system stats without screaming for attention — perfect for devs, tech geeks, and tinkerers alike.

---

## ✨ Features

### 🧰 What You Get

- ⚡ **Lightweight** and fast
- 🧩 **Widget-style UI** — draggable, resizable, always-there
- 🔓 **Open-source** and tweakable
- 🧼 **No clutter** — just the essentials, clean and clear

---

### 🛠️ How It Works

Behind the scenes, Electron spins up a tiny window, and **Lit components** do the rendering magic.  
Some shadow-DOM sorcery is being bypassed for styling reasons (💡 yeah, I know — patch coming soon).

---

### 🧪 Compatibility

- ✅ Tested on **Windows only** (for now)
- 💻 Designed for **AMD CPUs** + **NVIDIA GPUs**
- 🚧 Future support for other chipsets and OSes is on the roadmap

---

### 🧑‍💻 How To Use It

- 🟦 Just launch it: it's a **portable widget**
- 🟰 Move it via the **top notch**
- ↔️ Resize like any window
- ➖ Minimizing works — **but memory pause is WIP**
- ❌ No close button — just minimize or task-kill like a boss
- 🛠️ No auto-start — but you can add it manually if you're into that

---

### 📡 Under The Hood

- Data refreshes every **3 seconds** (configurable soon)
- Uses the battle-tested [`systeminformation`](https://www.npmjs.com/package/systeminformation) package  
  > ~ 6 million downloads can't be wrong, right?

- No weird background behavior  
- Source code is clean and readable — **inspect it, fork it, play with it**

---

## 🔧 Installation

### Portable Build

Currently, only the portable version is supported.

- 📦 A compiled build will be available soon (stay tuned!)
- 🧪 Or build it yourself:

> This bash is still a work in progress
```bash
git clone https://github.com/your-username/SystemObserverWidget.git
cd SystemObserverWidget
bun install # or npm install
bun run build
```
>Note: you might need to tweak Prettier configs or packaging settings depending on your setup.

## 🗺️ Roadmap (Sneak Peek) 
- 🧠 Smarter memory usage while operating and when minimized
- ⚙️ Configurable options (as refresh interval and disabling always on top)
- 📦 Reducing forged package size
- 📦 Stable standalone packager
- ✅ Shadow-DOM support improvements
- 🪟 Extend cross-platform and hardware support (macOS/Linux)
- ⚙️ More hardware "monitors"?
- 🌈 Customizable themes?
- 🌈 Better icons and animations?

## 🤝 Contribute / Feedback
Have ideas? Found a bug? Want to yell at the lack of a close button?
Pull requests and GitHub Issues are open. Let’s make this better together 💪

## 👋 Final Words
Minimal, focused, and nerd-approved.
If you want something more complex… well, this ain’t it 😎
