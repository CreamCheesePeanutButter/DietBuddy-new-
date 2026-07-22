import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} DietBuddy. All rights reserved.
      </footer>
    </div>
  );
}
