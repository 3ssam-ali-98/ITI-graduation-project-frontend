import ServiceCard from '../components/ServiceCard'

function Services() {
    return (
        <section className="py-5" style={{ backgroundColor: "#EEF7FF" }} id="services">
            <div className="container">
                <h2 className="text-center" style={{ color: "#4D869C" }}>Our Services</h2>
                <div className="row mt-4">
                    <ServiceCard
                        title="Task Management"
                        description="Streamline your tasks and stay organized."
                    />
                    <ServiceCard
                        title="Analytics & Reporting"
                        description="Get detailed insights to make informed decisions."
                    />
                    <ServiceCard
                        title="Team Collaboration"
                        description="Enhance teamwork with seamless collaboration tools."
                    />
                </div>
            </div>
        </section>
    );
}

export default Services;