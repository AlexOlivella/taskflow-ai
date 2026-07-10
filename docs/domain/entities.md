# Domain Entities

## Objetivo

Definir las entidades principales del dominio de TaskFlow AI y sus responsabilidades.

---

# Workspace

Representa un espacio de trabajo compartido por uno o varios usuarios.

## Atributos

- id
- name

## Relaciones

- Contiene proyectos.
- Contiene tareas.
- Contiene miembros.

---

# User

Representa un usuario registrado en la plataforma.

## Atributos

- id
- name
- email

## Relaciones

- Puede pertenecer a uno o varios workspaces.
- Puede crear tareas.
- Puede tener tareas asignadas.

---

# Project

Representa un conjunto de tareas dentro de un workspace.

## Atributos

- id
- name

## Relaciones

- Pertenece a un workspace.
- Contiene tareas.

---

# Task

Representa una unidad de trabajo.

## Atributos

- id
- title
- description
- status
- priority
- createdAt
- updatedAt

## Relaciones

- Pertenece a un workspace.
- Puede pertenecer a un proyecto.
- Tiene un creador.
- Puede estar asignada a un usuario.

## Notas

Una tarea siempre pertenece a un Workspace.

La asignación a un proyecto es opcional.

La asignación a un usuario también es opcional.
