"""add attachment columns to contacts

Revision ID: a1c0ntact001
Revises: <PUT_YOUR_LATEST_REVISION_ID_HERE>
Create Date: 2026-09-29
"""
from alembic import op
import sqlalchemy as sa

revision = "a1c0ntact001"
down_revision = "<PUT_YOUR_LATEST_REVISION_ID_HERE>"  # run `alembic heads` to find it
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("contacts", sa.Column("attachment_name", sa.String(255), nullable=True))
    op.add_column("contacts", sa.Column("attachment_path", sa.String(500), nullable=True))


def downgrade() -> None:
    op.drop_column("contacts", "attachment_path")
    op.drop_column("contacts", "attachment_name")