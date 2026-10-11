"""add community road safari group tables

Revision ID: e7f74b81ef24
Revises: a1c0ntact001
Create Date: 2026-10-11 21:17:14.792679

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'e7f74b81ef24'
down_revision: Union[str, Sequence[str], None] = 'a1c0ntact001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('group_trips',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('tag', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('duration', sa.String(), nullable=False),
    sa.Column('tags', sa.ARRAY(sa.String()), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('trip_type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_group_trips_id'), 'group_trips', ['id'], unique=False)
    op.create_index(op.f('ix_group_trips_location'), 'group_trips', ['location'], unique=False)
    op.create_index(op.f('ix_group_trips_trip_type'), 'group_trips', ['trip_type'], unique=False)
    op.create_table('road_trips',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('badge', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('tags', sa.ARRAY(sa.String()), nullable=False),
    sa.Column('duration', sa.String(), nullable=False),
    sa.Column('distance', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('travel_style', sa.String(), nullable=False),
    sa.Column('min_days', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_road_trips_id'), 'road_trips', ['id'], unique=False)
    op.create_index(op.f('ix_road_trips_travel_style'), 'road_trips', ['travel_style'], unique=False)
    op.create_table('safari_destinations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('badge', sa.String(), nullable=True),
    sa.Column('location_tag', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('duration', sa.String(), nullable=False),
    sa.Column('season', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_safari_destinations_id'), 'safari_destinations', ['id'], unique=False)
    op.create_table('safari_experiences',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('badge', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('tag1', sa.String(), nullable=False),
    sa.Column('duration', sa.String(), nullable=False),
    sa.Column('tag2', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_safari_experiences_id'), 'safari_experiences', ['id'], unique=False)
    op.create_table('testimonials',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('quote', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('avatar', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_testimonials_id'), 'testimonials', ['id'], unique=False)
    op.create_table('wildlife_categories',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('trips_count', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_wildlife_categories_id'), 'wildlife_categories', ['id'], unique=False)
    op.create_table('reviews',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=False),
    sa.Column('location_name', sa.String(length=100), nullable=True),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.CheckConstraint('rating >= 1 AND rating <= 5', name='ck_reviews_rating_range'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stories',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('author_id', sa.UUID(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('excerpt', sa.Text(), nullable=False),
    sa.Column('content', sa.Text(), nullable=True),
    sa.Column('category', sa.String(length=50), nullable=False),
    sa.Column('cover_image_url', sa.String(length=255), nullable=True),
    sa.Column('likes_count', sa.Integer(), nullable=True),
    sa.Column('comments_count', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('story_likes',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('story_id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('story_id', 'user_id', name='uq_story_likes_story_user')
    )

    # contacts.created_at becomes NOT NULL: fill any existing NULLs first,
    # otherwise the ALTER would fail on old rows.
    op.execute("UPDATE contacts SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
    op.alter_column('contacts', 'created_at',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               nullable=False,
               existing_server_default=sa.text('CURRENT_TIMESTAMP'))
    op.create_index(op.f('ix_contacts_email'), 'contacts', ['email'], unique=False)


def downgrade() -> None:
    """Downgrade schema.

    WARNING: this drops the community, road trip, safari and group trip tables
    together with all of their data.
    """
    op.drop_index(op.f('ix_contacts_email'), table_name='contacts')
    op.alter_column('contacts', 'created_at',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               nullable=True,
               existing_server_default=sa.text('CURRENT_TIMESTAMP'))
    op.drop_table('story_likes')
    op.drop_table('stories')
    op.drop_table('reviews')
    op.drop_index(op.f('ix_wildlife_categories_id'), table_name='wildlife_categories')
    op.drop_table('wildlife_categories')
    op.drop_index(op.f('ix_testimonials_id'), table_name='testimonials')
    op.drop_table('testimonials')
    op.drop_index(op.f('ix_safari_experiences_id'), table_name='safari_experiences')
    op.drop_table('safari_experiences')
    op.drop_index(op.f('ix_safari_destinations_id'), table_name='safari_destinations')
    op.drop_table('safari_destinations')
    op.drop_index(op.f('ix_road_trips_travel_style'), table_name='road_trips')
    op.drop_index(op.f('ix_road_trips_id'), table_name='road_trips')
    op.drop_table('road_trips')
    op.drop_index(op.f('ix_group_trips_trip_type'), table_name='group_trips')
    op.drop_index(op.f('ix_group_trips_location'), table_name='group_trips')
    op.drop_index(op.f('ix_group_trips_id'), table_name='group_trips')
    op.drop_table('group_trips')