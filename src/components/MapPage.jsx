import MapComponent from "./ui/MapComponent";

const MapPage = () => {
    return (
        <>
            <section className="p-8 bg-gray-100">
                <h1 className="text-4xl font-bold text-gray-800">People in Need of Assistance</h1>
                <p className="text-lg text-gray-600 mt-2">
                    Explore mapped areas where individuals in need are located, helping to identify high-priority regions impacted by disaster events. Gain insights into the proximity and severity of these areas, enabling better coordination and response efforts to support affected communities.
                </p>
                <MapComponent />
            </section>
        </>
    );
}

export default MapPage;
