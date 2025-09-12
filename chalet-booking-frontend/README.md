# Chalet Booking Frontend

A modern React application for chalet booking system built with Vite, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern React 19** with Vite for fast development
- **TypeScript** for type safety
- **TailwindCSS** for responsive design
- **React Router DOM** for client-side routing
- **Dark Mode** support
- **Authentication System** with context API
- **Responsive Design** for all devices
- **Employee & Admin Dashboards**

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
│   ├── Chalets.tsx     # Chalets listing
│   ├── ChaletDetails.tsx # Chalet details
│   ├── Booking.tsx     # Booking management
│   ├── About.tsx       # About us
│   ├── Services.tsx    # Services
│   ├── Contact.tsx     # Contact us
│   ├── EmployeeDashboard.tsx # Employee dashboard
│   └── AdminDashboard.tsx   # Admin dashboard
├── context/            # React context
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom hooks
│   └── useAuth.ts      # Authentication hook
├── utils/              # Utility functions
│   └── api.ts          # API utilities
└── App.tsx             # Main app component
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - CSS framework
- **React Router DOM** - Routing
- **ESLint** - Code linting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20.19+ or 22.12+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chalet-booking-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it's a Vite project
4. Deploy!

### Manual Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔐 Demo Accounts

- **User**: user@example.com / password123
- **Employee**: employee@example.com / password123
- **Admin**: admin@example.com / password123

## 📱 Pages

- **Home** (`/`) - Landing page with hero section
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration
- **Chalets** (`/chalets`) - Browse available chalets
- **Chalet Details** (`/chalet/:id`) - Individual chalet information
- **Booking** (`/booking`) - Manage bookings
- **About** (`/about`) - About us page
- **Services** (`/services`) - Our services
- **Contact** (`/contact`) - Contact information
- **Employee Dashboard** (`/employee-dashboard`) - Employee panel
- **Admin Dashboard** (`/admin-dashboard`) - Admin panel

## 🎨 Styling

The project uses TailwindCSS for styling with:
- Responsive design
- Dark mode support
- Custom color palette
- Component-based styling

## 🔧 Configuration

- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Vite**: `vite.config.ts`
- **TailwindCSS**: `tailwind.config.js`
- **PostCSS**: `postcss.config.js`
- **ESLint**: `.eslintrc.cjs`

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@chaletbooking.com or create an issue in the repository.