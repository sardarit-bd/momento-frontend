import Header from "../componnent/Header";

export default function AllsiteLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="pt-18.75 bg-gray-100">{children}</div>
    </div>
  );
}
