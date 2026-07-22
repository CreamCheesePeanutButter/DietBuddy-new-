export default function NavBar() {
  return (
    // align the nav bar items to the right
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-3xl font-bold">DietBuddy</div>
      <div className="alignspace-x-4 top-1.5">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/signup" className="hover:underline">
          Sign Up
        </a>
        <a href="/signin" className="hover:underline">
          Sign In
        </a>
      </div>
    </nav>
  );
}
