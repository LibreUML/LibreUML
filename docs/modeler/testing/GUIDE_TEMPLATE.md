# Plantilla: guía de test manual de un diagrama

> Esta plantilla es el punto de partida para **contribuir una guía de test**. Es una contribución
> real (tu PR queda en el historial del proyecto) y no requiere escribir código.

## Cómo contribuir una guía

1. Elige un issue con la etiqueta `good first issue` + `testing-guide` y comenta que lo tomas.
2. Haz fork y crea una rama: `docs/test-guide-<diagrama>` (ej. `docs/test-guide-class`).
3. Copia esta plantilla a `docs/modeler/testing/<DIAGRAMA>_TEST_GUIDE.md`.
4. Corre la app (`npm install && npm run dev`, abre `http://localhost:5173`) y **ejecuta cada caso
   tú mismo**. Una guía que no probaste no se acepta.
5. Anota el resultado real en la columna *Resultado*. Si algo falla o se ve raro, abre un issue
   con la etiqueta `bug` y enlázalo en la fila.
6. Abre el PR con commit `docs(testing): add <diagrama> manual test guide`.

## Reglas de redacción

- Un caso = una acción verificable. Pasos numerados, en imperativo, sin ambigüedad.
- *Esperado* describe lo que se **ve** o lo que queda **guardado**, no la intención.
- Incluye casos **negativos** (algo que debe ser rechazado o avisado), no solo el camino feliz.
- Si un caso solo aplica a proyecto o a diagrama suelto (standalone), dilo en *Precondición*.

## Estructura de la guía

```markdown
# <Diagrama> — guía de test manual

- **Versión probada:** commit o tag
- **Navegador / SO:**
- **Probado por:** @usuario — fecha

## Alcance
Qué elementos y relaciones cubre esta guía.

## Casos

| ID | Precondición | Pasos | Esperado | Resultado (✅/❌/⚠️) | Notas / issue |
|---|---|---|---|---|---|
| CLS-01 | Diagrama nuevo vacío | 1. Arrastra "Class" desde la paleta al canvas. 2. Haz doble clic en el nombre y escribe `Cuenta`. | Aparece la clase `Cuenta` en el canvas y en el explorador. | | |

## Casos negativos
(Acciones que el editor debe rechazar o avisar en el Panel de Problemas.)

## Persistencia y exportación
Guardar, recargar, exportar (XMI / Java donde aplique), deshacer/rehacer.

## Hallazgos
Lista de bugs encontrados con enlace al issue.
```

## Prefijos de ID sugeridos

`CLS` Class · `UC` Use Case · `DOM` Domain Model · `SEQ` Sequence · `ACT` Activity · `GEN` transversal.
