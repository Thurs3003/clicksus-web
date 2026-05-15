export function formatCPF(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);
  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatPhone(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export function formatCEP(value) {
  const somenteNumeros = value.replace(/[^0-9]/g, "").slice(0, 8);
  if (somenteNumeros.length <= 5) return somenteNumeros;
  return `${somenteNumeros.slice(0, 5)}-${somenteNumeros.slice(5)}`;
}
