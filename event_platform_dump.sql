--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: competitors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.competitors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    event_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    category character varying(50) NOT NULL,
    sub_category character varying(50) NOT NULL,
    board_type character varying(50) NOT NULL,
    gender character varying(50) NOT NULL,
    age_category character varying(50) NOT NULL
);


ALTER TABLE public.competitors OWNER TO postgres;

--
-- Name: competitors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.competitors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.competitors_id_seq OWNER TO postgres;

--
-- Name: competitors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.competitors_id_seq OWNED BY public.competitors.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    date timestamp without time zone NOT NULL,
    location character varying(255),
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: heat_competitors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.heat_competitors (
    id integer NOT NULL,
    heat_id integer,
    competitor_id integer
);


ALTER TABLE public.heat_competitors OWNER TO postgres;

--
-- Name: heat_competitors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.heat_competitors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.heat_competitors_id_seq OWNER TO postgres;

--
-- Name: heat_competitors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.heat_competitors_id_seq OWNED BY public.heat_competitors.id;


--
-- Name: heats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.heats (
    id integer NOT NULL,
    round_id integer,
    heat_name character varying(50) NOT NULL,
    heat_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    name character varying(50)
);


ALTER TABLE public.heats OWNER TO postgres;

--
-- Name: heats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.heats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.heats_id_seq OWNER TO postgres;

--
-- Name: heats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.heats_id_seq OWNED BY public.heats.id;


--
-- Name: judges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.judges (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    event_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.judges OWNER TO postgres;

--
-- Name: judges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.judges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.judges_id_seq OWNER TO postgres;

--
-- Name: judges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.judges_id_seq OWNED BY public.judges.id;


--
-- Name: rounds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rounds (
    id integer NOT NULL,
    event_id integer,
    round_name character varying(255) NOT NULL,
    round_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    category character varying(255) DEFAULT 'Undefined'::character varying NOT NULL,
    sub_category character varying(255) DEFAULT 'Undefined'::character varying NOT NULL,
    board_type character varying(255) DEFAULT 'Undefined'::character varying NOT NULL,
    gender character varying(255) DEFAULT 'Undefined'::character varying NOT NULL,
    age_category character varying(255) DEFAULT 'Undefined'::character varying NOT NULL
);


ALTER TABLE public.rounds OWNER TO postgres;

--
-- Name: rounds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rounds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rounds_id_seq OWNER TO postgres;

--
-- Name: rounds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rounds_id_seq OWNED BY public.rounds.id;


--
-- Name: scores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scores (
    id integer NOT NULL,
    competitor_id integer,
    judge_id integer,
    score numeric(5,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.scores OWNER TO postgres;

--
-- Name: scores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scores_id_seq OWNER TO postgres;

--
-- Name: scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scores_id_seq OWNED BY public.scores.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: competitors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitors ALTER COLUMN id SET DEFAULT nextval('public.competitors_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: heat_competitors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heat_competitors ALTER COLUMN id SET DEFAULT nextval('public.heat_competitors_id_seq'::regclass);


--
-- Name: heats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heats ALTER COLUMN id SET DEFAULT nextval('public.heats_id_seq'::regclass);


--
-- Name: judges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.judges ALTER COLUMN id SET DEFAULT nextval('public.judges_id_seq'::regclass);


--
-- Name: rounds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rounds ALTER COLUMN id SET DEFAULT nextval('public.rounds_id_seq'::regclass);


--
-- Name: scores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores ALTER COLUMN id SET DEFAULT nextval('public.scores_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: competitors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.competitors (id, name, event_id, created_at, category, sub_category, board_type, gender, age_category) FROM stdin;
20	Manuel	5	2024-05-29 10:40:20.35528	Shortboard	Men	Shortboard	Men	Professional
21	Jose	5	2024-05-29 10:40:47.167312	Shortboard	Men	Shortboard	Men	Professional
22	Jeca	5	2024-05-29 10:41:09.056243	Shortboard	Men	Shortboard	Men	Professional
23	Tião	5	2024-05-29 10:41:24.805455	Shortboard	Men	Shortboard	Men	Professional
24	Oito	5	2024-05-29 14:13:50.155747	Shortboard	Men	Shortboard	Men	Professional
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, name, date, location, created_by, created_at) FROM stdin;
5	Circuito de Praia	2024-06-01 00:00:00	São Paulo - SP	1	2024-05-29 10:39:47.22938
6	Evento teste	2024-06-21 00:00:00	Anywhere	1	2024-05-29 12:20:29.487892
\.


--
-- Data for Name: heat_competitors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.heat_competitors (id, heat_id, competitor_id) FROM stdin;
59	24	20
60	24	21
61	24	22
62	24	23
63	25	21
64	25	20
65	25	22
66	25	23
67	26	21
68	26	20
69	26	23
70	26	24
71	27	22
72	28	20
73	28	23
74	28	21
75	29	22
76	29	24
77	30	20
78	30	21
79	30	22
80	30	23
81	31	24
82	32	20
83	32	21
84	32	22
85	32	23
86	33	24
55	23	20
56	23	21
57	23	22
58	23	23
\.


--
-- Data for Name: heats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.heats (id, round_id, heat_name, heat_time, name) FROM stdin;
23	24	Heat 1	2024-05-29 12:19:27.532001	\N
24	25	Heat 1	2024-05-29 12:51:21.820909	\N
25	26	Heat 1	2024-05-29 14:06:02.415543	\N
26	27	Heat 1	2024-05-29 14:14:34.438489	\N
27	27	Heat 2	2024-05-29 14:14:34.438489	\N
28	28	Heat 1	2024-05-30 11:01:16.510516	\N
29	28	Heat 2	2024-05-30 11:01:16.510516	\N
30	29	Heat 1	2024-05-30 11:09:53.493228	\N
31	29	Heat 2	2024-05-30 11:09:53.493228	\N
32	30	Heat 1	2024-05-30 11:46:52.74047	\N
33	30	Heat 2	2024-05-30 11:46:52.74047	\N
\.


--
-- Data for Name: judges; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.judges (id, name, event_id, created_at) FROM stdin;
4	Zico	5	2024-05-29 10:41:37.829088
5	Simão	5	2024-05-29 10:41:51.138952
\.


--
-- Data for Name: rounds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rounds (id, event_id, round_name, round_date, category, sub_category, board_type, gender, age_category) FROM stdin;
24	5	Round 1 (Shortboard-Men-Shortboard-Men-Professiona	2024-05-29 12:19:27.532001	Shortboard	Men	Shortboard	Men	Professional
25	5	Round 1 (Shortboard-Men-Shortboard-Men-Professiona	2024-05-29 12:51:21.820909	Shortboard	Men	Shortboard	Men	Professional
26	5	Round 1 (Shortboard-Men-Shortboard-Men-Professional)	2024-05-29 14:06:02.415543	Shortboard	Men	Shortboard	Men	Professional
27	5	Round 1 (Shortboard-Men-Shortboard-Men-Professional)	2024-05-29 14:14:34.438489	Shortboard	Men	Shortboard	Men	Professional
28	5	Round 1 (Shortboard-Men-Shortboard-Men-Professional)	2024-05-30 11:01:16.510516	Shortboard	Men	Shortboard	Men	Professional
29	5	Round 1 (Shortboard-Men-Shortboard-Men-Professional)	2024-05-30 11:09:53.493228	Shortboard	Men	Shortboard	Men	Professional
30	5	Round 1 (Shortboard-Men-Shortboard-Men-Professional)	2024-05-30 11:46:52.74047	Shortboard	Men	Shortboard	Men	Professional
\.


--
-- Data for Name: scores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scores (id, competitor_id, judge_id, score, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, role, created_at) FROM stdin;
1	admin	admin_password	website_admin	2024-05-22 15:25:57.370078
2	event_admin	event_admin_password	event_admin	2024-05-22 15:26:22.65153
3	judge	judge_password	judge	2024-05-22 15:26:37.1696
\.


--
-- Name: competitors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.competitors_id_seq', 24, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 6, true);


--
-- Name: heat_competitors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.heat_competitors_id_seq', 86, true);


--
-- Name: heats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.heats_id_seq', 33, true);


--
-- Name: judges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.judges_id_seq', 5, true);


--
-- Name: rounds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rounds_id_seq', 30, true);


--
-- Name: scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scores_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: competitors competitors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitors
    ADD CONSTRAINT competitors_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: heat_competitors heat_competitors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heat_competitors
    ADD CONSTRAINT heat_competitors_pkey PRIMARY KEY (id);


--
-- Name: heats heats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heats
    ADD CONSTRAINT heats_pkey PRIMARY KEY (id);


--
-- Name: judges judges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.judges
    ADD CONSTRAINT judges_pkey PRIMARY KEY (id);


--
-- Name: rounds rounds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rounds
    ADD CONSTRAINT rounds_pkey PRIMARY KEY (id);


--
-- Name: scores scores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: competitors competitors_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.competitors
    ADD CONSTRAINT competitors_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: events events_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: heat_competitors heat_competitors_competitor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heat_competitors
    ADD CONSTRAINT heat_competitors_competitor_id_fkey FOREIGN KEY (competitor_id) REFERENCES public.competitors(id) ON DELETE CASCADE;


--
-- Name: heat_competitors heat_competitors_heat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heat_competitors
    ADD CONSTRAINT heat_competitors_heat_id_fkey FOREIGN KEY (heat_id) REFERENCES public.heats(id) ON DELETE CASCADE;


--
-- Name: heats heats_round_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heats
    ADD CONSTRAINT heats_round_id_fkey FOREIGN KEY (round_id) REFERENCES public.rounds(id) ON DELETE CASCADE;


--
-- Name: judges judges_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.judges
    ADD CONSTRAINT judges_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: rounds rounds_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rounds
    ADD CONSTRAINT rounds_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: scores scores_competitor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_competitor_id_fkey FOREIGN KEY (competitor_id) REFERENCES public.competitors(id) ON DELETE CASCADE;


--
-- Name: scores scores_judge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scores
    ADD CONSTRAINT scores_judge_id_fkey FOREIGN KEY (judge_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

