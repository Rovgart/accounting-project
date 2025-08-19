import z from "zod";

export const loginSchema = z.object({
  email: z.email("Niepoprawny adres e-mail"),
  password: z
    .string()
    .min(8, "Hasło jest za krótkie")
    .max(56, "Hasło jest za długie"),
  rememberMe: z.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    email: z.email("Niepoprawny adres e-mail"),
    password: z
      .string()
      .min(8, "Hasło jest za słabe")
      .max(56, "Hasło jest za długie"),
    repeatPassword: z.string(),
    nip: z
      .string()
      .startsWith("16", "NIP powinien zaczynać się od 16")
      .max(12, "Numer NIP jest za długi"),
    companyAddress: z
      .string()
      .min(3, "Adres firmy jest za krótki")
      .max(56, "Adres firmy jest za długi"),
    privacyPolicy: z.boolean("Proszę zaakceptować politykę prywatności "),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
  });

export const addInvoiceSchema = z
  .object({
    invoiceNumber: z
      .string()
      .regex(/^INV-\d{4}$/, "Numer faktury musi mieć format INV-xxxx"),
    createdDate: z.string(),
    sellingDate: z.string(),
    sellingPlace: z.string().optional(),
  })
  .refine(
    (data) => data.createdDate >= data.sellingDate,
    "Data wystawienia musi być wcześniejsza niż data sprzedania",
  );
export const changePasswordSchema = z
  .object({
    changePassword: z.string().min(8, "Hasło jest za krótkie"),
    repeatChangePassword: z.string(),
  })
  .refine(
    (data) => data.changePassword === data.repeatChangePassword,
    "Hasła nie pasują do siebie",
  );
