import { Link } from "react-router";

const NavigationMenu = () => {
    return (
        <nav className="p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link className="text-[#5c64f7]" to="/">Home</Link>
                </li>
                {/* <li>
                    <Link className="text-[#5c64f7]" to="/athletes">Athletes</Link>
                </li> */}
                {/* <li>
                    <Link className="text-[#5c64f7]" to="/activities">Activities</Link>

                </li> */}
                <li>
                    <Link className="text-[#5c64f7]" to="/stats">Stats</Link>
                </li>
                <li>
                    <Link className="text-[#5c64f7]" to="/activities">Activities</Link>
                </li>

            </ul>
        </nav>
    );
}
export default NavigationMenu;