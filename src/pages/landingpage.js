import HeroSection from './HeroSection';
import Services from './Services';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Footer from './Footer';
// import Pricing from './Pricing';

function LandingPage() {
	return (

		<div className=''>
			<HeroSection />
			<Services />
			{/* <Pricing />		 */}
			<AboutUs />
			<ContactUs />
			<Footer />
		</div>

	)
}
export default LandingPage