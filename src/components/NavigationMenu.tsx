import { Link } from "react-router";

const NavigationMenu = () => {
    return (
        <nav className="p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link className="text-[#646cff]" to="/">Home</Link>
                </li>
                {/* <li>
                    <Link className="text-[#646cff]" to="/athletes">Athletes</Link>
                </li> */}
                {/* <li>
                    <Link className="text-[#646cff]" to="/activities">Activities</Link>

                </li> */}
                <li>
                    <Link className="text-[#646cff]" to="/stats">Stats</Link>
                </li>

            </ul>
        </nav>
    );
}
export default NavigationMenu;