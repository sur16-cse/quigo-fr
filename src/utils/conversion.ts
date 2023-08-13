
export const distanceToKm = (distance: number) => {
    if (distance < 1000) {
      return distance + " m";
    }
    const km = Math.floor(distance / 1000);
    const m = distance % 1000;
    return km + " km " + m + " m";
  };

 export  const durationToMinutes = (duration: number) => {
    const minute = Math.floor(duration / 60);
    if (minute < 60) {
      return minute + " mins";
    }
    const hour = Math.floor(minute / 60);
    const min = minute % 60;
    return hour + " hr " + min + " mins";
  };