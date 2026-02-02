# Documentação Técnica - Observatório de Dados Empresarial

## 1. Visão Geral

O **Observatório de Dados Empresarial** é uma plataforma analítica estratégica de inteligência de negócios e governança pública. Seu objetivo principal é processar, estruturar e visualizar grandes volumes de dados do registro mercantil (abertura, alteração e baixa de empresas), oferecendo *insights* acionáveis para empresários, gestores públicos e o SEBRAE.

**Versão do Produto:** 2.0 (Revisada com IA Soberania)
**Data:** Janeiro/2026
**Responsável Técnico:** Logge Tecnologia

---

## 2. Arquitetura do Sistema

O sistema segue uma arquitetura moderna de Aplicação de Página Única (SPA) integrada a serviços em nuvem.

### Frontend

- **Framework:** React 18+
- **Build Tool:** Vite (para alta performance em desenvolvimento e build)
- **Linguagem:** TypeScript (para tipagem estática e segurança de código)
- **Estilização:** Tailwind CSS (utility-first) + Shadcn/UI (componentes acessíveis)
- **Gerenciamento de Estado:** TanStack Query (React Query) para server state. e Context API para estados globais de autenticação.
- **Mapas:** Leaflet / React-Leaflet para visualizações geográficas.
- **Gráficos:** Recharts para dashboards analíticos.

### Backend & Dados

- **Plataforma:** Supabase (Backend-as-a-Service)
- **Banco de Dados:** PostgreSQL (gerenciado pelo Supabase)
- **Autenticação:** Supabase Auth
- **API:** RESTful (via Postgrest do Supabase)

---

## 3. Tecnologias Principais

| Categoria | Tecnologia | Versão (aprox.) | Propósito |
|-----------|------------|-----------------|-----------|
| **Core** | React | 18.x | Biblioteca de UI |
| **Linguagem** | TypeScript | 5.x | Desenvolvimento Tipado |
| **Build** | Vite | 5.x | Bundler e Dev Server |
| **Estilos** | Tailwind CSS | 3.x | Framework de CSS |
| **UI Components** | Shadcn/UI | - | Componentes Base |
| **Mapas** | Leaflet | 1.9.x | Mapas Interativos |
| **Rotas** | React Router | 6.x | Navegação SPA |
| **Validação** | Zod | 3.x | Schemas e Validação |
| **Forms** | React Hook Form | 7.x | Gerenciamento de Formulários |

---

## 4. Instalação e Execução

### Pré-requisitos

- **Node.js:** Versão 18 ou superior.
- **NPM:** Gerenciador de pacotes padrão.

### Passos para Instalação

1. **Clonar o Repositório**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd observatorio-jucepi-sebrae
    ```

2. **Instalar Dependências**
    Devido a conflitos de "peer dependencies" (especificamente entre versões do React e React Leaflet), utilize a flag legacy:

    ```bash
    npm install --legacy-peer-deps
    ```

3. **Configurar Variáveis de Ambiente**
    Crie um arquivo `.env` na raiz do projeto (se não existir) com as credenciais do Supabase:

    ```env
    VITE_SUPABASE_URL=sua_url_supabase
    VITE_SUPABASE_ANON_KEY=sua_chave_anonima
    ```

4. **Executar Servidor de Desenvolvimento**

    ```bash
    npm run dev
    ```

    O projeto estará acessível em `http://localhost:5173`.

---

## 5. Estrutura do Projeto

A estrutura de pastas segue os padrões do Vite + React:

```
observatorio-jucepi-sebrae/
├── documentacao/        # Documentação técnica do projeto
├── prd/                 # Documentos de Requisitos (PRD)
├── public/              # Arquivos estáticos públicos
├── src/                 # Código fonte da aplicação
│   ├── components/      # Componentes React reutilizáveis
│   │   ├── layout/      # Componentes estruturais (Sidebar, Header)
│   │   ├── ui/          # Componentes base (Shadcn/UI buttons, inputs)
│   │   └── map/         # Componentes específicos de mapas
│   ├── contexts/        # Contextos React (AuthContext, etc.)
│   ├── data/            # Dados estáticos/mockados (ex: geodados PI)
│   ├── hooks/           # Custom Hooks
│   ├── lib/             # Utilitários e configurações (ex: supabase client)
│   ├── pages/           # Componentes de Página (Rotas)
│   ├── types/           # Definições de Tipos TypeScript
│   ├── App.tsx          # Componente Raiz e Definição de Rotas
│   └── main.tsx         # Ponto de entrada da aplicação
├── supabase/            # Configurações e Migrations do Supabase
└── package.json         # Dependências e Scripts
```

---

## 6. Funcionalidades Principais

Conforme definido no PRD e implementado:

1. **Autenticação e Controle de Acesso (RBAC)**
    - Login e Registro.
    - Rotas protegidas por perfil (Admin, Analista, Técnico, Gestor).

2. **Dashboards**
    - **Dashboard Executivo:** Visão geral de aberturas, baixas e saldo.
    - **Análises:** Detalhamento por evento e setor.

3. **Mapa Interativo (Georreferenciamento)**
    - Visualização de empresas no mapa do Piauí.
    - Heatmaps econômicos e clusters de densidade empresarial.
    - Filtros territoriais.

4. **Relatórios e Indicadores**
    - Geração de listagens e exportação de dados.
    - Indicadores de performance setorial (CNAE).

5. **Assistente de Inteligência Artificial (Chat)**
    - **Interface Interativa:** Modal de chat flutuante acessível via Dashboard.
    - **Features:**
        - Histórico de conversa em tempo real (sessão local).
        - Respostas simuladas para demonstração de interatividade.
        - Chips de sugestão contextual ("Criar apresentação", "Mapa mental", etc.).
        - Design "Clean & Colorful" com animações suaves e componentes visuais ricos.
    - **Tecnologia:** React State Management, Framer Motion para animações.

---

## 7. Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run lint`: Executa a verificação de código (ESLint).
- `npm run preview`: Visualiza o build de produção localmente.

---

## 8. Manutenção e Evolução

Para contribuir com o projeto:

1. Siga o padrão de componentes em `src/components`.
2. Utilize o hook `useToast` ou `sonner` para feedback ao usuário.
3. Mantenha a tipagem estrita no TypeScript.

---

## 9. Credenciais de Teste

Ambiente de desenvolvimento configurado com os seguintes usuários para validação de perfis:

### Credenciais de Acesso

| Perfil            | E-mail               | Senha          | Descrição                          |
| ----------------- | -------------------- | -------------- | ---------------------------------- |
| **Administrador** | `admin@teste.com`    | `Admin123!`    | Acesso total ao sistema            |
| **Gestor Público**| `gestor@teste.com`   | `Gestor123!`   | Acesso gerencial e auditoria       |
| **Técnico SEBRAE**| `tecnico@teste.com`  | `Tecnico123!`  | Acesso operacional estratégico     |
| **Analista**      | `analista@teste.com` | `Analista123!` | Visualização e exportação de dados |
| **Público**       | `publico@teste.com`  | `Publico123!`  | Acesso limitado a dados públicos   |

### Matriz de Permissões

| Funcionalidade            | Admin | Gestor | Técnico | Analista | Público |
| ------------------------- | :---: | :----: | :-----: | :------: | :-----: |
| **Visualizar Dashboard**  |   ✅   |   ✅    |    ✅    |    ✅     |    ✅    |
| **Dashboard Executivo**   |   ✅   |   ✅    |    ✅    |    ✅     |    ❌    |
| **Consultar Empresas**    |   ✅   |   ✅    |    ✅    |    ✅     |    ❌    |
| **Mapa Interativo**       |   ✅   |   ✅    |    ✅    |    ✅     |    ✅    |
| **Gerar Relatórios**      |   ✅   |   ✅    |    ✅    |    ✅     |    ❌    |
| **Agendar Relatórios**    |   ✅   |   ✅    |    ✅    |    ❌     |    ❌    |
| **Exportar Dados**        |   ✅   |   ✅    |    ✅    |    ✅     |    ❌    |
| **Gerenciar Usuários**    |   ✅   |   ❌    |    ❌    |    ❌     |    ❌    |
| **Alterar Permissões**    |   ✅   |   ❌    |    ❌    |    ❌     |    ❌    |
| **Ver Logs de Auditoria** |   ✅   |   ✅    |    ❌    |    ❌     |    ❌    |
| **Configurações**         |   ✅   |   ❌    |    ❌    |    ❌     |    ❌    |
