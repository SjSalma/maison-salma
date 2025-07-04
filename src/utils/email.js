import emailjs from '@emailjs/browser';

export const sendConfirmationEmail = (formData) => {
  return emailjs.send(
    'service_o3bjekr',     // remplace avec le tien
    'template_2thudw1',    // remplace avec le tien
    formData,
    '4DjrlHmDw16mbhMiT'      // remplace avec le tien
  );
};
