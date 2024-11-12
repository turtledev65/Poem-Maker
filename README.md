# Poem Maker
A simple web app for making beautiful and interactive poems.

## Stack

- [React](https://react.dev/) - Front-end library
- [NextJS](https://nextjs.org/) - Back-end library for React
- [Uploadthing](https://uploadthing.com/) - File uploads
- [Drizzle](https://orm.drizzle.team/) - ORM

## How to Run

First, clone the repo:

```sh
git clone https://github.com/turtledev65/Poem-Maker.git
```

Go into the newly created directory:

```sh
cd Poem-Maker
```

Install dependencies:

```sh
npm install
# or
pnpm install
```

Set env variables in a `.env` file:
```
DATABASE_URL=
UPLOADTHING_TOKEN=
```

Migrate up your Postgres db with:
```sh
npm run db:migrate
# or
pnpm db:migrate
```

And now you can run it using:

```sh
npm run dev
# or
pnpm dev
```

## Credits
- [FreeSvg](https://freesvg.org/) - used for the [landscape background image](https://freesvg.org/digital-landscape-illustration) on the homepage
- [react-icons](https://react-icons.github.io/react-icons/) - used for the icons
