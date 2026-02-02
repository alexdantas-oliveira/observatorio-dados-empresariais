# Product Requirements Document -- PRD

## Observatório de Dados Empresarial

**Produto:** Dashboard -- Observatório de Dados Empresarial\
**Versão:** 2.0 (Revisada com IA Soberania)\
**Data:** Janeiro/2026\
**Órgãos Envolvidos:** JUCEPI / SEBRAE-PI / Governo do Estado do Piauí\
**Execução Técnica:** Logge Tecnologia\
**Classificação:** Plataforma Analítica Estratégica (BI + IA
Governamental)

------------------------------------------------------------------------

## 1. Visão Geral do Produto

O Dashboard do Observatório de Dados Empresarial é uma plataforma
analítica estratégica destinada à transformação de grandes volumes de
dados operacionais do registro mercantil (abertura, alteração e baixa de
empresas) em informação estruturada, interpretável e acionável, apoiando
a tomada de decisão:

- Empresarial\
- Governamental\
- Institucional (SEBRAE)\
- Estratégica (políticas públicas)

O sistema atua como camada de inteligência, sobrepondo-se aos sistemas
transacionais da REDESIM, sem substituí-los.

------------------------------------------------------------------------

## 2. Problema que o Produto Resolve

- Dados empresariais dispersos e pouco explorados\
- Baixa capacidade analítica integrada entre JUCEPI e SEBRAE\
- Tomada de decisão baseada em percepções e não em evidências\
- Ausência de inteligência preditiva e prospectiva\
- Dependência excessiva de análises manuais

------------------------------------------------------------------------

## 3. Objetivos do Produto

### 3.1 Objetivo Geral

Disponibilizar um sistema oficial de inteligência empresarial, baseado
em dados confiáveis, integrado à REDESIM e potencializado pela IA
Soberania, para subsidiar decisões estratégicas e políticas públicas.

### 3.2 Objetivos Específicos

- Consolidar dados empresariais em indicadores estratégicos\
- Permitir análises temporal, territorial e setorial\
- Apoiar ações do SEBRAE baseadas em evidências\
- Antecipar tendências e riscos econômicos\
- Garantir soberania, segurança e conformidade legal

------------------------------------------------------------------------

## 4. Público-Alvo (Stakeholders)

  Perfil               Uso do Sistema
  -------------------- --------------------------
  Empresários          Inteligência de mercado
  Gestores Públicos    Planejamento e políticas
  Técnicos do SEBRAE   Ações de fomento
  Diretoria JUCEPI     Governança institucional
  Analistas            Exploração avançada
  Sociedade            Transparência econômica

------------------------------------------------------------------------

## 5. Escopo do Produto

### 5.1 Incluído no Escopo

- Dashboards interativos\
- Indicadores empresariais estratégicos\
- Relatórios analíticos\
- Inteligência artificial explicativa, preditiva e recomendativa\
- Governança e segurança de dados

### 5.2 Fora do Escopo

- Operações de registro mercantil\
- Alteração direta de dados da REDESIM\
- Processos cartorários ou jurídicos

------------------------------------------------------------------------

## 6. Funcionalidades (Requisitos Funcionais)

### 6.1 Dashboard Executivo

- Total de empresas ativas\
- Aberturas, baixas e saldo líquido\
- Evolução temporal\
- Comparativos interanuais

### 6.2 Análise por Evento Empresarial

- Aberturas\
- Alterações\
- Baixas\
- Reativações (quando aplicável)

**Filtros:**\

- Período\
- Município\
- CNAE\
- Porte\
- Natureza jurídica

### 6.3 Análise Setorial (CNAE)

- Ranking de setores\
- Crescimento e retração\
- Tendências setoriais\
- Correlação setor × território

### 6.4 Análise Territorial

- Mapa interativo estadual\
- Heatmaps econômicos\
- Indicadores por município\
- Comparativos regionais

### 6.5 Perfil Empresarial

- Porte da empresa\
- Natureza jurídica\
- Tempo médio de vida\
- Taxa de mortalidade empresarial

### 6.6 Relatórios Analíticos

- Relatórios automáticos\
- Exportação PDF / Excel\
- Relatórios temáticos\
- Relatórios executivos

### 6.7 Funcionalidades Avançadas com Inteligência Artificial

- **Interface de Chat (AIChatOverlay):** Modal flutuante acessível via Dashboard.
- **Interatividade:** Sugestões contextuais ("Criar apresentação", "Criar mapa mental", "Faça um resumo").
- **Design:** Interface "Clean & Colorful" com animações fluidas e feedback visual.
- **Simulação:** Respostas demonstrativas para validação de fluxos de conversação.
- **Apoio à Decisão:** Respostas simuladas para interpretação de indicadores.

### 6.8 Funcionalidades Preditivas e Recomendativas

- Modelos de previsão de abertura e baixa de empresas
- Projeções setoriais e territoriais
- Alertas inteligentes de risco econômico
- Recomendações de políticas públicas
- Sugestões de ações estratégicas para o SEBRAE
- Apoio à priorização de investimentos públicos

### 6.9 Transparência e Observatório Aberto

- Indicadores públicos agregados
- Transparência econômica para a sociedade
- Comunicação cidadã assistida por inteligência artificial

------------------------------------------------------------------------

## 7. Inteligência Artificial -- IA Soberania

### 7.1 Princípio

A IA Soberania, desenvolvida pelo Governo do Estado do Piauí, será
utilizada como camada cognitiva do Observatório, garantindo soberania
dos dados e conformidade legal.

### 7.2 Funcionalidades Implementadas

- **Interface de Usuário:** Componente visual rico com avatares e indicadores de digitação.
- **Histórico de Sessão:** Manutenção do contexto da conversa durante a navegação.
- **Chips de Sugestão:** Atalhos para ações frequentes (Mapas mentais, Resumos).
- **Integração Visual:** Coerência com a identidade visual do dashboard.

------------------------------------------------------------------------

## 8. Requisitos Não Funcionais

### Segurança e LGPD

- **Autenticação:** Supabase Auth com suporte a múltiplos provedores.
- **Controle de Acesso (RBAC):** Row Level Security (RLS) no banco de dados.
- **Criptografia:** Senhas hash (bcrypt/argon2) via Supabase.
- **Auditoria:** Logs de acesso e ações críticas.

### Desempenho

- Dashboards < 3s (Otimizado com React Query)
- Atualização automatizada

### Disponibilidade

- SLA ≥ 99%
- Backup e recuperação

------------------------------------------------------------------------

## 9. Perfis de Acesso

Implementado sistema de controle de acesso baseado em regras (RBAC) com as seguintes definições:

| Perfil | Descrição Técnica | Acesso |
| :--- | :--- | :--- |
| `admin` | Administrador do Sistema | Acesso irrestrito a todas as funcionalidades |
| `gestor_publico` | Gestor Público (Governo) | Visualização completa + Auditoria |
| `tecnico_sebrae` | Técnico SEBRAE | Foco em dados estratégicos e relatórios |
| `analista` | Analista de Dados | Exploração avançada e exportação de dados |
| `publico` | Cidadão / Visitante | Acesso limitado a indicadores agregados |

------------------------------------------------------------------------

## 10. Arquitetura de Referência

- Frontend Web (Dashboards)\
- Backend Analítico\
- Data Warehouse\
- ETL REDESIM / SEBRAE\
- IA Soberania (camada cognitiva)\
- Infraestrutura em nuvem governamental

------------------------------------------------------------------------

## 11. KPIs do Produto

- Usuários ativos\
- Relatórios gerados\
- Consultas via IA\
- Tempo de resposta analítica\
- Uso institucional pelo SEBRAE

------------------------------------------------------------------------

## 12. Critérios de Sucesso

- Adoção institucional plena\
- Decisões baseadas em dados\
- Integração efetiva JUCEPI--SEBRAE\
- Reconhecimento como referência estadual
