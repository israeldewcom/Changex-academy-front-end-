
```markdown
# Change X Academy - Complete Production-Ready Platform

## 🚀 Overview

Change X Academy is Nigeria's #1 Learn-to-Earn platform where students can master tech skills, practice in a live sandbox, and earn real money through an affiliate ecosystem.

## 📋 Features

### ✅ Authentication System
- Email/Password login with "Remember me"
- Social login (Google, GitHub, LinkedIn)
- Two-Factor Authentication (TOTP)
- Email verification
- Password reset flow
- Session management
- Rate limiting

### ✅ User Profiles
- Public profile pages
- Private settings (profile, security, privacy, notifications)
- Avatar upload with cropping
- Skill verification badges
- Learning interests

### ✅ Courses & Learning
- Advanced course catalog with filters
- Course detail with curriculum, instructor info, reviews
- Lesson player with video streaming, progress saving
- Notes with rich text
- Q&A with votes
- Course completion certificates (PDF with QR)
- Prerequisite system
- Wishlist

### ✅ Practice Engine
- Monaco Editor (VS Code) integration
- Syntax highlighting for 20+ languages
- Auto-completion, IntelliSense
- Code execution sandbox
- Challenge system with test cases
- XP rewards
- Daily coding streak

### ✅ Earning System
- Affiliate dashboard with referral links
- Multi-tier commissions (20%, 5%, 2%, 1%)
- Learn-to-earn rewards
- Withdrawal requests (Paystack, Flutterwave)
- Payment history with invoices
- Bonus system

### ✅ Marketplace
- Digital products with shopping cart
- Job board with applications
- Freelance services with booking
- Seller dashboard

### ✅ Community & Social
- Feed posts with hashtags and mentions
- Comments with nested replies
- Direct messaging (real-time)
- Groups with roles
- Moderation tools

### ✅ AI Tutor
- GPT-4/Claude integration
- Conversation history
- Context awareness (knows user's progress)
- Code debugging
- Voice input
- Personalized learning paths

### ✅ Gamification
- XP system with level ups
- 30+ badges
- Leaderboards (global, weekly, monthly)
- Streak system with freezes

### ✅ Admin Panel
- Real-time dashboard
- User management
- Course management
- Financial oversight
- Content moderation
- System settings

### ✅ Performance Optimizations
- Code splitting
- Image lazy loading
- Virtual scrolling
- Service worker with offline support
- Prefetching
- Debounced inputs
- Web Workers

### ✅ UI/UX & Mobile
- Mobile-first responsive design
- Touch-optimized
- Bottom sheet modals
- Swipe gestures
- Pull-to-refresh
- Skeleton loaders
- Micro-interactions
- Dark/Light theme
- Accessibility (WCAG 2.1 AA)
- PWA installable

## 🛠️ Tech Stack

- **Framework:** React 18
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **UI Library:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Code Editor:** Monaco Editor
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios
- **Real-time:** Socket.io-client
- **PWA:** Vite PWA plugin
- **Testing:** Vitest, React Testing Library, Cypress
- **Build Tool:** Vite

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/changexacademy/changex-frontend.git
cd changex-frontend
```

1. Install dependencies:

```bash
npm install
```

1. Copy environment variables:

```bash
cp .env.example .env
```

1. Update .env with your API keys and configuration.
2. Start development server:

```bash
npm run dev
```

1. Build for production:

```bash
npm run build
```

🔌 Backend API Contract

Authentication Endpoints

Method Endpoint Description
POST /auth/register Register new user
POST /auth/login Login user
POST /auth/logout Logout user
POST /auth/refresh Refresh JWT token
POST /auth/forgot-password Request password reset
POST /auth/reset-password Reset password
POST /auth/verify-email Verify email
POST /auth/2fa/setup Setup 2FA
POST /auth/2fa/verify Verify 2FA token

Courses Endpoints

Method Endpoint Description
GET /courses List courses with filters
GET /courses/:id Get course details
POST /courses/:id/enroll Enroll in course
GET /courses/:id/progress Get user progress
POST /courses/:id/lessons/:lessonId/complete Mark lesson complete
POST /courses/:id/reviews Submit review

Practice Endpoints

Method Endpoint Description
GET /practice/challenges List challenges
POST /practice/execute Execute code
POST /practice/challenges/:id/submit Submit solution
GET /practice/streak Get streak info

Earn Endpoints

Method Endpoint Description
GET /earn/affiliate/stats Get affiliate stats
GET /earn/earnings Get earnings history
POST /earn/withdrawals Request withdrawal
GET /earn/bank-accounts Get linked banks

🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Run tests with UI
npm run test:ui
```

📱 PWA Installation

The app is a Progressive Web App and can be installed on:

· Android: Chrome → "Add to Home Screen"
· iOS: Safari → "Share" → "Add to Home Screen"
· Desktop: Chrome → Install icon in address bar

🔒 Security

· JWT tokens with refresh mechanism
· HTTPS enforced
· XSS protection
· CSRF protection
· Rate limiting
· Input validation
· SQL injection prevention (backend)

🌐 Deployment

Vercel

```bash
npm run build
vercel --prod
```

Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

Docker

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

📄 License

MIT License - see LICENSE file for details

👥 Contributors

· Change X Academy Team

🆘 Support

· Email: support@changexacademy.ng
· Twitter: @ChangeXAcademy
· Discord: https://discord.gg/changexacademy

```

### 20. GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run tests
        run: npm run test
        env:
          CI: true
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    needs: lint-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```
