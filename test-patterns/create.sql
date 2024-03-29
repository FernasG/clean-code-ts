drop table branas.purchase;
create table branas.purchase (
	card_number text,
	soft_descriptor text,
	amount numeric,
	currency text,
	date timestamp
);

insert into branas.purchase (card_number, soft_descriptor, amount, currency, date) values ('1111 1111 1111 1111', 'Mercado', 100, 'BRL', '2022-05-01T10:00:00');
insert into branas.purchase (card_number, soft_descriptor, amount, currency, date) values ('1111 1111 1111 1111', 'Amazon', 70, 'USD', '2022-05-03T10:00:00');
insert into branas.purchase (card_number, soft_descriptor, amount, currency, date) values ('1111 1111 1111 1111', 'MELI', 300, 'BRL', '2022-05-05T10:00:00');
insert into branas.purchase (card_number, soft_descriptor, amount, currency, date) values ('1111 1111 1111 1111', 'Google', 20, 'USD', '2022-05-07T10:00:00');
insert into branas.purchase (card_number, soft_descriptor, amount, currency, date) values ('1111 1111 1111 1111', 'Netflix', 100, 'BRL', '2022-05-09T10:00:00');
insert into branas.purchase (card_number, soft_descriptor, amount, currency, date) values ('1111 1111 1111 1111', 'Posto', 200, 'BRL', '2022-05-10T10:00:00');