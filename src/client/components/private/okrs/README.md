# OKRs Module

Este módulo maneja la gestión completa de OKRs (Objectives and Key Results) en la aplicación CRM.

## Funcionalidades Implementadas

### 1. Creación de OKRs
- **Borrador**: Permite crear OKRs con estado "draft" sin campos obligatorios
- **Pendiente**: Permite crear OKRs con estado "pending" que requieren todos los campos (nombre, descripción, fecha inicio, fecha fin)

### 2. Actualización de OKRs
- **Edición completa**: Permite editar OKRs que no estén en estado "completed"
- **Confirmación de borradores**: Permite cambiar OKRs de "draft" a "pending" cuando tengan todos los campos requeridos
- **Validaciones**: Impide editar OKRs completados

### 3. Eliminación de OKRs
- **Restricciones**: Solo permite eliminar OKRs en estado "draft" o "pending"
- **Protección**: Impide eliminar OKRs en progreso o completados

### 4. Estados de OKR
- `draft`: Borrador - puede editarse y eliminarse
- `pending`: Pendiente - puede editarse y eliminarse
- `in_progress`: En progreso - solo puede editarse
- `completed`: Completado - no puede editarse ni eliminarse

## Estructura de Archivos

```
src/client/components/private/okrs/
├── OkrFormModal/
│   └── OkrFormModal.tsx          # Modal principal para crear/editar OKRs
├── OkrCard/
│   └── OkrCard.tsx               # Tarjeta individual de OKR
├── hooks/
│   └── useOkrOperations.ts       # Hook para operaciones CRUD
├── components/
│   └── OkrValidationMessage.tsx  # Componente de mensajes de validación
└── README.md                     # Esta documentación
```

## Backend

### GraphQL Schema
- `createOKR`: Crear nuevo OKR
- `updateOKR`: Actualizar OKR existente
- `deleteOKR`: Eliminar OKR

### Servicios
- `OkrService.createOKR()`: Creación de OKRs
- `OkrService.updateOKR()`: Actualización de OKRs
- `OkrService.deleteOKR()`: Eliminación de OKRs

## Validaciones

### Para crear OKR pendiente:
- Nombre (requerido)
- Descripción (requerido)
- Fecha de inicio (requerido)
- Fecha de fin (requerido)

### Para confirmar borrador:
- Todos los campos anteriores deben estar completos

### Para editar:
- El OKR no debe estar en estado "completed"

### Para eliminar:
- El OKR debe estar en estado "draft" o "pending"

## Uso

### Crear OKR
```tsx
// Crear borrador
const draftOkr = await createDraftOkr(okrData, userId);

// Crear pendiente
const pendingOkr = await createPendingOkr(okrData, userId);
```

### Actualizar OKR
```tsx
// Actualizar campos
const updatedOkr = await updateExistingOkr(okrId, updatedData);

// Confirmar borrador
const confirmedOkr = await confirmDraftOkr(okrData);
```

### Eliminar OKR
```tsx
const deleted = await deleteExistingOkr(okrId);
```

## Componentes

### OkrFormModal
Modal principal que maneja:
- Creación de OKRs (borrador y pendiente)
- Edición de OKRs existentes
- Confirmación de borradores
- Eliminación de OKRs
- Validaciones en tiempo real

### OkrCard
Tarjeta que muestra:
- Información básica del OKR
- Estado visual con TagForStatus
- Acceso al modal de edición

### useOkrOperations
Hook que proporciona:
- Operaciones CRUD
- Validaciones de negocio
- Estados de carga
- Manejo de errores

### OkrValidationMessage
Componente que muestra:
- Mensajes de validación
- Campos faltantes
- Advertencias para confirmación