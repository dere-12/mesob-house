const DEMO_LOCATIONS = {
  Bole: {
    deliveryPosition: [8.995, 38.7896],
    courierPosition: [8.998, 38.7858],
  },
  Kazanchis: {
    deliveryPosition: [9.0148, 38.766],
    courierPosition: [9.018, 38.7634],
  },
  Piassa: {
    deliveryPosition: [9.035, 38.7525],
    courierPosition: [9.0323, 38.7561],
  },
  Mexico: {
    deliveryPosition: [9.0108, 38.7414],
    courierPosition: [9.0139, 38.7447],
  },
};

export function getDemoLocations(neighbourhood) {
  const isKnownNeighbourhood = Object.hasOwn(DEMO_LOCATIONS, neighbourhood);

  const configuredLocation = isKnownNeighbourhood
    ? DEMO_LOCATIONS[neighbourhood]
    : null;

  const isConfigured = Boolean(configuredLocation);
  const positions = configuredLocation ?? DEMO_LOCATIONS.Bole;

  return {
    ...positions,
    isConfigured,

    courierDescription: isConfigured
      ? `Demo courier position near ${neighbourhood}; this is not live GPS data.`
      : `Example courier position near Bole; no demo coordinates are configured for ${neighbourhood || "this neighbourhood"}.`,

    deliveryDescription: isConfigured
      ? `Approximate centre of the ${neighbourhood} area; this is a demo position, not a street address.`
      : `Example delivery position near Bole; the order has no mapped coordinates for ${neighbourhood || "this neighbourhood"}.`,
  };
}
