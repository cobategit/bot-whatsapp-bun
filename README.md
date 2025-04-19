# 🤖 WhatsApp Bot dengan Bun.js

Bot WhatsApp modular dan ringan menggunakan [Bun.js](https://bun.sh), mendukung command-based system, integrasi database PostgreSQL, ChatGPT mini, sistem pemesanan, payment gateway, dashboard admin, serta notifikasi ke admin via WhatsApp dan Discord.

---

## 🚀 Fitur Utama

- 🔧 Command Parser Modular (`!help`, `!list-produk`, `!beli <nama-produk> <quantity>`, dll)
- 📦 PostgreSQL untuk check produk, stock, data user/pesanan ( ongoing )
- 🧠 Integrasi ChatGPT (`!ask`) ( ongoing )
- 🧹 Middleware Filter kata kasar / NSFW

---

## 🛠️ Teknologi

- **[Bun.js](https://bun.sh)** – Runtime super cepat
- **[Baileys](https://github.com/WhiskeySockets/Baileys)** – WhatsApp Web API
- **[PostgreSQL](https://www.postgresql.org/)** – Database ( ongoing )
- **[Kysely]** – ORM ( ongoing )

---

## 📂 Struktur Folder

## 
```bash
src/ 
├── bot/ 
│    ├── wa.ts # Entry point bot WhatsApp 
└── commands/ # Folder command modular 
│    ├── help.ts # Command bantuan (!help)
│    └── unknown.ts # Fallback jika command tidak ditemukan 
├── config/ # configuration database or something
└── services/
│    └── message-service.ts # Helper untuk pengiriman/format pesan
├── types/ 
│    └── command.ts # Definisi tipe Command
├── utils/
│    ├── auto-reply.ts # Auto-reply default berdasarkan kata kunci
│    ├── nsfw.ts # Filter kata kasar atau NSFW
│    ├── parse-command.ts # Parser pesan menjadi command + args  
│    └── index.ts # Aggregator semua utilitas
```

---

## 📦 Instalasi

### 1. Clone Repo

```bash
git clone https://github.com/username/wa-bot-bun.git
cd wa-bot-bun
bun install
npm run dev
