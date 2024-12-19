import HotspotMapComponent from "./ui/HotspotComponent";

const HotspotPage = () => {
    return (
    <>
    <section>
        <h1 className="text-4xl font-bold text-gray-800">Impact Zones & Disaster Hotspots</h1>
        <p className="text-lg text-gray-600 mt-2">
        Explore mapped areas based on disaster impact levels. View and understand the proximity of different zones and how they affect your region.
        </p>
        <HotspotMapComponent />
    </section>
    </>);
}

export default HotspotPage;