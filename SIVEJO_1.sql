drop database joyeria;

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
    role varchar(15) not null default "user",
	status bigint not null default 1
);
SELECT * FROM users WHERE email = '20213tn046@utez.edu.mx' AND status = 1;
create table products(
	id bigint primary key auto_increment,
	description varchar(20) not null,
	category bigint not null,
	price double (7,2) not null,
    stock bigint not null
);
alter table products add column images varchar(200);
SELECT pro.*, ca.description as description FROM products pro JOIN category ca ON pro.category = ca.id;
create table category (
    id bigint primary key auto_increment,
    description varchar(50) not null
);

create table status(
	id bigint auto_increment,
	description varchar (30) not null,
	primary key (id)
);


insert into status (description) values ('activo'),('bloqueado'),('me gusta'),('en carrito'),('comprado'),('cancelado');

insert into category (description) values ('aretes'),('collares'),('pulseras'),('anillos'),('broches'),('relojes'),('piercings'),('tobilleras');

alter table products add foreign key (category) references category (id);

select * from status;
select * from category;

create table sales (
	id bigint auto_increment,
    idUser bigint not null,
    idProduct bigint not null,
    idStatus bigint not null,
    count  tinyint,
	salesDate timestamp default now(),
    primary key (id)
);
drop table sales;
alter table sales add foreign key (idStatus) references status(id);
alter table sales add foreign key (idUser) references users (id);
alter table sales add foreign key (idProduct) references products (id);


DELIMITER $$
create trigger substractProduct after insert on sales for each row
begin
update products set stock = stock-1 where idProduct = product.id;
end;
$$

DELIMITER $$
create trigger orderCanceled after update on sales for each row
begin
	update products set stock = stock + 1 where idProduct = product.id;
end;
$$

describe products;

insert into products (description,category,price,stock) values ('Asfad',1,30.2,40);
select * from products;

select * from users;
insert into users (name,surname,lastname,phone,address,email,password) values ('Christian','Carrasco','Alonso',7776467587,'Vela','20213tn050@utez.edu.mx','123');


describe sales;
insert into sales (idUser,idProduct,idStatus,count) values (3,45,1,1);

/* Views */

create or replace view history as select u.id as userId, p.description ,
 p.price, sales.idStatus, es.description as "status", sales.id as idSales, sales.count from users u join sales  on u.id = sales.idUser join status es on sales.idStatus = es.id
 join products p on p.id = sales.idProduct;
 
create or replace view requests as select u.id as "idUser",u.name,p.id as "idProduct", 
p.description, p.price, p.stock, p.category as "idCategory", sal.id as "idSale", s.description as 
idStatus,sal.salesDate from users u join sales sal on sal.idUser = u.id join products p on sal.idProduct = p.id 
join status s on sal.idStatus = s.id;

select * from history where userId=32;
select * from requests;

SELECT * FROM requests where idUser = 2;



