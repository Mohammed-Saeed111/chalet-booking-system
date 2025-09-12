# Chalet Booking System Frontend

A modern, responsive React application for chalet booking and management built with Vite, TypeScript, and TailwindCSS.

## 🚀 Features

- **🏠 Home Page** - Beautiful landing page with hero section and features
- **🔐 Authentication** - User login/register with role-based access
- **🏔️ Chalet Listings** - Browse and search chalets with filtering
- **📅 Booking System** - Book chalets with date selection
- **👥 User Management** - Different dashboards for users, employees, and admins
- **🌙 Dark Mode** - Toggle between light and dark themes
- **📱 Responsive Design** - Works on all device sizes
- **⚡ Fast Performance** - Built with Vite for optimal speed

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Context API** - State management

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chalet-booking-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## 🔑 Demo Accounts

Test the application with these demo accounts:

- **Admin**: `admin@chalet.com` / `admin123`
- **Employee**: `employee@chalet.com` / `employee123`
- **User**: `user@chalet.com` / `user123`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Chalets.tsx     # Chalet listings
│   ├── ChaletDetails.tsx # Individual chalet details
│   ├── Booking.tsx     # User bookings
│   ├── About.tsx       # About page
│   ├── Services.tsx    # Services page
│   ├── Contact.tsx     # Contact page
│   ├── EmployeeDashboard.tsx # Employee dashboard
│   └── AdminDashboard.tsx    # Admin dashboard
├── context/            # React Context for state management
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication hook
├── utils/              # Utility functions
│   └── api.ts          # API utility functions
└── App.tsx             # Main application component
```

## 🌐 Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Vite project
4. Deploy!

The `vercel.json` file contains the necessary configuration for SPA routing.

## 🎨 Customization

### Styling
- Modify TailwindCSS classes in components
- Update colors in `tailwind.config.js`
- Add custom CSS in `src/index.css`

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- TailwindCSS team for the utility-first CSS framework
- Vercel for the deployment platform