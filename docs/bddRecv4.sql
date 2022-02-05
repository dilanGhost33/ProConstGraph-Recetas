
CREATE SEQUENCE public.dificultad_dif_id_seq;

CREATE TABLE public.dificultad (
                dif_id INTEGER NOT NULL DEFAULT nextval('public.dificultad_dif_id_seq'),
                dif_nombre VARCHAR NOT NULL,
                CONSTRAINT dificultad_pk PRIMARY KEY (dif_id)
);


ALTER SEQUENCE public.dificultad_dif_id_seq OWNED BY public.dificultad.dif_id;

CREATE SEQUENCE public.ing_tipo_tip_id_seq;

CREATE TABLE public.ing_tipo (
                tip_id INTEGER NOT NULL DEFAULT nextval('public.ing_tipo_tip_id_seq'),
                tip_nombre VARCHAR NOT NULL,
                tip_estado BOOLEAN NOT NULL,
                CONSTRAINT ing_tipo_pk PRIMARY KEY (tip_id)
);


ALTER SEQUENCE public.ing_tipo_tip_id_seq OWNED BY public.ing_tipo.tip_id;

CREATE UNIQUE INDEX ing_tipos_idx
 ON public.ing_tipo
 ( tip_nombre );

CREATE SEQUENCE public.ingrediente_ing_id_seq;

CREATE TABLE public.ingrediente (
                ing_id INTEGER NOT NULL DEFAULT nextval('public.ingrediente_ing_id_seq'),
                tip_id INTEGER NOT NULL,
                ing_nombre VARCHAR NOT NULL,
                ing_imagen VARCHAR NOT NULL,
                ing_estado BOOLEAN NOT NULL,
                CONSTRAINT ingrediente_pk PRIMARY KEY (ing_id)
);


ALTER SEQUENCE public.ingrediente_ing_id_seq OWNED BY public.ingrediente.ing_id;

CREATE UNIQUE INDEX ingredients_idx
 ON public.ingrediente
 ( ing_nombre );

CREATE SEQUENCE public.categoria_cat_id_seq;

CREATE TABLE public.categoria (
                cat_id INTEGER NOT NULL DEFAULT nextval('public.categoria_cat_id_seq'),
                cat_nombre VARCHAR NOT NULL,
                cat_estado BOOLEAN NOT NULL,
                CONSTRAINT categoria_pk PRIMARY KEY (cat_id)
);


ALTER SEQUENCE public.categoria_cat_id_seq OWNED BY public.categoria.cat_id;

CREATE UNIQUE INDEX categorias_idx
 ON public.categoria
 ( cat_nombre );

CREATE SEQUENCE public.usuario_usu_id_seq;

CREATE TABLE public.usuario (
                usu_id INTEGER NOT NULL DEFAULT nextval('public.usuario_usu_id_seq'),
                usu_nickname VARCHAR NOT NULL,
                usu_nombre VARCHAR NOT NULL,
                usu_apellido VARCHAR NOT NULL,
                usu_clave VARCHAR NOT NULL,
                usu_estado BOOLEAN NOT NULL,
                usu_imagen VARCHAR NOT NULL,
                usu_correo VARCHAR NOT NULL,
                CONSTRAINT usuario_pk PRIMARY KEY (usu_id)
);


ALTER SEQUENCE public.usuario_usu_id_seq OWNED BY public.usuario.usu_id;

CREATE UNIQUE INDEX usuarios_idx
 ON public.usuario
 ( usu_nickname, usu_correo );

CREATE SEQUENCE public.receta_rec_id_seq;

CREATE TABLE public.receta (
                rec_id INTEGER NOT NULL DEFAULT nextval('public.receta_rec_id_seq'),
                usu_id INTEGER NOT NULL,
                dif_id INTEGER NOT NULL,
                rec_imagen VARCHAR NOT NULL,
                rec_nombre VARCHAR NOT NULL,
                rec_estado BOOLEAN NOT NULL,
                rec_tiempo DOUBLE PRECISION NOT NULL,
                CONSTRAINT receta_pk PRIMARY KEY (rec_id)
);


ALTER SEQUENCE public.receta_rec_id_seq OWNED BY public.receta.rec_id;

CREATE SEQUENCE public.comentario_com_id_seq;

CREATE TABLE public.comentario (
                com_id INTEGER NOT NULL DEFAULT nextval('public.comentario_com_id_seq'),
                usu_id INTEGER NOT NULL,
                rec_id INTEGER NOT NULL,
                com_descripcion VARCHAR,
                com_estado BOOLEAN NOT NULL,
                CONSTRAINT comentario_pk PRIMARY KEY (com_id)
);


ALTER SEQUENCE public.comentario_com_id_seq OWNED BY public.comentario.com_id;

CREATE SEQUENCE public.reaccion_rea_id_seq;

CREATE TABLE public.reaccion (
                rea_id INTEGER NOT NULL DEFAULT nextval('public.reaccion_rea_id_seq'),
                usu_id INTEGER NOT NULL,
                com_id INTEGER NOT NULL,
                rea_like BOOLEAN,
                rea_estado BOOLEAN,
                CONSTRAINT reaccion_pk PRIMARY KEY (rea_id)
);


ALTER SEQUENCE public.reaccion_rea_id_seq OWNED BY public.reaccion.rea_id;

CREATE SEQUENCE public.rec_cat_rec_cat_id_seq;

CREATE TABLE public.rec_cat (
                rec_cat_id INTEGER NOT NULL DEFAULT nextval('public.rec_cat_rec_cat_id_seq'),
                rec_id INTEGER NOT NULL,
                cat_id INTEGER NOT NULL,
                rec_cat_estado BOOLEAN NOT NULL,
                CONSTRAINT rec_cat_pk PRIMARY KEY (rec_cat_id)
);


ALTER SEQUENCE public.rec_cat_rec_cat_id_seq OWNED BY public.rec_cat.rec_cat_id;

CREATE SEQUENCE public.instruccion_ins_id_seq;

CREATE TABLE public.instruccion (
                ins_id INTEGER NOT NULL DEFAULT nextval('public.instruccion_ins_id_seq'),
                rec_id INTEGER NOT NULL,
                ins_numpaso VARCHAR NOT NULL,
                ins_descripcion VARCHAR NOT NULL,
                ins_estado BOOLEAN NOT NULL,
                CONSTRAINT instruccion_pk PRIMARY KEY (ins_id)
);


ALTER SEQUENCE public.instruccion_ins_id_seq OWNED BY public.instruccion.ins_id;

CREATE SEQUENCE public.det_receta_det_rec_id_seq;

CREATE TABLE public.det_receta (
                det_rec_id INTEGER NOT NULL DEFAULT nextval('public.det_receta_det_rec_id_seq'),
                rec_id INTEGER NOT NULL,
                ing_id INTEGER NOT NULL,
                det_rec_cantidad DOUBLE PRECISION NOT NULL,
                det_rec_unidad VARCHAR NOT NULL,
                det_rec_estado BOOLEAN NOT NULL,
                CONSTRAINT det_receta_pk PRIMARY KEY (det_rec_id)
);


ALTER SEQUENCE public.det_receta_det_rec_id_seq OWNED BY public.det_receta.det_rec_id;

ALTER TABLE public.receta ADD CONSTRAINT dificultad_recetas_fk
FOREIGN KEY (dif_id)
REFERENCES public.dificultad (dif_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.ingrediente ADD CONSTRAINT ing_tipos_ingredients_fk
FOREIGN KEY (tip_id)
REFERENCES public.ing_tipo (tip_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.det_receta ADD CONSTRAINT ingredients_det_recetas_fk
FOREIGN KEY (ing_id)
REFERENCES public.ingrediente (ing_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rec_cat ADD CONSTRAINT categorias_rec_cat_fk
FOREIGN KEY (cat_id)
REFERENCES public.categoria (cat_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.receta ADD CONSTRAINT usuarios_recetas_fk
FOREIGN KEY (usu_id)
REFERENCES public.usuario (usu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.reaccion ADD CONSTRAINT usuarios_reacion_fk
FOREIGN KEY (usu_id)
REFERENCES public.usuario (usu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comentario ADD CONSTRAINT usuarios_comentarios_fk
FOREIGN KEY (usu_id)
REFERENCES public.usuario (usu_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.det_receta ADD CONSTRAINT recetas_det_recetas_fk
FOREIGN KEY (rec_id)
REFERENCES public.receta (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.instruccion ADD CONSTRAINT recetas_instrucciones_fk
FOREIGN KEY (rec_id)
REFERENCES public.receta (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.rec_cat ADD CONSTRAINT recetas_rec_cat_fk
FOREIGN KEY (rec_id)
REFERENCES public.receta (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comentario ADD CONSTRAINT receta_comentario_fk
FOREIGN KEY (rec_id)
REFERENCES public.receta (rec_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.reaccion ADD CONSTRAINT comentarios_reacion_fk
FOREIGN KEY (com_id)
REFERENCES public.comentario (com_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;
