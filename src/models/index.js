import { Usuario } from "./Usuario.js";
import { Actividad } from "./Actividad.js";
import { Categoria } from "./Categoria.js";
import { Reserva } from "./Reserva.js";
import { DetalleReserva } from "./DetalleReserva.js";
import { Carrito } from "./Carrito.js";
import { ItemCarrito } from "./ItemCarrito.js";

Categoria.hasMany(Actividad, {
  foreignKey: "categoria_id"
});

Actividad.belongsTo(Categoria, {
  foreignKey: "categoria_id"
});

Usuario.hasMany(Reserva, {
  foreignKey: "usuario_id"
});

Reserva.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

Usuario.hasOne(Carrito, {
  foreignKey: "usuario_id"
});

Carrito.belongsTo(Usuario, {
  foreignKey: "usuario_id"
});

Reserva.belongsToMany(Actividad, {
  through: DetalleReserva,
  foreignKey: "reserva_id"
});

Actividad.belongsToMany(Reserva, {
  through: DetalleReserva,
  foreignKey: "actividades_id"
});

Carrito.hasMany(ItemCarrito, {
  foreignKey: "carrito_id"
});

ItemCarrito.belongsTo(Carrito, {
  foreignKey: "carrito_id"
});

Actividad.hasMany(ItemCarrito, {
  foreignKey: "actividades_id"
});

ItemCarrito.belongsTo(Actividad, {
  foreignKey: "actividades_id"
});

export {
  Usuario,
  Actividad,
  Categoria,
  Reserva,
  DetalleReserva,
  Carrito,
  ItemCarrito
};