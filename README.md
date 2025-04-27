# Pakpak's Chateau

A simple React + Express web app for D&D Adventurers League logging purposes. It is heavily inspired by [Adventurer's League Log](https://www.adventurersleaguelog.com/) (repository can be found [here](https://github.com/Ariel-Thomas/adventurers-league-log)).

## Getting Started

1. In both, the `client` and `api` directories, install dependencies with [yarn](https://yarnpkg.com/):

```cmd
cd client
yarn install

cd ../api
yarn install
```

2. In the `api` directory, copy `.env.example` as `.env`:

```cmd
cp .env.example .env
```

3. The project uses [MariaDB Server](https://mariadb.org/download/) for database purposes. The [MariaDB Basics](https://mariadb.com/kb/en/mariadb-basics/) article from the MariaDB Server Knowledge Base is a good place to start.

4. Create the database by running the [schema](./api/database/schema.sql) script.

5. Create the stored procedures by running the rest of the scripts under `api/database`.

## Run the App Locally

```cmd
cd api
yarn dev
```

```cmd
cd client
yarn dev
```
