CREATE TABLE IF NOT EXISTS PUBLIC.USER(
    ID SERIAL,
    EMAIL VARCHAR(30) NOT NULL,
    NAME VARCHAR(100) NOT NULL,
    PASSWORD VARCHAR(200) NOT NULL,
    BIRTHDAY VARCHAR(100),
    FACEBOOK_ID VARCHAR(100)
);

ALTER TABLE PUBLIC.USER ADD CONSTRAINT PK_USER PRIMARY KEY (ID);
ALTER TABLE PUBLIC.USER ADD CONSTRAINT UK_USER_EMAIL UNIQUE (EMAIL);
 
CREATE TABLE IF NOT EXISTS PUBLIC.PROFILE (
    ID SERIAL,
    USER_ID INTEGER NOT NULL,
    NAME VARCHAR(100) NOT NULL,
    MAIN BOOLEAN NOT NULL DEFAULT 'FALSE'
);
ALTER TABLE PUBLIC.PROFILE ADD CONSTRAINT PK_PROFILE PRIMARY KEY (ID);
ALTER TABLE PUBLIC.PROFILE ADD CONSTRAINT FK_PROFILE_USER FOREIGN KEY (USER_ID) REFERENCES PUBLIC.USER (ID);


CREATE TABLE IF NOT EXISTS PUBLIC.MOVIE (
    ID SERIAL,
    PROFILE_ID INTEGER NOT NULL,
    MOVIE_ID VARCHAR(100) NOT NULL,
    WATCHED BOOLEAN NOT NULL DEFAULT 'FALSE',
    GENRES VARCHAR(1000)
);
ALTER TABLE PUBLIC.MOVIE ADD CONSTRAINT PK_MOVIE PRIMARY KEY (ID);
ALTER TABLE PUBLIC.MOVIE ADD CONSTRAINT FK_MOVIE_PROFILE FOREIGN KEY (PROFILE_ID) REFERENCES PUBLIC.PROFILE (ID);

ALTER TABLE PUBLIC.MOVIE ADD CONSTRAINT UK_MOVIE UNIQUE(PROFILE_ID,MOVIE_ID);

CREATE TABLE IF NOT EXISTS PUBLIC.REMINDER (
    ID SERIAL,
    PROFILE_ID INTEGER NOT NULL,
    MOVIE_ID INTEGER NOT NULL,
    MOVIE_TITLE VARCHAR(100) NOT NULL,
    REMINDER_AT DATE NOT NULL,
    CREATED_AT DATE NOT NULL
);

ALTER TABLE PUBLIC.REMINDER ADD CONSTRAINT PK_REMINDER PRIMARY KEY (ID);
ALTER TABLE PUBLIC.REMINDER ADD CONSTRAINT FK_REMINDER_PROFILE FOREIGN KEY (PROFILE_ID) REFERENCES PUBLIC.PROFILE (ID);
-- ALTER TABLE PUBLIC.REMINDER ADD CONSTRAINT FK_REMINDER_MOVIE FOREIGN KEY (MOVIE_ID) REFERENCES PUBLIC.MOVIE (ID);Using the id of tmdb
