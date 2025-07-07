# LoopIn IET Portal

Welcome to the LoopIn IET Portal! This project is a modern web portal for the IET Committee, designed to showcase team members, events, announcements, newsletters, and more. It features a beautiful UI, smooth animations, and a robust backend powered by Supabase.

## 🚀 Features
- Team member directory with roles, departments, and social links
- Events listing and upcoming events
- Announcements and recent updates
- Newsletters and subscription management
- User authentication and profile management
- Responsive design and smooth UI/UX

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Database & Auth:** Supabase (PostgreSQL)
- **Other:** Lucide Icons, Radix UI, Shadcn UI

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/loopin-iet-portal.git
cd loopin-iet-portal
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Supabase
- The backend is pre-configured to use a Supabase project. If you want to use your own, update the Supabase URL and Service Role Key in `server/server.js`.
- Ensure your Supabase database schema matches the one in `server/database.sql`.

### 4. Run the App
- **Frontend:**
  ```bash
  npm run dev
  ```
- **Backend:**
  ```bash
  cd server
  npm install
  npm run dev
  ```

### 5. Open in Browser
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view the app.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 📄 License
This project is licensed under the MIT License.

## 🙏 Acknowledgements
- [Supabase](https://supabase.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Framer Motion](https://www.framer.com/motion/)

---

For any questions or support, please open an issue or contact the maintainers. 