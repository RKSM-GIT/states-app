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
    const [error, setError] = useState({ countries: null, states: null, cities: null });

    // Fetch countries on mount
    useEffect(() => {
        setLoading((l) => ({ ...l, countries: true }));
        setError((e) => ({ ...e, countries: null }));
        fetch(`${BASE_URL}/countries`)
            .then((r) => {
                if (!r.ok) {
                    throw new Error(`HTTP error! status: ${r.status}`);
                }
                return r.json();
            })
            .then(setCountries)
            .catch((err) => {
                console.error("Failed to fetch countries:", err);
                setError((e) => ({ ...e, countries: err.message }));
                setCountries([]);
            })
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
        setError((e) => ({ ...e, states: null }));
        fetch(`${BASE_URL}/country=${selectedCountry}/states`)
            .then((r) => {
                if (!r.ok) {
                    throw new Error(`HTTP error! status: ${r.status}`);
                }
                return r.json();
            })
            .then(setStates)
            .catch((err) => {
                console.error("Failed to fetch states:", err);
                setError((e) => ({ ...e, states: err.message }));
                setStates([]);
            })
            .finally(() => setLoading((l) => ({ ...l, states: false })));
    }, [selectedCountry]);

    // Fetch cities when state changes
    useEffect(() => {
        if (!selectedCountry || !selectedState) return;
        setCities([]);
        setSelectedCity("");
        setLoading((l) => ({ ...l, cities: true }));
        setError((e) => ({ ...e, cities: null }));
        fetch(`${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`)
            .then((r) => {
                if (!r.ok) {
                    throw new Error(`HTTP error! status: ${r.status}`);
                }
                return r.json();
            })
            .then(setCities)
            .catch((err) => {
                console.error("Failed to fetch cities:", err);
                setError((e) => ({ ...e, cities: err.message }));
                setCities([]);
            })
            .finally(() => setLoading((l) => ({ ...l, cities: false })));
    }, [selectedState]);

    return {
        countries, states, cities,
        selectedCountry, selectedState, selectedCity,
        setSelectedCountry, setSelectedState, setSelectedCity,
        loading,
        error,
    };
}