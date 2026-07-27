const clientLoginUrl = import.meta.env.VITE_CLIENT_LOGIN_URL?.trim() ?? "";

if (import.meta.env.DEV && !clientLoginUrl) {
  console.warn(
    "VITE_CLIENT_LOGIN_URL is not configured. The client login link is disabled.",
  );
}

export const siteConfig = {
  brandName: "SuperChat Marketing",
  founderName: "颜皓乐",
  location: "Malaysia",
  domain: "https://superchatmarketing.com",
  clientLoginUrl,
  whatsappNumber: "601161207960",
  whatsappDisplayNumber: "+60 11-6120 7960",
  whatsappPrefilledMessage: "你好，我想预约 SuperChat WhatsApp AI 系统 Demo。",
  businessEmail: "",
  facebookUrl: "",
  instagramUrl: "",
  tiktokUrl: "",
};
