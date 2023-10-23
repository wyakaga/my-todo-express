<h2>Requirements</h2>

* NodeJS 18.x
* Postgresql
* Supabase

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone this repository</p>

```bash
git clone https://github.com/wyakaga/my-todo-express.git
```

<p>2. Change the working directory into folder directory</p>

```bash
cd my-todo-express
```

<p>3. Install with npm</p>

```bash
npm install
```

<p>4. Create .env file</p>

```env
# Connect to Supabase with PgBouncer.
DATABASE_URL ="postgres://postgres:__PASSWORD__@db.__YOUR_SUPABASE_PROJECT__.supabase.co:YOUR_PORT/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgres://postgres:__PASSWORD__@db.__YOUR SUPABASE_PROJECT__.supabase.co:YOUR_PORT/postgres"

JWT_SECRET=[YOUR JWT SECRET]
```

<p>5. Migrate and seed database</p>

```bash
#migrate
npx prisma migrate push

#seed
npx prisma db seed
```

<p>6. Run with npm</p>

```bash
npm run dev
```

<h2>Table Structure</h2>

Take a look at the `scheme.prisma` file

<h2>Postman Documentation</h2>

Take a look at the [postman collection](my-todo.json) to run the API by import it