import z from "zod";

export const registerAccountantSchema = z
  .object({
    email: z.email("Niepoprawny adres e-mail"),
    firstname: z
      .string()
      .min(3, "Imię jest za krótkie")
      .max(60, "Imię jest az długie"),
    lastname: z
      .string()
      .min(3, "Nazwisko jest za krótkie")
      .max(60, "Nazwisko jest za długie"),
    password: z
      .string()
      .min(8, "Hasło jest za słabe")
      .max(56, "Hasło jest za długie"),
    repeatPassword: z.string(),
    privacyPolicy: z.boolean("Proszę zaakceptować politykę prywatności "),
    nip: z
      .string()
      .startsWith("16", "NIP powinien zaczynać się od 16")
      .max(12, "Numer NIP jest za długi"),
    companyAddress: z.string().optional(),
    accountantBureau: z
      .string()
      .min(3, "Nazwa BR jest zbyt krótka")
      .max(120, "Nazwa BR jest zbyt długa"),
    certificationNumber: z
      .string()
      .min(5, "Numer certyfikatu jest za krótki")
      .max(20, "Numer certyfikatu jest za długi")
      .regex(
        /^[A-Za-z0-9\/\-]{5,20}$/,
        "Niepoprawny format numeru certyfikatu",
      ),

    officeAddress: z
      .string()
      .min(3, "Adres biura jest za krótki")
      .max(50, "Adres biura jest za długi"),
    phoneNumber: z
      .string()
      .regex(
        /^(\+48|0048)? ?\d{3} ?\d{3} ?\d{3}$/,
        "Numer telefonu jest niepoprawny",
      )
      .optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
  });
export const registerClientSchema = z
  .object({
    email: z.email("Niepoprawny adres e-mail"),
    firstname: z
      .string()
      .min(3, "Imię jest za krótkie")
      .max(60, "Imię jest az długie"),
    lastname: z
      .string()
      .min(3, "Nazwisko jest za krótkie")
      .max(60, "Nazwisko jest za długie"),
    password: z
      .string()
      .min(8, "Hasło jest za słabe")
      .max(56, "Hasło jest za długie"),
    repeatPassword: z.string(),
    privacyPolicy: z.boolean("Proszę zaakceptować politykę prywatności "),
    nip: z
      .string()
      .startsWith("16", "NIP powinien zaczynać się od 16")
      .max(12, "Numer NIP jest za długi"),
    companyAddress: z.string().optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
  });
export const loginSchema = z.object({
  email: z.email("Niepoprawny adres e-mail"),
  password: z.string(),
  rememberMe: z.boolean().optional().default(false),
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

export type ClientFormDataT = z.infer<typeof clientSchema>;
export type AccountantFormDataT = z.infer<typeof registerAccountantSchema>;
