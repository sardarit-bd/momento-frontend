import FixedcartToolbar from "../../componnent/FixedCartToolbar";
import Footer from "../../componnent/Footer";



const siteLayout = ({ children }) => {



    return (
        <div>
            <FixedcartToolbar />
            {children}
            <Footer />
        </div>
    )
}

export default siteLayout;