-- BASE DE DATOS

CREATE DATABASE vestinova_db;
USE vestinova_db;

-- 1. Tabla EMPLEADO
CREATE TABLE empleado (
    dni CHAR(8) PRIMARY KEY,
    nombres VARCHAR(50),
    apellido_paterno VARCHAR(30),
    apellido_materno VARCHAR(30),
    num_telefono VARCHAR(15),
    email VARCHAR(50),
    ubicacion VARCHAR(100),
    salario DECIMAL(10, 2)
);

-- 2. Tabla ROLES
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol ENUM('gerente', 'supervisor', 'vendedor') NOT NULL UNIQUE
);

-- Relación: un empleado puede tener un rol
ALTER TABLE empleado ADD id_rol INT,
ADD CONSTRAINT fk_rol FOREIGN KEY (id_rol) REFERENCES roles(id_rol);

-- 3. Tabla PRODUCTO
CREATE TABLE producto (
    codigo_producto INT PRIMARY KEY,
    precio DECIMAL(10,2),
    stock INT,
    talla VARCHAR(10),
    color VARCHAR(20)
);

-- 4. Tabla VENTAS
CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    codigo_producto INT,
    dni_vendedor CHAR(8),
    cantidad INT,
    total_vendido DECIMAL(10,2),
    FOREIGN KEY (codigo_producto) REFERENCES producto(codigo_producto),
    FOREIGN KEY (dni_vendedor) REFERENCES empleado(dni)
);

-- 5. Tabla PROVEEDOR
CREATE TABLE proveedor (
    ruc CHAR(11) PRIMARY KEY,
    nombre_empresa VARCHAR(100),
    nombre_dueño VARCHAR(50),
    telefono VARCHAR(15),
    email VARCHAR(50),
    direccion VARCHAR(100)
);

-- 6. Tabla ASISTENCIAS
CREATE TABLE asistencias (
    id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    dni_empleado CHAR(8),
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dni_empleado) REFERENCES empleado(dni)
);

-- 7. Tabla POSTULANTES
CREATE TABLE postulantes (
    dni CHAR(8) PRIMARY KEY,
    nombres VARCHAR(50),
    apellido_paterno VARCHAR(30),
    apellido_materno VARCHAR(30),
    email VARCHAR(50),
    telefono VARCHAR(15),
    ubicacion VARCHAR(100)
);

-- 🔁 TRIGGER: registrar asistencia automáticamente (simulación de ingreso)
DELIMITER //
CREATE TRIGGER trg_registrar_asistencia
AFTER INSERT ON empleado
FOR EACH ROW
BEGIN
    INSERT INTO asistencias (dni_empleado) VALUES (NEW.dni);
END;
//
DELIMITER ;

-- 📊 VISTA: Empleados con mejor rendimiento (mayor total vendido)
CREATE VIEW vista_mejor_rendimiento AS
SELECT e.dni, e.nombres, e.apellido_paterno, SUM(v.total_vendido) AS total_ventas
FROM empleado e
JOIN ventas v ON e.dni = v.dni_vendedor
GROUP BY e.dni, e.nombres, e.apellido_paterno
ORDER BY total_ventas DESC;

-- 📊 VISTA: Promedio de ventas por empleado
CREATE VIEW vista_promedio_ventas AS
SELECT e.dni, e.nombres, AVG(v.total_vendido) AS promedio_ventas
FROM empleado e
JOIN ventas v ON e.dni = v.dni_vendedor
GROUP BY e.dni, e.nombres;

-- 📊 VISTA: Índice de productividad por empleado (ventas / asistencia)
CREATE VIEW vista_productividad_empleado AS
SELECT e.dni, e.nombres,
       COUNT(v.id_venta) AS total_ventas,
       COUNT(a.id_asistencia) AS total_asistencias,
       (COUNT(v.id_venta) / GREATEST(COUNT(a.id_asistencia),1)) AS indice_productividad
FROM empleado e
LEFT JOIN ventas v ON e.dni = v.dni_vendedor
LEFT JOIN asistencias a ON e.dni = a.dni_empleado
GROUP BY e.dni, e.nombres;

-- 🚨 VISTA: Alerta de stock bajo (stock < 10)
CREATE VIEW vista_alerta_stock_bajo AS
SELECT codigo_producto, precio, stock, talla, color
FROM producto
WHERE stock < 10;
