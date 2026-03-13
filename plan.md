# Design System Usage Plan

## Objetivo

Este arquivo existe para ser copiado para repositórios consumidores do produto e orientar agentes de IA, engenheiros e automações a usar o Design System como fonte oficial da interface.

Regra principal:

Toda UI nova, alteração visual, refactor de interface ou componente reutilizável deve usar componentes, tokens e padrões do Design System antes de considerar qualquer implementação local.

O Design System deve ser tratado como a interface visual preferencial e oficial do ecossistema. Implementações paralelas no módulo consumidor são exceção, não padrão.

## Regra de decisão obrigatória

Ao receber uma tarefa de interface, a IA deve seguir esta ordem:

1. procurar componente, token ou padrão já existente no Design System;
2. verificar se a necessidade pode ser resolvida por composição com componentes existentes do Design System;
3. se houver lacuna real, registrar a ausência e escalar a necessidade para evolução do Design System;
4. só então considerar uma solução local, com justificativa explícita, temporária e limitada ao caso.

Se o caso pertence claramente ao domínio visual do produto, a IA não deve começar criando CSS ad hoc, wrapper paralelo ou componente novo no módulo consumidor sem antes verificar o Design System.

## O que deve vir do Design System

Por padrão, estes itens devem ser consumidos do Design System ou seguir seus tokens e padrões oficiais:

- botões;
- inputs e campos de formulário;
- cards e containers visuais recorrentes;
- modais, drawers, toasts e feedback visual;
- tabelas, listas e estruturas visuais reutilizáveis;
- cores, tipografia, spacing, radius e demais tokens;
- estados visuais como hover, active, disabled, error, success e warning;
- padrões recorrentes de layout e composição visual.

A IA deve evitar:

- criar segunda fonte de verdade para tokens;
- duplicar componentes equivalentes aos do Design System;
- copiar estilos manualmente em vez de reutilizar a abstração oficial;
- introduzir variações visuais locais sem alinhamento com o sistema.

## Quando exceção é aceitável

Exceções só são aceitáveis quando a solução local não cria um padrão visual concorrente ao Design System.

Casos aceitáveis:

- comportamento estritamente de negócio;
- composição específica de fluxo sem valor de reutilização sistêmica;
- adaptação temporária bloqueada por lacuna real do Design System;
- integração técnica que não redefine o padrão visual central.

Mesmo nesses casos, a IA deve:

- explicar por que o Design System não cobre a necessidade;
- limitar o escopo da solução local;
- evitar transformar a exceção em padrão visual reaproveitável;
- registrar quando a solução deveria virar evolução do Design System.

## Política obrigatória de exceção

Se faltar componente, variante, token ou padrão visual necessário:

- não assumir que o módulo consumidor deve criar a solução definitiva;
- não criar um substituto local permanente por conveniência;
- registrar a lacuna de forma explícita;
- recomendar evolução no Design System quando o caso tiver potencial de reuso;
- só implementar localmente o mínimo necessário para destravar a entrega.

Se a solução local for inevitável, ela deve ser tratada como provisória até existir cobertura oficial do Design System.

## Instruções diretas para IA

Ao trabalhar em qualquer módulo consumidor:

- procurar primeiro o pacote, workspace ou path oficial do Design System;
- usar os componentes e tokens exportados publicamente como superfície oficial;
- evitar depender de internals, paths privados ou estrutura não documentada do DS;
- manter naming, spacing, semântica e comportamento visual alinhados ao sistema;
- preferir composição com componentes oficiais em vez de reimplementação;
- justificar no texto final qualquer desvio do Design System.

Se a tarefa pedir “criar componente”, a IA deve primeiro responder internamente:

- esse componente já existe no Design System?
- essa necessidade pode ser resolvida por composição?
- isso deveria ser uma evolução do Design System em vez de uma solução local?

## Integração local

Cada repositório que copiar este arquivo deve preencher os itens abaixo sem alterar as regras centrais acima.

- pacote ou caminho oficial do Design System: `<preencher>`
- forma oficial de import dos componentes/tokens: `<preencher>`
- time ou responsável pelo Design System: `<preencher>`
- fluxo para abrir lacuna, solicitar componente ou propor evolução: `<preencher>`

Se essas informações não estiverem preenchidas, a IA ainda deve seguir a regra de procurar o DS antes de criar solução local.

## Superfície pública e consumo seguro

A IA deve tratar apenas os componentes, tokens, hooks, temas e utilitários exportados oficialmente pelo Design System como API pública de consumo.

Não deve:

- importar arquivos internos sem necessidade explícita;
- depender de estruturas privadas do pacote;
- recriar localmente um equivalente já existente por preferência pessoal;
- acoplar o módulo consumidor a detalhes internos que podem mudar.

Se algo necessário não estiver exposto pela superfície pública oficial, isso deve ser tratado como lacuna do Design System, não como convite automático para duplicação local.

## Validação mínima esperada

Antes de concluir uma mudança de UI em um módulo consumidor, a IA deve validar:

- se usou o componente ou token oficial quando havia cobertura no Design System;
- se evitou duplicação de padrão visual;
- se documentou qualquer exceção necessária;
- se a solução local introduz risco de divergência visual;
- se o caso deveria ser absorvido pelo Design System.

Além disso, devem ser executadas as validações normais do repositório consumidor, incluindo build, lint, testes e revisão visual das telas afetadas, conforme a stack local.

## Cenários de uso esperados

### 1. Tela nova

A IA deve montar a interface com componentes e tokens do Design System por padrão. Se faltar um elemento, deve primeiro tentar composição e depois registrar a lacuna antes de criar UI paralela.

### 2. Ajuste visual em tela existente

A IA deve alinhar a tela ao padrão do Design System, removendo customizações locais desnecessárias quando possível. Não deve corrigir visual com CSS isolado se o problema deveria ser resolvido por componente ou token oficial.

### 3. Necessidade não coberta pelo Design System

A IA deve reconhecer a lacuna, propor evolução do DS e só aplicar adaptação local mínima se houver bloqueio real de entrega. A solução local não deve virar padrão definitivo silenciosamente.

## Checklist operacional para IA

Antes de encerrar a tarefa, conferir:

- usei componente do Design System sempre que havia cobertura?
- reutilizei tokens oficiais em vez de criar estilo paralelo?
- documentei a exceção, se precisei fugir do Design System?
- existe risco de divergência visual por causa da solução adotada?
- essa solução deveria existir no Design System em vez de permanecer no módulo?

## Regra final

Na dúvida, a IA deve favorecer consistência sistêmica sobre velocidade local.

Se houver escolha entre “resolver rápido no módulo” e “manter alinhamento com o Design System”, a decisão padrão deve ser manter alinhamento com o Design System ou registrar claramente por que isso ainda não foi possível.
