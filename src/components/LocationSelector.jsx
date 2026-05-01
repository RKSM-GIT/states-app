import { useLocationData } from "../hooks/useLocationData";
import "./LocationSelector.css";

export default function LocationSelector() {
    const {
        countries, states, cities,
        selectedCountry, selectedState, selectedCity,
        setSelectedCountry, setSelectedState, setSelectedCity,
        loading,
    } = useLocationData();

    return (
        <div className="location-wrapper">
            <h1>Select Location</h1>

            <div className="dropdowns">
                {/* Country */}
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    disabled={loading.countries}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>

                {/* State */}
                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!selectedCountry || loading.states}
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>

                {/* City */}
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState || loading.cities}
                >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCity && (
                <p className="result">
                    You selected {selectedCity}, {selectedState}, {selectedCountry}
                </p>
            )}
        </div>
    );
}