import StravaPoweredByImage from './../assets/api_logo_pwrdBy_strava_horiz_orange.png';

const Footer = () => {
    return (
        <footer className="py-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between">
                    <div className="text-sm text-left">
                        &copy; {new Date().getFullYear()} Athlete Rundown
                    </div>
                    <div className="text-sm flex items-center justify-end mt-2 md:mt-0">
                        <img
                            src={StravaPoweredByImage}
                            alt="Powered by Strava"
                            className="inline-block h-6"
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;