export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  export const calculateDistance = (coords1, coords2) => {
    const R = 6371; // Earth's radius in kilometers
  
    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2.latitude;
    const lon2 = coords2.longitude;
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance * 1000; // Convert to meters
  };
  
  export const calculateRadius = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
  
    const lat1Rad = (lat1 * Math.PI) / 180; // latitude 1 in radians
    const lat2Rad = (lat2 * Math.PI) / 180; // latitude 2 in radians
    const deltaLatRad = ((lat2 - lat1) * Math.PI) / 180; // change in latitude in radians
    const deltaLonRad = ((lon2 - lon1) * Math.PI) / 180; // change in longitude in radians
    const a =
      Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLonRad / 2) *
        Math.sin(deltaLonRad / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const d = R * c; // in metres
    const feet = d * 3.28084; // convert meters to feet
    return feet;
  };
  
  const toRad = angle => (angle * Math.PI) / 180;
  