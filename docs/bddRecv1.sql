
CREATE SEQUENCE public.dificultad_dif_id_seq_1;

CREATE TABLE public.dificultad (
                dif_id INTEGER NOT NULL DEFAULT nextval('public.dificultad_dif_id_seq_1'),
                dif_nombre VARCHAR NOT NULL,
                CONSTRAINT dificultad_pk PRIMARY KEY (dif_id)
);


ALTER SEQUENCE public.dificultad_dif_id_seq_1 OWNED BY public.dificultad.dif_id;

CREATE SEQUENCE public.dia_dia_id_seq_1;

CREATE TABLE public.dia (
                dia_id INTEGER NOT NULL DEFAULT nextval('public.dia_dia_id_seq_1'),
                dia_nombre VARCHAR NOT NULL,
                CONSTRAINT dia_pk PRIMARY KEY (dia_id)
);


ALTER SEQUENCE public.dia_dia_id_seq_1 OWNED BY public.dia.dia_id;

CREATE SEQUENCE public.ing_tipos_tip_id_seq_1;

CREATE TABLE public.ing_tipos (
                tip_id INTEGER NOT NULL DEFAULT nextval('public.ing_tipos_tip_id_seq_1'),
                tip_nombre VARCHAR NOT NULL,
                tip_estado BOOLEAN NOT NULL,
                CONSTRAINT ing_tipos_pk PRIMARY KEY (tip_id)
);


ALTER SEQUENCE public.ing_tipos_tip_id_seq_1 OWNED BY public.ing_tipos.tip_id;

CREATE UNIQUE INDEX ing_tipos_idx
 ON public.ing_tipos
 ( tip_nombre );

CREATE SEQUENCE public.ingredients_ing_id_seq_1;

CREATE TABLE public.ingredients (
                ing_id INTEGER NOT NULL DEFAULT nextval('public.ingredients_ing_id_seq_1'),
                tip_id INTEGER NOT NULL,
                ing_nombre VARCHAR NOT NULL,
                ing_imagen VARCHAR NOT NULL,
                ing_estado BOOLEAN NOT NULL,
                CONSTRAINT ingredients_pk PRIMARY KEY (ing_id)
);


ALTER SEQUENCE public.ingredients_ing_id_seq_1 OWNED BY public.ingredients.ing_id;

CREATE UNIQUE INDEX ingredients_idx
 ON public.ingredients
 ( ing_nombre );

CREATE SEQUENCE public.categorias_cat_id_seq;

CREATE TABLE public.categorias (
                cat_id INTEGER NOT NULL DEFAULT nextval('public.categorias_cat_id_seq'),
                cat_nombre VARCHAR NOT NULL,
                cat_estado VARCHAR NOT NULL,
                CONSTRAINT categorias_pk PRIMARY KEY (cat_id)
);


ALTER SEQUENCE public.categorias_cat_id_seq OWNED BY public.categorias.cat_id;

CREATE UNIQUE INDEX categorias_idx
 ON public.categorias
 ( cat_nombre );

CREATE SEQUENCE public.usuarios_usu_id_seq;

CREATE TABLE public.usuarios (
                usu_id INTEGER NOT NULL DEFAULT nextval('public.usuarios_usu_id_seq'),
                usu_nickname VARCHAR NOT NULL,
                usu_nombre VARCHAR NOT NULL,
                usu_apellido VARCHAR NOT NULL,
                usu_clave VARCHAR NOT NULL,
                usu_estado BOOLEAN NOT NULL,
                usu_imagen VARCHAR NOT NULL,
                usu_correo VARCHAR NOT NULL,
                CONSTRAINT usuarios_pk PRIMARY KEY (usu_id)
);


ALTER SEQUENCE public.usuarios_usu_id_seq OWNED BY public.usuarios.usu_id;

CREATE UNIQUE INDEX usuarios_idx
 ON public.usuarios
 ( usu_nickname, usu_correo );

CREATE SEQUENCE public.menu_men_id_seq;

CREATE TABLE public.menu (
                men_id INTEGER NOT NULL DEFAULT nextval('public.menu_men_id_seq'),
                usu_id INTEGER NOT NULL,
                men_nombre VARCHAR NOT NULL,
                men_unico BOOLEAN NOT NULL,
                men_estado BOOLEAN NOT NULL,
                CONSTRAINT menu_pk PRIMARY KEY (men_id)
);


ALTER SEQUENCE public.menu_men_id_seq OWNED BY public.menu.men_id;

CREATE SEQUENCE public.comentarios_com_id_seq_1;

CREATE TABLE public.comentarios (
                com_id INTEGER NOT NULL DEFAULT nextval('public.comentarios_com_id_seq_1'),
                usu_id INTEGER NOT NULL,
                men_id INTEGER NOT NULL,
                com_descripcion VARCHAR,
                com_estado BOOLEAN NOT NULL,
                CONSTRAINT comentarios_pk PRIMARY KEY (com_id)
);


ALTER SEQUENCE public.comentarios_com_id_seq_1 OWNED BY public.comentarios.com_id;

CREATE SEQUENCE public.reacion_rea_id_seq_1;

CREATE TABLE public.reacion (
                rea_id INTEGER NOT NULL DEFAULT nextval('public.reacion_rea_id_seq_1'),
                usu_id INTEGER NOT NULL,
                com_id INTEGER NOT NULL,
                rea_like BOOLEAN,
                rea_estado BOOLEAN,
                CONSTRAINT reacion_pk PRIMARY KEY (rea_id)
);


ALTER SEQUENCE public.reacion_rea_id_seq_1 OWNED BY public.reacion.rea_id;

CREATE SEQUENCE public.recetas_rec_id_seq;

CREATE TABLE public.recetas (
                rec_id INTEGER NOT NULL DEFAULT nextval('public.recetas_rec_id_seq'),
                rec_imagen VARCHAR NOT NULL,
                rec_nombre VARCHAR NOT NULL,
                rec_estado BOOLEAN NOT NULL,
                rec_tiempo DOUBLE PRECISION NOT NULL,
                usu_id INTEGER NOT NULL,
                com_id INTEGER NOT NULL,
                dif_id INTEGER NOT NULL,
                CONSTRAINT recetas_pk PRIMARY KEY (rec_id)
);


ALTER SEQUENCE public.recetas_rec_id_seq OWNED BY public.recetas.rec_id;

CREATE SEQUENCE public.rec_cat_rec_cat_id_seq;

CREATE TABLE public.rec_cat (
                rec_cat_id INTEGER NOT NULL DEFAULT nextval('public.rec_cat_rec_cat_id_seq'),
                rec_id INTEGER NOT NULL,
                cat_id INTEGER NOT NULL,
                rec_cat_estado VARCHAR NOT NULL,
                CONSTRAINT rec_cat_pk PRIMARY KEY (rec_cat_id)
);


ALTER SEQUENCE public.rec_cat_rec_cat_id_seq OWNED BY public.rec_cat.rec_cat_id;

CREATE SEQUENCE public.instrucciones_ins_id_seq;

CREATE TABLE public.instrucciones (
                ins_id INTEGER NOT NULL DEFAULT nextval('public.instrucciones_ins_id_seq'),
                rec_id INTEGER NOT NULL,
                ins_descripcion VARCHAR NOT NULL,
                ins_numpaso VARCHAR NOT NULL,
                ins_estado BOOLEAN NOT NULL,
                CONSTRAINT instrucciones_pk PRIMARY KEY (ins_id)
);


ALTER SEQUENCE public.instrucciones_ins_id_seq OWNED BY public.instrucciones.ins_id;

CREATE SEQUENCE public.rec_men_rec_men_seq;

CREATE TABLE public.rec_men (
                rec_men INTEGER NOT NULL DEFAULT nextval('public.rec_men_rec_men_seq'),
                men_id INTEGER NOT NULL,
                rec_id INTEGER NOT NULL,
                dia_id INTEGER NOT NULL,
                CONSTRAINT rec_men_pk PRIMARY KEY (rec_men)
);


ALTER SEQUENCE public.rec_men_rec_men_seq OWNED BY public.rec_men.rec_men;

CREATE SEQUENCE public.det_recetas_det_rec_id_seq;

CREATE TABLE public.det_recetas (
                det_rec_id INTEGER NOT NULL DEFAULT nextval('public.det_recetas_det_rec_id_seq'),
                rec_id INTEGER NOT NULL,
                ing_id INTEGER NOT NULL,
                det_rec_cantidad DOUBLE PRECISION NOT NULL,
                det_rec_unidad VARCHAR NOT NULL,
                det_rec_estado VARCHAR NOT NULL,
                CONSTRAINT det_recetas_pk PRIMARY KEY (det_rec_id)
);


ALTER SEQUENCE public.det_recetas_det_rec_id_seq OWNED BY public.det_recetas.det_rec_id;

ALTER TABLE public.recetas ADD CONSTRAINT dificultad_recetas_fk
FOREIGN KEY (dif_id)
REFERENCES public.dificultad (dif_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rec_men ADD CONSTRAINT dia_rec_men_fk
FOREIGN KEY (dia_id)
REFERENCES public.dia (dia_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.ingredients ADD CONSTRAINT ing_tipos_ingredients_fk
FOREIGN KEY (tip_id)
REFERENCES public.ing_tipos (tip_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.det_recetas ADD CONSTRAINT ingredients_det_recetas_fk
FOREIGN KEY (ing_id)
REFERENCES public.ingredients (ing_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rec_cat ADD CONSTRAINT categorias_rec_cat_fk
FOREIGN KEY (cat_id)
REFERENCES public.categorias (cat_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.recetas ADD CONSTRAINT usuarios_recetas_fk
FOREIGN KEY (usu_id)
REFERENCES public.usuarios (usu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.reacion ADD CONSTRAINT usuarios_reacion_fk
FOREIGN KEY (usu_id)
REFERENCES public.usuarios (usu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comentarios ADD CONSTRAINT usuarios_comentarios_fk
FOREIGN KEY (usu_id)
REFERENCES public.usuarios (usu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.menu ADD CONSTRAINT usuarios_menu_fk
FOREIGN KEY (usu_id)
REFERENCES public.usuarios (usu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rec_men ADD CONSTRAINT menu_rec_men_fk
FOREIGN KEY (men_id)
REFERENCES public.menu (men_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comentarios ADD CONSTRAINT menu_comentarios_fk
FOREIGN KEY (men_id)
REFERENCES public.menu (men_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.recetas ADD CONSTRAINT comentarios_recetas_fk
FOREIGN KEY (com_id)
REFERENCES public.comentarios (com_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.reacion ADD CONSTRAINT comentarios_reacion_fk
FOREIGN KEY (com_id)
REFERENCES public.comentarios (com_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.det_recetas ADD CONSTRAINT recetas_det_recetas_fk
FOREIGN KEY (rec_id)
REFERENCES public.recetas (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rec_men ADD CONSTRAINT recetas_rec_men_fk
FOREIGN KEY (rec_id)
REFERENCES public.recetas (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.instrucciones ADD CONSTRAINT recetas_instrucciones_fk
FOREIGN KEY (rec_id)
REFERENCES public.recetas (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rec_cat ADD CONSTRAINT recetas_rec_cat_fk
FOREIGN KEY (rec_id)
REFERENCES public.recetas (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;