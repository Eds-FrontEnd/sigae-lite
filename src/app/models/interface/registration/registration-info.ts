export interface RegistrationData {
  id: string;                    // ID único para o registro
  fullName: string;              // Nome completo
  socialName: string;            // Nome social
  cpf: string;                   // CPF
  cnpj: string;                  // CNPJ
  school: string;                // Nome da escola
  contactEmail: string;          // E-mail de contato
  contactPhones: string[];       // Lista de telefones de contato
  address: string;               // Endereço
  city: string;                  // Cidade
  cep: string;                   // CEP
  state: string;                 // Estado
  country: string;               // País
  completed: boolean;            // Flag para indicar se o registro está completo
}
