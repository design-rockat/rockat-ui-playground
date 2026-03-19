# Rock-at Design System — Instruções para IA

Este módulo consome o Rock-at Design System. Antes de criar ou modificar qualquer interface, siga a ordem abaixo obrigatoriamente.

## Ordem de consulta antes de qualquer UI

1. Leia `plan.md` na raiz deste repositório
2. Consulte `.rockat-ds/src/index.ts` para identificar a API pública oficial
3. Inspecione `.rockat-ds/src/components/ui/` para ver componentes disponíveis
4. Inspecione `.rockat-ds/src/design-system/` para tokens e tema
5. Consulte `.rockat-ds/src/styles/tokens.css` para variáveis CSS oficiais

## Regra principal

Se o Design System já tiver componente, token ou padrão para o caso:

- use o Design System
- não crie componente paralelo
- não crie token local equivalente
- não resolva com CSS ad hoc permanente

Se faltar cobertura no Design System:

- registre a lacuna explicitamente
- proponha evolução no DS
- crie solução local mínima e temporária apenas se necessário para destravar a entrega

## Checklist antes de encerrar qualquer tarefa de UI

- Usei componente do Design System sempre que havia cobertura?
- Reutilizei tokens oficiais em vez de criar estilo paralelo?
- Documentei a exceção, se precisei fugir do Design System?
- Existe risco de divergência visual por causa da solução adotada?
- Essa solução deveria existir no Design System em vez de permanecer neste módulo?
