import Header from "../componnent/Header";


export default function AllsiteLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="pt-[75px] bg-gray-100">
                {children}
            </div>
        </div>
    );
}
