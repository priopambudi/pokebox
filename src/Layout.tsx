import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="sticky top-0 w-full py-3 bg-background px-3 sm:px-0">
        <nav className="container px-4 py-3 mx-auto bg-white">Pokebox</nav>
      </header>

      <main className="container px-4 mx-auto">
        <Outlet />
      </main>

      <footer className="my-4 px-3 sm:px-3">
        <div className="container px-4 py-3 mx-auto bg-white">
          <p className="text-center text-xs">© 2024 Pokebox</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
