import NavigationMenu from "./NavigationMenu";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <div>
        <NavigationMenu />
        <main>{children}</main>
        <Footer />
    </div>
);

export default Layout;