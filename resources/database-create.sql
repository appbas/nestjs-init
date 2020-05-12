drop schema epw cascade;

create schema epw;

create sequence epw.user_iduser_seq
minvalue 1
maxvalue 9999999999
start with 1
increment by 1
cycle;


create table
  epw.user
  (
    iduser bigint not null default nextval('epw.user_iduser_seq'::regclass),
    login character varying(255) not null,
    passwordhash character varying(255) not null,
    datetimeconfirmate timestamp(6) with time zone,
    datetimecreate timestamp(6) with time zone not null default current_timestamp,
    datetimeupdate timestamp(6) with time zone not null default current_timestamp,
    registerhash character varying(255)/* not null*/,
    idfile integer,
    primary key (iduser),
--    ,constraint user_idfile_fkey foreign key (idfile) references file (idfile) on delete set null on update cascade,
    unique (login)
  );
  select * from epw.user
  INSERT INTO epw.user (iduser,login,passwordhash) VALUES (default, 'bruno','sdkfljsdkl') RETURNING *;