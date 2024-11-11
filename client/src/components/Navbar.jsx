import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Dealsdray logo" className="h-10 inline" src="https://www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png"></img>
        </NavLink>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/create">
          {localStorage.getItem('dealsdray_employee_username') ?? 'User'}
        </NavLink>
      </nav>
    </div>
  );
}
