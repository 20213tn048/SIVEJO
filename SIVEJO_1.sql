create database sivejo;
use sivejo;

create table users (
    id bigint primary key auto_increment,
    name varchar(30),
    surname varchar(30),
    lastname varchar(30),
	phone varchar(25),
    address varchar(250),
	email varchar(100) not null unique,
    password varchar(100) not null,
    role tinyint(1) not null default 1,
	status tinyint not null default 1
);
 
create table products(
	id bigint primary key auto_increment,
	description varchar(20) not null,
	category bigint not null,
	price double (7,2) not null
);

create table category (
    id int primary key auto_increment,
    description varchar(50) not null
);

create table status(
	id bigint auto_increment,
	description varchar (30) not null,
	primary key (id)
);

create table history(
	id bigint auto_increment,
    idUser bigint not null,
    idProduct bigint not null,
    idStatus bigint not null,
    primary key (id)
);

insert into status (description) values ('activo'),('bloqueado'),('me gusta'),('en carrito'),('comprado'),('cancelado');

alter table users add foreign key (status) references status (id);

insert into category (description) values ('aretes'),('collares'),('pulseras'),('anillos'),('broches'),('relojes'),('piercings'),('tobilleras');

alter table products add foreign key (category) references category (id);

alter table history add foreign key (idUser) references users (id);
alter table history add foreign key (idProduct) references products (id);
alter table history add foreign key (idStatus) references status (id);

select * from status;
select * from category;

alter table products add stock bigint (5) not null;

create table sales (
	id bigint auto_increment,
    idUser bigint not null,
    idProduct bigint not null,
    count  tinyint,
	salesDate timestamp default current_timestamp,
    primary key (id)
);

alter table sales add foreign key (idUser) references users (id);
alter table sales add foreign key (idProduct) references products (id);

/*Posible credito automático
create trigger generateSales after insert on history for each row
begin
	insert into sales (idUser,idProduct) values (new.idUser,new.idProduct);
end
*/