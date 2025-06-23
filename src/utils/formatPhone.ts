export const formatPhone = (phone: string) => {
  const parts = phone.match(/^(\d{3})(\d{3})(\d{4})$/);
  return parts ? `(${parts[1]}) ${parts[2]} ${parts[3]}` : phone;
};
