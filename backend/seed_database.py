from pathlib import Path
from urllib.parse import urlparse, urlunparse

import psycopg
from psycopg import sql
from dotenv import load_dotenv

from app import get_database_url


def create_database_if_missing(database_url):
    parsed_url = urlparse(database_url)
    database_name = parsed_url.path.lstrip("/")
    maintenance_url = urlunparse(parsed_url._replace(path="/postgres"))

    try:
        with psycopg.connect(database_url):
            return
    except psycopg.OperationalError as exc:
        if "does not exist" not in str(exc):
            raise

    with psycopg.connect(maintenance_url, autocommit=True) as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                sql.SQL("CREATE DATABASE {}").format(sql.Identifier(database_name))
            )


def main():
    load_dotenv()
    database_url = get_database_url()

    if not database_url:
        raise SystemExit(
            "DATABASE_URL or DB_HOST/DB_NAME/DB_USER/DB_PASSWORD must be set first."
        )

    schema_path = Path(__file__).resolve().parent.parent / "database" / "schema.sql"
    schema_sql = schema_path.read_text(encoding="utf-8")

    create_database_if_missing(database_url)

    with psycopg.connect(database_url) as connection:
        with connection.cursor() as cursor:
            cursor.execute(schema_sql)
        connection.commit()

    print("PostgreSQL database updated with Travel Seekers schema and seed data.")


if __name__ == "__main__":
    main()
