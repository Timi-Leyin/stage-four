export const formatCardNumber = (number: string) => {
  return number
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})/g, "$1 ")
    .trim();
};

export const formatExpiryDate = (date: string) => {
  const cleaned = date.replace(/\D/g, "").slice(0, 4);
  const month = cleaned.slice(0, 2);
  const year = cleaned.slice(2, 4);
  return `${month}/${year}`;
};



export const formatCVV = (cvv:string) => {
    return cvv.replace(/\D/g, '').slice(0, 3);
  };