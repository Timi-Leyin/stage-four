export default (amount: number | string) => {
    const value = String(amount);
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  