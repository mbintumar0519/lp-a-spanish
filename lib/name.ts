const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

export function capitalizeFullName(fullName: string): string {
  return fullName.trim().split(/\s+/).filter(Boolean).map(capitalize).join(" ");
}

export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const [firstName = "", ...rest] = capitalizeFullName(fullName).split(" ");
  return { firstName, lastName: rest.join(" ") };
}
