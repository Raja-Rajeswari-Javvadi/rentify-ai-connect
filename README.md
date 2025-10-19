🏠 RentalFinder – AI-Powered Rental Discovery Platform

A smart, modern web platform that connects house owners and rental seekers with ease. Built using AI-assisted development, RentalFinder simplifies the rental process through intuitive design, advanced filters, and cloud-powered data management.

🌟 Overview

RentalFinder (Rentify AI Connect) is a full-stack web application that enables:

🏘️ Owners to upload and manage their rental property listings.

👩‍💼 Rental seekers to browse, search, and connect with owners directly.

This project aims to make renting homes simpler, faster, and more transparent — with a clean and responsive UI designed using modern tools and AI-generated components.

🚀 Features
👤 Role-Based Access

House Owners:
Upload property details, images, and essential information like:

Address (with Google Maps integration)

Water facility availability

Current meter details

House type (1BHK, 2BHK, etc.)

Rent per month

Rental Finders:

Browse and search houses by location, budget, or house type.

View detailed house cards with photos and map previews.

Contact or send booking requests to owners.

🧩 Additional Features

Interactive Google Maps integration for property locations.

Image uploads for houses.

Search bar and filters for easy discovery.

Clean, responsive UI with Tailwind CSS and subtle animations.

Authentication for secure user access (Firebase/Supabase).

🛠️ Tech Stack
Category	Technologies Used
Frontend	React + Vite + Tailwind CSS + Framer Motion
Backend / Database	Firebase / Supabase (for authentication, data, and storage)
APIs	Google Maps API
Hosting	Vercel / Netlify / Firebase Hosting
AI Builder	Lovable AI (for initial app generation and design)
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Raja-Rajeswari-Javvadi/rentify-ai-connect.git
cd rentify-ai-connect

2️⃣ Install Dependencies
npm install

3️⃣ Run the App
npm run dev

4️⃣ Open in Browser

Visit 👉 http://localhost:5173

🔐 Environment Setup

Create a .env file in the project root with your configuration:

For Firebase:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id


For Supabase:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

🎨 Design Highlights

Elegant navigation bar and hero section for intuitive navigation.

Modern color palette: teal, navy blue, white, and soft orange.

Glassmorphism-inspired cards with hover animations.

Fully responsive layout optimized for mobile and desktop.

🧠 Future Enhancements

AI-based rental recommendations (suggesting houses based on user preferences).

Chat system between owners and renters.

Booking management system with status tracking.

Admin dashboard for listing and user management.

Integration with payment gateways for deposits or booking fees.

🤝 Contributing

Contributions are welcome!
If you’d like to improve RentalFinder, please:

Fork the repo 🍴

Create a feature branch

Submit a pull request

📜 License

This project is open-source and available under the MIT License.

💡 Acknowledgments

Built with ❤️ using Lovable AI

Special thanks to OpenAI for development support and ideation

Designed and developed by Rajeswari Javvadi
