import { useState, useEffect } from "react";

const BASE_URL = "https://location-selector.labs.crio.do";

export function useLocationData() {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const [loading, setLoading] = useState({ countries: false, states: false, cities: false });

    // Fetch countries on mount
    useEffect(() => {
        setLoading((l) => ({ ...l, countries: true }));
        fetch(`${BASE_URL}/countries`)
            .then((r) => r.json())
            .then(setCountries)
            .finally(() => setLoading((l) => ({ ...l, countries: false })));
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        if (!selectedCountry) return;
        setStates([]);
        setCities([]);
        setSelectedState("");
        setSelectedCity("");
        setLoading((l) => ({ ...l, states: true }));
        fetch(`${BASE_URL}/country=${selectedCountry}/states`)
            .then((r) => r.json())
            .then(setStates)
            .finally(() => setLoading((l) => ({ ...l, states: false })));
    }, [selectedCountry]);

    // Fetch cities when state changes
    useEffect(() => {
        if (!selectedCountry || !selectedState) return;
        setCities([]);
        setSelectedCity("");
        setLoading((l) => ({ ...l, cities: true }));
        fetch(`${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`)
            .then((r) => r.json())
            .then(setCities)
            .finally(() => setLoading((l) => ({ ...l, cities: false })));
    }, [selectedState]);

    return {
        countries, states, cities,
        selectedCountry, selectedState, selectedCity,
        setSelectedCountry, setSelectedState, setSelectedCity,
        loading,
    };
}