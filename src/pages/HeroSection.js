import HeroPic from '../assets/Free-web-apps-scaled.jpg'
function HeroSection() {
    return (
        <section
            className="py-5 text-center text-white" id="hero-section"
            style={{
                backgroundImage: `url(${HeroPic})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "70vh",
                width: "100%",
                margin: 0,
                padding: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backgroundBlendMode: "overlay"
            }}>
            <div className="container py-5">
                <h2>Manage Your Business with Ease</h2>
                <p>A powerful management tool for businesses of all sizes.</p>
            </div>
        </section>
    );
}

export default HeroSection;