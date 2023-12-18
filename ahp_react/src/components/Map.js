import { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import areas from '../components/Areas';

export default function Map({ zipCode }) {

    function ZipGeoJson({ zipCode }) {
        const map = useMap();
        const geoJSONRef = useRef();

        const feature = areas.features.find(feature => feature.properties.postalCode === zipCode);
        
        useEffect(() => {
            if (feature) {
                const featureBounds = geoJSONRef.current.getBounds();
                map.fitBounds(featureBounds);
            }
        }, [feature, map]);
        
        return (
            <GeoJSON ref={geoJSONRef} data={feature} />
        );
    }

    return (
        <div>
            <MapContainer
                style={{ height: 500 + "px" }}
                center={[40.75, -73.99]}
                zoom={13}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZipGeoJson zipCode={zipCode} />
            </MapContainer>
        </div>
    );
}
