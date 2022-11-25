create table usuarios (
    idUsuario bigint primary key auto_increment,
    name varchar(30),
    surname varchar(30),
    lastname varchar(30),
	phone varchar(25),
    address varchar(100),
     email varchar(50) not null unique,
    password varchar(1000) not null,
        role varchar(10) NOT NULL,
	status tinyint NOT NULL DEFAULT 1
    );
    INSERT INTO `joyeria`.`usuarios` (`idUsuario`, `name`, `surname`, `lastname`, `phone`, `address`, `email`, `password`, `role`, `status`) VALUES ('', 'Mike', 'Moreno', 'Velazques', '77777777', 'Tetlama', 'mikeavm@gmail.com', '123', 'user', '1');
 
 /*-------------------------------------------------------------*/
create table productos(
id bigint primary key auto_increment,
name varchar(20) not null,
category int not null,
price int not null,
    foreign key(category) references category(id)
);
INSERT INTO `joyeria`.`productos` (`name`, `category`, `price`) VALUES ('Pantalon', '1', '500');

/*------------------*/
create table category (
    id int primary key auto_increment,
    category_name varchar(30) not null
);
INSERT INTO `joyeria`.`category` (`id`, `category_name`) VALUES ('5', 'Bebe');

/*--------------------*/

  SELECT * FROM productos;
    select* from usuarios;
    UPDATE usuarios SET name="Juanito",surname="pele",lastname="lope",phone="7565",address="vela",email="ayal@gmail.com", password="1234", role="user", status=1 WHERE idUsuario=6;
    
select * from category;
SELECT pro.*, ca.category_name FROM productos pro JOIN category ca ON pro.category = ca.id;

