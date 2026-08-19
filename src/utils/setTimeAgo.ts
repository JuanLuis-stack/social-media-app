function setTimeAgo(createdAt: string) {
  const now = new Date();
  const createAtString = new Date(createdAt);
  const difference: number = now.getTime() - createAtString.getTime();

  const secconds = difference / 1000;
  const minutes = secconds / 60;
  const houers = minutes / 60;
  const days = houers / 24;

  if (Math.floor(days) > 7) {
    const formato = createAtString.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formato;
  }
  if (Math.floor(days) > 0) return `${Math.floor(days)} d`;
  if (Math.floor(houers) > 0) return `${Math.floor(houers)} hr`;
  if (Math.floor(minutes) > 0) return `${Math.floor(minutes)} min`;
}

export default setTimeAgo;
