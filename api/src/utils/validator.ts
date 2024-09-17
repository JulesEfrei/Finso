export function isEmail(email: string): boolean {
  const match = String(email).match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (match !== null && match.length > 0) {
    return true;
  }

  return false;
}

export function isNull(values: unknown[]): boolean {
  return values.some(
    (value) => value === null || value === undefined || value === ""
  );
}
