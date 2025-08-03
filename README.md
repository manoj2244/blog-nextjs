# 📝 Blog Platform – Frontend Developer Test

This is a fully functional blog platform built as part of a frontend developer test using **Next.js**, with features including user authentication, post management (CRUD), protected routing, custom hooks, state management, pagination, and more.

---

## 🚀 Tech Stack

- **Framework:** [Next.js]
- **State Management:** [Zustand]
- **Auth:** JWT-based authentication (stored in `localStorage`)
- **Styling:** [Tailwind CSS]
- **Routing:** Next.js App Router
- **API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (mock API)
- **Package Manager:** Yarn

---

## ✅ Features

### 1. 🔐 Authentication
- Login and registration pages.
- JWT token stored securely in `localStorage`.
- Custom `useAuth` hook to:
  - Manage login, logout, and user state.
  - Redirect unauthorized users from protected routes.

### 2. 📝 Blog Post Management (CRUD)
- Dashboard displays paginated list of posts.
- Create, Edit, and Delete blog posts.
- Custom `usePosts` hook handles:
  - Fetching posts from API.
  - Add, Update, Delete operations.
- Real-time UI updates after any CRUD action.

### 3. 🔒 Protected Routes
- `dashboard`, `create`, and `edit` pages are accessible only after login.
- Unauthorized users are redirected to login page.
- Implemented using `useAuth` and protected route logic.

---

## 🌟 Bonus Features

- ✅ **Form Validation** (Custom with live validation feedback)
- ✅ **Pagination** (Always maintains 10 posts per page, even after deletion)
- ✅ **Persistent Auth** using `localStorage`
- ✅ **Responsive Design** with modern UI and UX practices
- ✅ **Clean Code Structure** with reusable components and hooks

---

---

## 🧪 How to Run Locally

```bash
# Clone the repo
git clone https://github.com/manoj2244/blog-nextjs.git
cd blog-nextjs

# Install dependencies
yarn

# Run the app
yarn dev


